import TeacherDashboard from "@/components/dashboard/teacher-dashboard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Manage Students
        </h2>
      </div>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <TeacherDashboard />
      </Suspense>
    </div>
  );
}
