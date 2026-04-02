"use server";

import { adminService } from "@/services/admin.service";
import { revalidatePath } from "next/cache";

export const updateUserStatusAction = async (id: string, banned: boolean, banReason?: string) => {
	const res = await adminService.updateUserStatus(id, banned, banReason);
	revalidatePath("/admin/users");
	return res;
};

export const toggleTutorFeaturedAction = async (tutorProfileId: string) => {
	const res = await adminService.toggleTutorFeatured(tutorProfileId);
	revalidatePath("/admin/users");
	return res;
};
