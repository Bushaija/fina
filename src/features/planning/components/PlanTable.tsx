'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
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
import { PlanActivityRow } from './PlanActivityRow';
import { PlanGeneralTotalRow } from './PlanGeneralTotalRow';
import { 
  ACTIVITY_CATEGORIES, 
  Activity, 
  Plan, 
  generateDefaultActivities,
  planSchema,
  createEmptyActivity
} from '../schemas';

export function PlanTable() {
  const form = useForm<Plan>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      activities: generateDefaultActivities()
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
           a.typeOfActivity === activity.typeOfActivity
    );
  };
  
  const onSubmit = (data: Plan) => {
    console.log('Form submitted:', data);
    // Here you would typically save this data to your backend
    alert('Plan saved successfully!');
  };
  
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead className="w-[200px]">Activity Category</TableHead>
                <TableHead className="w-[180px]">Type of Activity</TableHead>
                <TableHead className="w-[100px]">Frequency</TableHead>
                <TableHead className="w-[100px]">Unit Cost</TableHead>
                <TableHead className="w-[100px]">Count Q1<br/>(Jul-Sep)</TableHead>
                <TableHead className="w-[100px]">Count Q2<br/>(Oct-Dec)</TableHead>
                <TableHead className="w-[100px]">Count Q3<br/>(Jan-Mar)</TableHead>
                <TableHead className="w-[100px]">Count Q4<br/>(Apr-Jun)</TableHead>
                <TableHead className="w-[100px]">Amount<br/>Q1</TableHead>
                <TableHead className="w-[100px]">Amount<br/>Q2</TableHead>
                <TableHead className="w-[100px]">Amount<br/>Q3</TableHead>
                <TableHead className="w-[100px]">Amount<br/>Q4</TableHead>
                <TableHead className="w-[120px]">Total Budget</TableHead>
                <TableHead className="w-[200px]">Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(ACTIVITY_CATEGORIES).map(([category, activityTypes]) => {
                // First, render the category row
                const categoryActivities = categorizedActivities[category] || [];
                const firstCategoryActivity = categoryActivities[0] || 
                  createEmptyActivity(category, '');
                
                return (
                  <React.Fragment key={category}>
                    {/* Category Row */}
                    <PlanActivityRow
                      activity={firstCategoryActivity}
                      index={getActivityIndex(firstCategoryActivity)}
                      form={form}
                      isSubCategory={false}
                    />
                    
                    {/* Activity Rows */}
                    {activityTypes.map(activityType => {
                      const activity = categoryActivities.find(
                        a => a.typeOfActivity === activityType
                      ) || createEmptyActivity(category, activityType);
                      
                      return (
                        <PlanActivityRow
                          key={`${category}-${activityType}`}
                          activity={activity}
                          index={getActivityIndex(activity)}
                          form={form}
                          isSubCategory={true}
                        />
                      );
                    })}
                  </React.Fragment>
                );
              })}
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