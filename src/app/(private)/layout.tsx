import type { ReactNode } from "react";
import PrivateLayoutClient from "./layout-client";

export const metadata = {
	title: "Dashboard - SkillBridge",
	description: "Your SkillBridge command center.",
};

export default function Layout({ children }: { children: ReactNode }) {
	return <PrivateLayoutClient>{children}</PrivateLayoutClient>;
}
