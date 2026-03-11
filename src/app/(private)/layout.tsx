import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { Role } from "@/components/layout/dashboard/nav-config";
import type { ReactNode } from "react";
// import { getCurrentUser } from "@/lib/auth";

export default function Layout({ children }: { children: ReactNode }) {
	const mockUser = {
		name: "Rafiq Islam",
		email: "rafiq@skillbridge.com",
		role: "admin" as Role,
		avatar: "",
	};

	return <DashboardLayout user={mockUser}>{children}</DashboardLayout>;
}
