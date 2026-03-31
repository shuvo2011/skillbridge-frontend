// actions/tutor-category.action.ts
"use server";

import { tutorCategoryService } from "@/services/tutor-category.service";
import { revalidateTag } from "next/cache";

export const getMyCategories = async () => {
	return await tutorCategoryService.getMyCategories();
};

export const addTutorCategory = async (categoryId: string) => {
	const res = await tutorCategoryService.addCategory(categoryId);
	revalidateTag("tutorCategories", "max");
	return res;
};

export const removeTutorCategory = async (id: string) => {
	const res = await tutorCategoryService.removeCategory(id);
	revalidateTag("tutorCategories", "max");
	return res;
};
