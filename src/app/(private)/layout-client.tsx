"use client";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { Role } from "@/components/layout/dashboard/nav-config";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export default function PrivateLayoutClient({ children }: { children: ReactNode }) {
	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();

	useEffect(() => {
		if (!isPending && !session) {
			router.push("/login");
		}
	}, [isPending, session, router]);

	if (isPending || !session) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-muted-foreground">Loading...</p>
			</div>
		);
	}

	const user = {
		name: session.user.name,
		email: session.user.email,
		role: session.user.role as Role,
		avatar: session.user.image ?? "",
	};

	return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
