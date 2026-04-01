// app/(public)/tutors/[id]/page.tsx

import { tutorService } from "@/services/tutor.service";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { TutorDetailClient } from "@/components/module/tutor/tutorSinglePage/tutor-detail-client";

export default async function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const [tutorRes, session] = await Promise.all([tutorService.getTutorById(id), getSession()]);

	if (!tutorRes.data) notFound();
	console.log(tutorRes);
	return <TutorDetailClient tutor={tutorRes.data} session={session} />;
}
