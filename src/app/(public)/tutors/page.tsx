// app/(public)/tutors/page.tsx

import TutorsClient from "@/components/module/tutor/tutorsPage/tutors-client";
import { tutorService } from "@/services/tutor.service";
import { Tutor } from "@/types/tutor.types";

export default async function TutorsPage() {
	const res = await tutorService.getAllTutors();
	const tutors: Tutor[] = res.data || [];
	return <TutorsClient tutors={tutors} />;
}
