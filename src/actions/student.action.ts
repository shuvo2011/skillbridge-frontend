// actions/student.action.ts
"use server";

import { studentService } from "@/services/student.service";
import { revalidateTag } from "next/cache";

export const getStudentProfile = async () => {
	return await studentService.getMyProfile();
};

export const updateStudentProfile = async (data: { phone?: string; address?: string; bio?: string }) => {
	const res = await studentService.updateMyProfile(data);

	if (res.error) return res;

	revalidateTag("studentProfile", "max");
	return res;
};
