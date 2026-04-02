"use client";
import { authClient } from "@/lib/auth-client";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentLayout({ children }: { children: ReactNode }) {
	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();

	useEffect(() => {
		if (!isPending && !session) {
			router.push("/login");
			return;
		}
		if (!isPending && session && session.user.role !== "STUDENT") {
			router.push("/login");
		}
	}, [isPending, session, router]);

	if (isPending || !session) return null;
	if (session.user.role !== "STUDENT") return null;

	return <>{children}</>;
}
