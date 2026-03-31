import { ChangePasswordForm } from "@/components/module/tutor/tutorProfile/change-password-form";
import { ProfileInfoForm } from "@/components/module/tutor/tutorProfile/profile-info-form";
import { TutorCategoriesForm } from "@/components/module/tutor/tutorProfile/tutor-categories-form";
import { TutorDetailsForm } from "@/components/module/tutor/tutorProfile/tutor-details-form";
import { getSession } from "@/lib/get-session";
import { categoryService } from "@/services/category.service";
import { tutorCategoryService } from "@/services/tutor-category.service";
import { tutorService } from "@/services/tutor.service";

export default async function TutorProfilePage() {
	const session = await getSession();

	const profileRes = await tutorService.getMyProfile();
	const myCategoriesRes = await tutorCategoryService.getMyCategories();
	const allCategoriesRes = await categoryService.getCategories();

	const profile = profileRes.data;
	const myCategories = myCategoriesRes.data || [];
	const allCategories = allCategoriesRes.data?.data || [];

	console.log("myCategories:", myCategoriesRes);
	console.log("allCategories:", allCategoriesRes);

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
				<TutorCategoriesForm myCategories={myCategories} allCategories={allCategories} />
			</div>
		</div>
	);
}
