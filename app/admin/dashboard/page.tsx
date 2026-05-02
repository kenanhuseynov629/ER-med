import dynamic from "next/dynamic";

// Dynamically import the client component with no SSR to avoid build errors
const AdminDashboardClient = dynamic(
  () => import("@/components/AdminDashboardClient"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
  }
);

export default function AdminDashboard() {
  return <AdminDashboardClient />;
}
