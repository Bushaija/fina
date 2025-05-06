"use client"

import { useState, useEffect, useMemo } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ReportTitle } from "@/features/executing/components/hiv/title-section"
import { FinancialTable } from "@/features/executing/components/hiv/financial-table"
import { 
  FinancialRow,
  generateEmptyFinancialTemplate,
  calculateHierarchicalTotals
} from "@/features/executing/schema/financial-report"
import { useUserSession } from "@/lib/session-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"

// Loading skeleton component for the financial report
const FinancialReportSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="border-b pb-4">
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Table Header Skeleton */}
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-20" />
      </div>
      
      {/* Table Rows Skeleton */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 py-2 border-b">
          <Skeleton className="h-4 col-span-2" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
      ))}
      
      {/* Footer Skeleton */}
      <div className="mt-4 flex justify-end">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

const Malaria = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { hospital, district, program, facilities = [] } = useUserSession();
  const [financialData, setFinancialData] = useState<FinancialRow[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedHealthCenter, setSelectedHealthCenter] = useState("")
  
  // Get facility type from URL
  const facilityType = useMemo(() => {
    return searchParams.get('facility') || 'health-centers';
  }, [searchParams]);
  
  // Determine if we're in hospital mode
  const isHospitalMode = useMemo(() => {
    return facilityType === 'hospitals';
  }, [facilityType]);
  
  // Generate reporting period options with current year
  const reportingPeriodOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return [
      { value: `Q1 FY ${currentYear}`, label: `Q1 FY ${currentYear}` },
      { value: `Q2 FY ${currentYear}`, label: `Q2 FY ${currentYear}` },
      { value: `Q3 FY ${currentYear + 1}`, label: `Q3 FY ${currentYear + 1}` },
      { value: `Q4 FY ${currentYear + 1}`, label: `Q4 FY ${currentYear + 1}` },
    ];
  }, []);
  
  // Default to first reporting period
  const [reportingPeriod, setReportingPeriod] = useState(reportingPeriodOptions[0]?.value || "");
  
  // Extract program name from pathname (e.g., /execute/hiv -> HIV)
  const programName = useMemo(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    return (lastSegment ?? "hiv").toUpperCase();
  }, [pathname]);
  
  // Generate report title based on program name
  const reportTitle = useMemo(() => {
    return `${programName} Financial Report`;
  }, [programName]);

  // Initialize selected health center when facilities are available
  useEffect(() => {
    // Get all non-hospital facilities (health centers)
    const healthCenters = facilities.filter(facility => 
      typeof facility === 'string' && facility !== hospital
    );
    
    // Set a default health center or fall back to hospital if no health centers
    if (healthCenters.length > 0) {
      setSelectedHealthCenter(healthCenters[0] || "");
    } else if (typeof hospital === 'string') {
      setSelectedHealthCenter(hospital);
    }
  }, [facilities, hospital]);
  
  // Initialize financial data when component mounts
  useEffect(() => {
    if (hospital) {
      setIsLoading(true);
      // Simulate API loading time
      setTimeout(() => {
        setFinancialData(calculateHierarchicalTotals(generateEmptyFinancialTemplate()));
        setIsLoading(false);
      }, 1500);
    }
  }, [hospital, reportingPeriod, selectedHealthCenter]);
  
  // Handle saving form data
  const handleSaveFinancialData = (data: FinancialRow[]) => {
    setFinancialData(data)
    console.log("Saving financial data:", data)
    // In a real app, this would save the data to the server
  }

  // Extract the fiscal year from the reporting period
  const getFiscalYear = () => {
    if (!reportingPeriod) return "2023"
    
    // Look for a year in the reporting period string
    const match = reportingPeriod.match(/(\d{4})/)
    return match ? match[1] : "2023"
  }

  // Check if we have the required session data to display the report
  const canShowReport = !!hospital && !!program;
  
  // Get health centers for select options (excluding the hospital)
  const healthCenterOptions = facilities.filter(facility => 
    typeof facility === 'string' && facility !== hospital
  ) as string[];

  return (
    <div className="container mx-auto py-0">
      <h1 className="text-2xl font-bold mb-2">{reportTitle}</h1>
      
      <div className="space-y-8">
        {!canShowReport ? (
          <div className="p-4 border border-yellow-400 bg-yellow-50 rounded-md">
            <p>Please complete your profile setup to view this report.</p>
          </div>
        ) : (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {!isHospitalMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Health Center
                  </label>
                  <Select 
                    value={selectedHealthCenter} 
                    onValueChange={setSelectedHealthCenter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a health center" />
                    </SelectTrigger>
                    <SelectContent>
                      {healthCenterOptions.map((facility) => (
                        <SelectItem key={facility} value={facility}>
                          {facility}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reporting Period
                </label>
                <Select 
                  value={reportingPeriod} 
                  onValueChange={setReportingPeriod}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a reporting period" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportingPeriodOptions.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {isLoading ? (
              <FinancialReportSkeleton />
            ) : (
              <>
                <ReportTitle 
                  // reportType="FINANCIAL REPORT"
                  reportingPeriod={reportingPeriod}
                  healthCenter={isHospitalMode ? hospital || "" : selectedHealthCenter || ""}
                  district={district || ""}
                  project={`${programName} NSP BUDGET SUPPORT`}
                  facilityType={isHospitalMode ? "Hospital" : "Health Center"}
                />
                
                <div className="mt-4">
                  <FinancialTable 
                    data={financialData}
                    fiscalYear={getFiscalYear()}
                    onSave={handleSaveFinancialData}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Malaria
