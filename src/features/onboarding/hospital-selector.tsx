'use client';

import React, { useEffect, useState } from 'react';
import { ProgramType, getHospitalsByProgram } from '@/constants/facilities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HospitalSelectorProps {
  selectedPrograms: ProgramType[];
  selectedHospital: string | null;
  onChange: (hospital: string) => void;
}

const HospitalSelector: React.FC<HospitalSelectorProps> = ({
  selectedPrograms,
  selectedHospital,
  onChange,
}) => {
  const [hospitals, setHospitals] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPrograms.length > 0) {
      // Get unique hospitals that support ALL selected programs
      const hospitalSets = selectedPrograms.map(program => 
        new Set(getHospitalsByProgram(program))
      );
      
      // Start with the first program's hospitals
      let availableHospitals = Array.from(hospitalSets[0] || []);
      
      // Filter for hospitals that exist in all selected programs
      for (let i = 1; i < hospitalSets.length; i++) {
        availableHospitals = availableHospitals.filter(
          hospital => hospitalSets[i]!.has(hospital)
        );
      }
      
      setHospitals(availableHospitals);
      
      // If current selected hospital is not in the list, reset it
      if (selectedHospital && !availableHospitals.includes(selectedHospital)) {
        onChange('');
      }
    } else {
      setHospitals([]);
    }
  }, [selectedPrograms, selectedHospital, onChange]);

  if (selectedPrograms.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Hospital
      </label>
      <Select value={selectedHospital || ""} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a hospital" />
        </SelectTrigger>
        <SelectContent>
          {hospitals.map((hospital) => (
            <SelectItem key={hospital} value={hospital}>
              {hospital}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default HospitalSelector;
