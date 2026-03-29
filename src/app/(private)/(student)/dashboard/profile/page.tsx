import { StudentChangePasswordForm } from "@/components/module/student/studentProfile/student-change-password-form";
import { StudentDetailsForm } from "@/components/module/student/studentProfile/student-details-form";
import { StudentProfileInfoForm } from "@/components/module/student/studentProfile/student-profile-info-form";

export default function StudentProfilePage() {
	const user = { name: "", email: "" }; // TODO: fetch from session
	const profile = {}; // TODO: fetch from API
	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">My Profile</h1>
			<div className="flex flex-col gap-6">
				<StudentProfileInfoForm user={user} />
				<StudentChangePasswordForm />
				<StudentDetailsForm profile={profile} />
			</div>
		</div>
	);
}
