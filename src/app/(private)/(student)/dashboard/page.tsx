import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const { data: session } = await userService.getSession();

	if (!session) redirect("/login");
	if (session.user.role !== "STUDENT") redirect("/login");

	return <div>Student Dashboard</div>;
}
