'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PlanTable } from '@/features/planning/components/malaria/malaria-plan-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HIVPlanPage() {
  const searchParams = useSearchParams();
  const facilityType = searchParams.get('facility');
  const isHospital = facilityType !== 'health-centers';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{facilityType === 'health-centers' ? 'Health Center Budget Planning' : 'Hospital Budget Planning'}</CardTitle>
          <CardDescription>
            Plan activities and allocate budgets across quarters.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto pb-6">
          <PlanTable isHospital={isHospital} />
        </CardContent>
      </Card>
    </div>
  );
}
