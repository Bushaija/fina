'use client';

import React from 'react';
import { ProgramType, getFacilitiesByHospitalAndProgram, getHospitalDistrict } from '@/constants/facilities';

interface FacilityPreviewProps {
  selectedHospital: string | null;
  selectedPrograms: ProgramType[];
}

const FacilityPreview: React.FC<FacilityPreviewProps> = ({
  selectedHospital,
  selectedPrograms,
}) => {
  if (!selectedHospital || selectedPrograms.length === 0) {
    return null;
  }
  
  // Get unique facilities across all selected programs
  const allFacilities = new Set<string>();
  const hasTB = selectedPrograms.includes('TB');
  
  selectedPrograms.forEach(program => {
    const facilities = getFacilitiesByHospitalAndProgram(selectedHospital, program);
    facilities.forEach(facility => allFacilities.add(facility));
  });
  
  const uniqueFacilities = Array.from(allFacilities);

  return (
    <div className="mt-6 border rounded-lg p-4 bg-gray-50">
      <h3 className="text-base font-medium text-gray-900 mb-2">
        {hasTB && selectedPrograms.length === 1
          ? 'You will manage TB at hospital level'
          : 'You will have access to these facilities'}
      </h3>
      
      <div className="text-sm text-gray-600 mb-2">
        <p>
          Selected Programs: {selectedPrograms.join(', ')}
        </p>
        <p>
          Selected Hospital: {selectedHospital}
        </p>
        <p>
          District: {getHospitalDistrict(selectedHospital) || 'Unknown'}
        </p>
      </div>
      
      {hasTB && selectedPrograms.length === 1 ? (
        <div className="bg-white rounded-md p-3 border border-gray-200 text-sm">
          <p className="text-gray-700">
            TB is managed directly at <span className="font-medium">{selectedHospital}</span>
          </p>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          {uniqueFacilities.length > 0 ? (
            <p>
              {uniqueFacilities.length} associated health center{uniqueFacilities.length === 1 ? '' : 's'}
            </p>
          ) : (
            <p>No additional health centers for the selected programs</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FacilityPreview;
