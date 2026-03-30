// components/module/tutor/availability/availability-filter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

const Days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] as const;

export function AvailabilityFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const handleFilter = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const value = e.target.value;
			const params = new URLSearchParams(searchParams.toString());
			if (value) {
				params.set("search", value);
				params.set("page", "1");
			} else {
				params.delete("search");
			}
			startTransition(() => {
				router.push(`?${params.toString()}`);
			});
		},
		[router, searchParams],
	);

	return (
		<select
			defaultValue={searchParams.get("search") ?? ""}
			onChange={handleFilter}
			className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		>
			<option value="">All Days</option>
			{Days.map((day) => (
				<option key={day} value={day}>
					{day.charAt(0) + day.slice(1).toLowerCase()}
				</option>
			))}
		</select>
	);
}
