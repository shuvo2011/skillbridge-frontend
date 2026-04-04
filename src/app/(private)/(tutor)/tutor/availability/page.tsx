import { AddAvailabilityForm } from "@/components/module/tutor/availability/add-availability-form";
import { AvailabilityFilter } from "@/components/module/tutor/availability/availability-filter";
import { AvailabilityTable } from "@/components/module/tutor/availability/availability-table";
import PaginationControls from "@/components/ui/pagination-controls";
import { availabilityService } from "@/services/availability.service";

export const metadata = { title: "Availability | Tutor - SkillBridge" };
export default async function TutorAvailabilityPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; search: string }>;
}) {
	const { page, search } = await searchParams;

	const response = await availabilityService.getAvailabilities({ page, search });

	const availabilities = response.data?.data || [];
	const pagination = response.data?.meta || {
		limit: 10,
		page: 1,
		total: 0,
		totalPages: 1,
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">My Availability</h1>
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-12 md:col-span-4">
					<AddAvailabilityForm />
				</div>
				<div className="col-span-12 md:col-span-8 flex flex-col gap-4">
					<AvailabilityFilter />
					<AvailabilityTable availabilities={availabilities} page={pagination.page} limit={pagination.limit} />
					<PaginationControls meta={pagination} />
				</div>
			</div>
		</div>
	);
}
