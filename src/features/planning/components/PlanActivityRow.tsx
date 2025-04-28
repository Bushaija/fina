'use client';

import React, { useEffect } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Activity, calculateQuarterAmount, calculateTotalBudget } from '../schemas';
import { formatCurrency } from '../utils';
import { UseFormReturn } from 'react-hook-form';

interface PlanActivityRowProps {
  activity: Activity;
  index: number;
  form: UseFormReturn<any>;
  isSubCategory: boolean;
}

export function PlanActivityRow({ activity, index, form, isSubCategory }: PlanActivityRowProps) {
  const { watch, setValue } = form;
  
  // Watch for changes to recalculate derived values
  const frequency = watch(`activities.${index}.frequency`);
  const unitCost = watch(`activities.${index}.unitCost`);
  const countQ1 = watch(`activities.${index}.countQ1`);
  const countQ2 = watch(`activities.${index}.countQ2`);
  const countQ3 = watch(`activities.${index}.countQ3`);
  const countQ4 = watch(`activities.${index}.countQ4`);
  
  // Update calculated fields when inputs change
  useEffect(() => {
    const amountQ1 = calculateQuarterAmount(frequency || 0, unitCost || 0, countQ1 || 0);
    const amountQ2 = calculateQuarterAmount(frequency || 0, unitCost || 0, countQ2 || 0);
    const amountQ3 = calculateQuarterAmount(frequency || 0, unitCost || 0, countQ3 || 0);
    const amountQ4 = calculateQuarterAmount(frequency || 0, unitCost || 0, countQ4 || 0);
    
    setValue(`activities.${index}.amountQ1`, amountQ1);
    setValue(`activities.${index}.amountQ2`, amountQ2);
    setValue(`activities.${index}.amountQ3`, amountQ3);
    setValue(`activities.${index}.amountQ4`, amountQ4);
    
    const totalBudget = amountQ1 + amountQ2 + amountQ3 + amountQ4;
    setValue(`activities.${index}.totalBudget`, totalBudget);
  }, [frequency, unitCost, countQ1, countQ2, countQ3, countQ4, setValue, index]);
  
  return (
    <TableRow className={isSubCategory ? "bg-muted/20" : "bg-muted/50 font-semibold"}>
      <TableCell className="w-[200px]">
        {!isSubCategory && activity.activityCategory}
      </TableCell>
      <TableCell className="w-[180px]">
        {isSubCategory && activity.typeOfActivity}
      </TableCell>
      <TableCell className="w-[100px]">
        {isSubCategory ? (
          <Input
            type="number"
            min="0"
            {...form.register(`activities.${index}.frequency`, { 
              valueAsNumber: true,
              required: isSubCategory 
            })}
          />
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="w-[100px]">
        {isSubCategory ? (
          <Input
            type="number"
            min="0"
            {...form.register(`activities.${index}.unitCost`, { 
              valueAsNumber: true,
              required: isSubCategory 
            })}
          />
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="w-[100px]">
        {isSubCategory ? (
          <Input
            type="number"
            min="0"
            {...form.register(`activities.${index}.countQ1`, { valueAsNumber: true })}
          />
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="w-[100px]">
        {isSubCategory ? (
          <Input
            type="number"
            min="0"
            {...form.register(`activities.${index}.countQ2`, { valueAsNumber: true })}
          />
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="w-[100px]">
        {isSubCategory ? (
          <Input
            type="number"
            min="0"
            {...form.register(`activities.${index}.countQ3`, { valueAsNumber: true })}
          />
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="w-[100px]">
        {isSubCategory ? (
          <Input
            type="number"
            min="0"
            {...form.register(`activities.${index}.countQ4`, { valueAsNumber: true })}
          />
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="w-[100px]">
        {formatCurrency(watch(`activities.${index}.amountQ1`))}
      </TableCell>
      <TableCell className="w-[100px]">
        {formatCurrency(watch(`activities.${index}.amountQ2`))}
      </TableCell>
      <TableCell className="w-[100px]">
        {formatCurrency(watch(`activities.${index}.amountQ3`))}
      </TableCell>
      <TableCell className="w-[100px]">
        {formatCurrency(watch(`activities.${index}.amountQ4`))}
      </TableCell>
      <TableCell className="w-[120px] font-semibold">
        {formatCurrency(watch(`activities.${index}.totalBudget`))}
      </TableCell>
      <TableCell className="w-[200px]">
        {isSubCategory && (
          <Input
            type="text"
            placeholder="Add comment..."
            {...form.register(`activities.${index}.comment`)}
          />
        )}
      </TableCell>
    </TableRow>
  );
} 