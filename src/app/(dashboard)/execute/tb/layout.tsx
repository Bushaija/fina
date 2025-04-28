'use client';

export default function TBExecuteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 p-4">
      <div className="w-full">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">TB Hospital Execution</h3>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Hospitals Only
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
} 