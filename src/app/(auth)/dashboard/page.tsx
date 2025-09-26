import StudentDashboard from "@/components/dashboard/student-dashboard";
import TeacherDashboard from "@/components/dashboard/teacher-dashboard";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardContent({ role }: { role: string | string[] | undefined }) {
  switch (role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          {searchParams.role === 'teacher' ? 'Teacher Analytics' : 'Dashboard'}
        </h2>
      </div>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <DashboardContent role={searchParams.role} />
      </Suspense>
    </div>
  );
}
