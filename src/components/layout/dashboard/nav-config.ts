import { LayoutDashboard, Users, CalendarDays, Tag, Settings, Clipboard } from "lucide-react";

export type Role = "admin" | "tutor" | "student";

export interface NavItem {
	href: string;
	label: string;
	icon: React.ElementType;
	badge?: string;
}

export const navConfig: Record<Role, NavItem[]> = {
	admin: [
		{ href: "/admin", label: "Dashboard", icon: LayoutDashboard },
		{ href: "/admin/users", label: "Users", icon: Users },
		{ href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
		{ href: "/admin/categories", label: "Categories", icon: Tag },
	],
	tutor: [
		{ href: "/tutor/dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ href: "/tutor/availability", label: "Availability", icon: CalendarDays },
		{ href: "/tutor/sessions", label: "Teaching Sessions", icon: Clipboard },
		{ href: "/tutor/profile", label: "Profile", icon: Users },
	],
	student: [
		{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ href: "/dashboard/bookings", label: "My Bookings", icon: CalendarDays },
		{ href: "/dashboard/profile", label: "Profile", icon: Users },
	],
};
