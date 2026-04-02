"use server";

import { adminService } from "@/services/admin.service";
import { revalidateTag } from "next/cache";

export const updateUserStatusAction = async (id: string, banned: boolean, banReason?: string) => {
	const res = await adminService.updateUserStatus(id, banned, banReason);
	revalidateTag("adminUsers");
	return res;
};

export const toggleTutorFeaturedAction = async (tutorProfileId: string) => {
	const res = await adminService.toggleTutorFeatured(tutorProfileId);
	revalidateTag("adminUsers");
	return res;
};
