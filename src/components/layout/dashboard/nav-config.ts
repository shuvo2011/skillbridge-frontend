import { LayoutDashboard, Users, CalendarDays, Tag, Settings } from "lucide-react";

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
		{ href: "/admin/users", label: "Users", icon: Users, badge: "24" },
		{ href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
		{ href: "/admin/categories", label: "Categories", icon: Tag },
		{ href: "/admin/settings", label: "Settings", icon: Settings },
	],
	tutor: [
		{ href: "/tutor/dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ href: "/tutor/availability", label: "Availability", icon: CalendarDays },
		{ href: "/tutor/profile", label: "Profile", icon: Users },
		{ href: "/tutor/settings", label: "Settings", icon: Settings },
	],
	student: [
		{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ href: "/dashboard/bookings", label: "My Bookings", icon: CalendarDays, badge: "3" },
		{ href: "/dashboard/profile", label: "Profile", icon: Users },
		{ href: "/dashboard/settings", label: "Settings", icon: Settings },
	],
};
