"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function TutorDashboardLayout({ children }: { children: ReactNode }) {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) return null;
	if (!session) redirect("/login");
	if (session.user.role !== "TUTOR") redirect("/login");

	return <>{children}</>;
}
