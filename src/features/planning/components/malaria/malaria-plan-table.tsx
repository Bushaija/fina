'use client';

import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter,
  TableRow, 
  TableHead, 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlanActivityRow } from '../hiv/PlanActivityRow';
import { PlanGeneralTotalRow } from '../hiv/PlanGeneralTotalRow';
import { 
  Activity, 
  Plan, 
  generateDefaultActivities,
  planSchema,
  createEmptyActivity
} from '../../schema/hiv/schemas';
import { MALARIA_ACTIVITIES } from '@/constants/malaria-data/malaria-activities';

interface PlanTableProps {
  isHospital?: boolean;
};

export function PlanTable({ isHospital = false }: PlanTableProps) {
  const activityCategories = isHospital ? MALARIA_ACTIVITIES : MALARIA_ACTIVITIES;
  
  const form = useForm<Plan>({
    resolver: zodResolver(planSchema) as any,
    defaultValues: {
      activities: generateDefaultActivities(isHospital)
    }
  });
  
  const { watch, handleSubmit } = form;
  const activities = watch('activities');
  
  // Function to organize activities by category
  const organizeActivitiesByCategory = () => {
    const categorizedActivities: Record<string, Activity[]> = {};
    
    activities.forEach(activity => {
      const category = activity.activityCategory;
      if (!categorizedActivities[category]) {
        categorizedActivities[category] = [];
      }
      categorizedActivities[category].push(activity);
    });
    
    return categorizedActivities;
  };
  
  const categorizedActivities = organizeActivitiesByCategory();
  
  // Find index of an activity in the full activities array
  const getActivityIndex = (activity: Activity) => {
    return activities.findIndex(
      a => a.activityCategory === activity.activityCategory && 
           a.typeOfActivity === activity.typeOfActivity &&
           a.activity === activity.activity
    );
  };
  
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Form submitted:', data as Plan);
    // Here you would typically save this data to your backend
    alert('Plan saved successfully!');
  };
  
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="rounded-md border overflow-auto">
          <Table className="min-w-max">
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead className="w-[160px]">Activity</TableHead>
                <TableHead className="w-[200px]">Activity Description</TableHead>
                <TableHead className="w-[80px]">Quantity</TableHead>
                <TableHead className="w-[80px]">Frequency</TableHead>
                <TableHead className="w-[80px]">Unit Cost</TableHead>
                <TableHead className="w-[80px]">Amount<br/>Q1</TableHead>
                <TableHead className="w-[80px]">Amount<br/>Q2</TableHead>
                <TableHead className="w-[80px]">Amount<br/>Q3</TableHead>
                <TableHead className="w-[80px]">Amount<br/>Q4</TableHead>
                <TableHead className="w-[100px]">Annual Budget</TableHead>
                <TableHead className="w-[160px]">Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              // {}
            </TableBody>
            <TableFooter>
              <PlanGeneralTotalRow activities={activities} />
            </TableFooter>
          </Table>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Save Plan</Button>
        </div>
      </form>
    </FormProvider>
  );
} 