// app/(private)/admin/users/page.tsx

import { AdminUsersClient } from "@/components/module/admin/users/admin-users-client";
import { adminService } from "@/services/admin.service";

export default async function AdminUsersPage({
	searchParams,
}: {
	searchParams: Promise<{ search?: string; role?: string }>;
}) {
	const { search, role } = await searchParams;
	const res = await adminService.getAllUsers({ search, role });
	const users = res.data || [];

	return <AdminUsersClient users={users} />;
}
