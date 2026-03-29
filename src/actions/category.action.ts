"use server";

import { categoryService } from "@/services/category.service";
import { Category } from "@/types/category.type";
import { revalidateTag } from "next/cache"; // ← next/cache থেকে import

export const createCategory = async (data: Category) => {
	const res = await categoryService.createCategory(data);
	revalidateTag("categoryItems", "max");
	return res;
};

export const updateCategory = async (id: string, data: { name: string; status: string }) => {
	const res = await categoryService.updateCategory(id, data);
	revalidateTag("categoryItems", "max");
	return res;
};

export const deleteCategory = async (id: string) => {
	const res = await categoryService.deleteCategory(id);
	revalidateTag("categoryItems", "max");
	return res;
};
