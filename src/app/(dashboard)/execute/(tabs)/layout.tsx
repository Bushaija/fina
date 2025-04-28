'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function ExecuteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get facility type from URL query parameter or default to "health-centers"
  const [facilityType, setFacilityType] = useState(
    searchParams.get('facility') || 'health-centers'
  );
  
  // Update URL when tab changes
  const handleTabChange = useCallback((value: string) => {
    setFacilityType(value);
    
    // Create new URL with updated facility parameter
    const params = new URLSearchParams(searchParams);
    params.set('facility', value);
    
    // Update the URL without full page reload
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);
  
  // Sync with URL on mount and when URL changes
  useEffect(() => {
    const facilityParam = searchParams.get('facility');
    if (facilityParam && facilityParam !== facilityType) {
      setFacilityType(facilityParam);
    }
  }, [searchParams, facilityType]);

  return (
    <div className="space-y-4 p-4">
      <Tabs defaultValue="health-centers" value={facilityType} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-[250px] grid-cols-2">
          <TabsTrigger value="health-centers">Health Centers</TabsTrigger>
          <TabsTrigger value="hospitals">Hospital</TabsTrigger>
        </TabsList>
        <TabsContent value="health-centers" className="mt-6">
          <div className="rounded-lg border p-4">
            {/* <h3 className="text-lg font-medium mb-4">Health Centers Planning</h3> */}
            {children}
          </div>
        </TabsContent>
        <TabsContent value="hospitals" className="mt-6">
          <div className="rounded-lg border p-4">
            {/* <h3 className="text-lg font-medium mb-4">Hospital Planning</h3> */}
            {children}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}



