import TeachingSessionsClient from "@/components/module/tutor/teachingSession/teaching-sessions-client";
import { tutorService } from "@/services/tutor.service";

export const metadata = { title: "Teaching Sessions | Tutor - SkillBridge" };

export default async function TeachingSessionsPage() {
	const { data, error } = await tutorService.getMySessions();

	if (error) {
		return (
			<div className="flex items-center justify-center py-20">
				<p className="text-sm text-gray-500">{error.message}</p>
			</div>
		);
	}

	return <TeachingSessionsClient sessions={data ?? []} />;
}
