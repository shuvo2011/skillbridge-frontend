"use server";

import { tutorService } from "@/services/tutor.service";
import { revalidatePath } from "next/cache";

export const updateTutorProfile = async (data: {
	bio?: string;
	qualification?: string;
	experienceYears?: number;
	phone?: string;
	address?: string;
	price?: number;
}) => {
	const res = await tutorService.updateMyProfile(data);
	revalidatePath("/tutor/profile");
	return res;
};
