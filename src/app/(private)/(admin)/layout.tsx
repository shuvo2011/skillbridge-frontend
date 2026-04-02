// app/(private)/(admin)/layout.tsx
"use client";
import { authClient } from "@/lib/auth-client";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();

	useEffect(() => {
		if (!isPending && !session) {
			router.push("/login");
			return;
		}
		if (!isPending && session && session.user.role !== "ADMIN") {
			router.push("/login");
		}
	}, [isPending, session, router]);

	if (isPending || !session) return null;
	if (session.user.role !== "ADMIN") return null;

	return <>{children}</>;
}
