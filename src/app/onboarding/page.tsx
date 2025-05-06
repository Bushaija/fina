'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import ProgramSelector from '@/features/onboarding/program-selector';
import HospitalSelector from '@/features/onboarding/hospital-selector';
import FacilityPreview from '@/features/onboarding/facility-preview';
import { ProgramType, getFacilitiesByHospitalAndProgram } from '@/constants/facilities';
import { useUserSession } from '@/lib/session-store';

const OnboardingPage = () => {
  const router = useRouter();
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramType[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const { setSession } = useUserSession();

  const handleContinue = () => {
    if (selectedHospital && selectedPrograms.length > 0) {
      // Collect all unique facilities across all selected programs
      const allFacilities = new Set<string>();
      
      selectedPrograms.forEach(program => {
        const facilities = getFacilitiesByHospitalAndProgram(selectedHospital, program);
        facilities.forEach(facility => allFacilities.add(facility));
      });
      
      // Convert to array and add the hospital itself
      const facilitiesList = [selectedHospital, ...Array.from(allFacilities)];
      
      // Save to session store with primary program (first selected) and all programs
      setSession(selectedHospital, selectedPrograms[0]!, facilitiesList, selectedPrograms);
      
      // Navigate to dashboard
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <p className="mt-1 text-md text-gray-600">Hey, there 👋🏿</p>
            <p className="mt-1 text-md text-gray-600 my-4">{"Let's get you onboard!"}</p>
            <h1 className="text-lg font-medium text-black">Set up your Fina profile</h1>
          </div>

          <div className="space-y-4">
            <ProgramSelector 
              selectedPrograms={selectedPrograms} 
              onChange={setSelectedPrograms} 
            />
            
            <HospitalSelector 
              selectedPrograms={selectedPrograms}
              selectedHospital={selectedHospital}
              onChange={setSelectedHospital}
            />
            
            <FacilityPreview 
              selectedHospital={selectedHospital}
              selectedPrograms={selectedPrograms}
            />
            
            <div className="pt-4">
              <Button
                onClick={handleContinue}
                disabled={!selectedHospital || selectedPrograms.length === 0}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors cursor-pointer ${
                  !selectedHospital || selectedPrograms.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-black'
                }`}
              >
                continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;