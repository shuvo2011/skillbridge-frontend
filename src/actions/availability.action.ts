// actions/availability.action.ts
"use server";

import { availabilityService } from "@/services/availability.service";
import { revalidateTag } from "next/cache";

export const getAvailabilities = async () => {
	return await availabilityService.getAvailabilities();
};

export const createAvailability = async (data: { dayOfWeek: string; availableFrom: string; availableTo: string }) => {
	const res = await availabilityService.createAvailability(data);
	revalidateTag("availabilityItems", "max");
	return res;
};

export const deleteAvailability = async (id: string) => {
	const res = await availabilityService.deleteAvailability(id);
	revalidateTag("availabilityItems", "max");
	return res;
};

export const updateAvailability = async (
	id: string,
	data: { dayOfWeek: string; availableFrom: string; availableTo: string },
) => {
	const res = await availabilityService.updateAvailability(id, data);
	revalidateTag("availabilityItems", "max");
	return res;
};
