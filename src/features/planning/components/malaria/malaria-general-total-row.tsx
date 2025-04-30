'use client';

import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { formatCurrency } from '../../utils';
import { Activity } from '../../schema/malaria/schema';

interface PlanGeneralTotalRowProps {
    activities: Activity[];
};

export function PlanGeneralTotalRow({ activities }: PlanGeneralTotalRowProps) {
    // calculate quarter totals
    const totalQ1 = activities.reduce((sum, activity) => sum + (activity.amountQ1 || 0), 0);
    const totalQ2 = activities.reduce((sum, activity) => sum + (activity.amountQ1 || 0), 0);
    const totalQ3 = activities.reduce((sum, activity) => sum + (activity.amountQ1 || 0), 0);
    const totalQ4 = activities.reduce((sum, activity) => sum + (activity.amountQ1 || 0), 0);

    // calculate grand total
    const grandTotal = totalQ1 + totalQ2 + totalQ3 + totalQ4;

    return (
        <TableRow className='bg-primary/10 font-bold'>
            <TableCell colSpan={8} className='text-right'>General Total</TableCell>
            <TableCell>{formatCurrency(totalQ1)}</TableCell>
            <TableCell>{formatCurrency(totalQ2)}</TableCell>
            <TableCell>{formatCurrency(totalQ3)}</TableCell>
            <TableCell>{formatCurrency(totalQ4)}</TableCell>
            <TableCell>{formatCurrency(grandTotal)}</TableCell>
            <TableCell>Must match annual allocations</TableCell>
        </TableRow>
    )
}