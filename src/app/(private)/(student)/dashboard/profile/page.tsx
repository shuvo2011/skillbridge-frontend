import { StudentChangePasswordForm } from "@/components/module/student/studentProfile/student-change-password-form";
import { StudentDetailsForm } from "@/components/module/student/studentProfile/student-details-form";
import { StudentProfileInfoForm } from "@/components/module/student/studentProfile/student-profile-info-form";
import { getSession } from "@/lib/get-session";
import { studentService } from "@/services/student.service";

export default async function StudentProfilePage() {
	const session = await getSession();
	const user = {
		name: session?.user?.name || "",
		email: session?.user?.email || "",
	};

	const profileRes = await studentService.getMyProfile();
	const profile = profileRes.data;

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">My Profile</h1>
			<div className="flex flex-col gap-6">
				<StudentProfileInfoForm user={user} />
				<StudentChangePasswordForm />
				<StudentDetailsForm profile={profile} currentImage={session?.user?.image ?? null} />
			</div>
		</div>
	);
}
