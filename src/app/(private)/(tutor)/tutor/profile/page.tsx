import { ChangePasswordForm } from "@/components/module/tutor/tutorProfile/change-password-form";
import { ProfileInfoForm } from "@/components/module/tutor/tutorProfile/profile-info-form";
import { TutorDetailsForm } from "@/components/module/tutor/tutorProfile/tutor-details-form";

export default function TutorProfilePage() {
	const user = { name: "Rahim Uddin", email: "rahim@skillbridge.com" };
	const profile = {}; // fetch from API
	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">My Profile</h1>
			<div className="flex flex-col gap-6">
				<ProfileInfoForm user={user} />
				<ChangePasswordForm />
				<TutorDetailsForm profile={profile} />
			</div>
		</div>
	);
}
