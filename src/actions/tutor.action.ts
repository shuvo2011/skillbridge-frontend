"use server";

import { tutorService } from "@/services/tutor.service";
import { revalidateTag } from "next/cache";

export const updateTutorProfile = async (data: {
	bio?: string;
	qualification?: string;
	experienceYears?: number;
	phone?: string;
	address?: string;
	price?: number;
}) => {
	const res = await tutorService.updateMyProfile(data);
	revalidateTag("tutorProfile", "max");
	return res;
};
