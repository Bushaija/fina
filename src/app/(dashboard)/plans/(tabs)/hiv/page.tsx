'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PlanTable } from '@/features/planning/components/PlanTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HIVPlanPage() {
  const searchParams = useSearchParams();
  const facilityType = searchParams.get('facility');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{facilityType === 'health-centers' ? 'Health Center Budget Planning' : 'Hospital Budget Planning'}</CardTitle>
          <CardDescription>
            Plan activities and allocate budgets across quarters. All amounts are calculated automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto pb-6">
          <PlanTable />
        </CardContent>
      </Card>
    </div>
  );
}
