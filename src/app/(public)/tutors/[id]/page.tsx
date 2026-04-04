import { tutorService } from "@/services/tutor.service";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { TutorDetailClient } from "@/components/module/tutor/tutorSinglePage/tutor-detail-client";

export async function generateMetadata({ params }: { params: { id: string } }) {
	const res = await tutorService.getTutorById(params.id);
	const tutor = res.data;
	return {
		title: tutor ? `${tutor.user.name} - SkillBridge` : "Tutor - SkillBridge",
		description: tutor?.bio ?? `Book a session with ${tutor?.user.name} on SkillBridge.`,
	};
}

export default async function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const [tutorRes, session] = await Promise.all([tutorService.getTutorById(id), getSession()]);

	if (!tutorRes.data) notFound();
	return <TutorDetailClient tutor={tutorRes.data} session={session} />;
}
