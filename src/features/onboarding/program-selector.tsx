'use client';

import React from 'react';
import { ProgramType } from '@/constants/facilities';
import { Checkbox } from "@/components/ui/checkbox";

interface ProgramSelectorProps {
  selectedPrograms: ProgramType[];
  onChange: (programs: ProgramType[]) => void;
}

const programs: ProgramType[] = ['HIV', 'MALARIA', 'TB'];

const ProgramSelector: React.FC<ProgramSelectorProps> = ({ selectedPrograms, onChange }) => {
  const handleProgramToggle = (program: ProgramType, checked: boolean) => {
    if (checked) {
      onChange([...selectedPrograms, program]);
    } else {
      onChange(selectedPrograms.filter(p => p !== program));
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Programs
      </label>
      <div className="space-y-3">
        {programs.map((program) => (
          <div key={program} className="flex items-center space-x-3">
            <Checkbox
              id={`program-${program}`}
              checked={selectedPrograms.includes(program)}
              onCheckedChange={(checked) => 
                handleProgramToggle(program, checked as boolean)
              }
            />
            <label 
              htmlFor={`program-${program}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {program}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Select one or more programs
      </div>
    </div>
  );
};

export default ProgramSelector;
