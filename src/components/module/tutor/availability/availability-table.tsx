// components/module/tutor-availability/availability-table.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { deleteAvailability } from "@/actions/availability.action";
import { useState } from "react";
import { EditAvailabilityDialog } from "./edit-availability-dialog";
import { AvailabilitySearch } from "./availability-search";
import PaginationControls from "@/components/ui/pagination-controls";

type Availability = {
	id: string;
	dayOfWeek: string;
	availableFrom: string;
	availableTo: string;
};

export function AvailabilityTable({
	availabilities,
	page = 1,
	limit = 10,
}: {
	availabilities: Availability[];
	page?: number;
	limit?: number;
}) {
	const handleDelete = async (id: string, day: string) => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: `"${day}" availability will be permanently deleted.`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ef4444",
			cancelButtonColor: "#6b7280",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel",
		});

		if (!result.isConfirmed) return;

		const res = await deleteAvailability(id);
		if (res.error) {
			toast.error(res.error.message);
			return;
		}
		toast.success("Availability Deleted");
	};
	const [editItem, setEditItem] = useState<Availability | null>(null);
	const formatTime = (time: string) => {
		const [hours, minutes] = time.split(":").map(Number);
		const period = hours >= 12 ? "PM" : "AM";
		const displayHours = hours % 12 || 12;
		return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
	};
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
						<TableHead className="font-semibold text-gray-600 w-12">#</TableHead>
						<TableHead className="font-semibold text-gray-600">Day</TableHead>
						<TableHead className="font-semibold text-gray-600">From</TableHead>
						<TableHead className="font-semibold text-gray-600">To</TableHead>
						<TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{availabilities.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
								No availability found
							</TableCell>
						</TableRow>
					) : (
						availabilities.map((item, index) => (
							<TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
								<TableCell className="text-muted-foreground text-sm">{(page - 1) * limit + index + 1}</TableCell>
								<TableCell>
									<Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
										{item.dayOfWeek}
									</Badge>
								</TableCell>
								<TableCell className="font-medium text-gray-800">{formatTime(item.availableFrom)}</TableCell>
								<TableCell className="font-medium text-gray-800">{formatTime(item.availableTo)}</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
											onClick={() => setEditItem(item)}
										>
											<Pencil className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
											onClick={() => handleDelete(item.id, item.dayOfWeek)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
			{/* Dialog */}
			{editItem && (
				<EditAvailabilityDialog availability={editItem} open={!!editItem} onClose={() => setEditItem(null)} />
			)}
		</div>
	);
}
