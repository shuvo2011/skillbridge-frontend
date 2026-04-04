import TutorsClient from "@/components/module/tutor/tutorsPage/tutors-client";
import { tutorService } from "@/services/tutor.service";
import { Tutor } from "@/types/tutor.types";
import { Suspense } from "react";

export const metadata = {
	title: "Browse Tutors - SkillBridge",
	description:
		"Find verified tutors for Mathematics, Physics, English, Programming and more. Filter by price, experience and subject.",
};

export default async function TutorsPage() {
	const res = await tutorService.getAllTutors();
	const tutors: Tutor[] = res.data || [];

	return (
		<Suspense>
			<TutorsClient tutors={tutors} />
		</Suspense>
	);
}
