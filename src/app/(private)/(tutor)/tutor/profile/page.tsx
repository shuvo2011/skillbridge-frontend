import { ChangePasswordForm } from "@/components/module/tutor/tutorProfile/change-password-form";
import { ProfileInfoForm } from "@/components/module/tutor/tutorProfile/profile-info-form";
import { TutorDetailsForm } from "@/components/module/tutor/tutorProfile/tutor-details-form";
import { getSession } from "@/lib/get-session";
import { tutorService } from "@/services/tutor.service";

export default async function TutorProfilePage() {
	const session = await getSession();
	const profileRes = await tutorService.getMyProfile();
	const profile = profileRes.data;
	console.log("Profile response:", profileRes);
	const user = {
		name: session?.user?.name || "",
		email: session?.user?.email || "",
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">My Profile</h1>
			<div className="flex flex-col gap-6">
				<ProfileInfoForm user={user} />
				<ChangePasswordForm />
				<TutorDetailsForm profile={profile} currentImage={session?.user?.image ?? null} />
			</div>
		</div>
	);
}
