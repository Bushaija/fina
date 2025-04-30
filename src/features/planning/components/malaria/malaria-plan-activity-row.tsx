'use client';

import react, { useEffect } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from "@/components/ui/input";
import { Activity, calculateQuarterAmount, calculateTotalBudget } from '../../schema/malaria/schema';
import { UseFormReturn } from 'react-hook-form';

interface PlanActivityRowProps {
    activity: Activity;
    index: number;
    form: UseFormReturn<any>;
    // isSubCategory: boolean;
};

export function PlanActivityRow({ activity, index, form }: PlanActivityRowProps) {
    const { watch, setValue } = form;

    // for category with special index -1, we don't need to watch or update
    const isReadyOnly = index === -1;

    // watch for changes to recalculate derived values
    const frequency = isReadyOnly ? 0 : watch(`activities.${index}.frequency`);
    const unitCost = isReadyOnly ? 0 : watch(`activities.${index}.unitCost`);
    const quantity = isReadyOnly ? 0 : watch(`activities.${index}.quantity`);

    useEffect(() => {
        if (isReadyOnly) return;

        const amountQ1 = calculateQuarterAmount(frequency || 0, unitCost || 0, quantity || 0);
        const amountQ2 = calculateQuarterAmount(frequency || 0, unitCost || 0, quantity || 0);
        const amountQ3 = calculateQuarterAmount(frequency || 0, unitCost || 0, quantity || 0);
        const amountQ4 = calculateQuarterAmount(frequency || 0, unitCost || 0, quantity || 0);

        setValue(`activities.${index}.amountQ1`, amountQ1);
        setValue(`activities.${index}.amountQ2`, amountQ2);
        setValue(`activities.${index}.amountQ3`, amountQ3);
        setValue(`activities.${index}.amountQ4`, amountQ4);

        const totalBudget = amountQ1 + amountQ2 + amountQ3 + amountQ4;
        setValue(`activities.${index}.totalBudget`, totalBudget);
    }, [frequency, unitCost, quantity, setValue, index, isReadyOnly]);

    return (
        <TableRow>
            <TableCell>{activity.activity}</TableCell>
        </TableRow>
    );
}
