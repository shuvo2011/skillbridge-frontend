"use client";
import { deleteCategory } from "@/actions/category.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/category.type";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { EditCategoryDialog } from "./editCategoryDialog";

export default function CategoryTable({
	categories,
	page = 1,
	limit = 10,
}: {
	categories: Category[];
	page?: number;
	limit?: number;
}) {
	const handleDelete = async (id: string, name: string) => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: `"${name}" will be permanently deleted.`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ef4444",
			cancelButtonColor: "#6b7280",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel",
		});

		if (!result.isConfirmed) return;

		const res = await deleteCategory(id);
		if (res.error) {
			toast.error(res.error.message);
			return;
		}
		toast.success("Category Deleted");
	};
	const [editCategory, setEditCategory] = useState<Category | null>(null);
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100">
			<Table>
				<TableHeader>
					<TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
						<TableHead className="rounded-tl-xl font-semibold text-gray-600">#</TableHead>
						<TableHead className="font-semibold text-gray-600">Name</TableHead>
						<TableHead className="font-semibold text-gray-600">Status</TableHead>
						<TableHead className="text-right font-semibold text-gray-600 rounded-tr-xl">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories.length === 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
								No category found
							</TableCell>
						</TableRow>
					) : (
						categories.map((category, index) => (
							<TableRow key={category.id} className="hover:bg-gray-50/50 transition-colors">
								<TableCell className="text-muted-foreground text-sm w-12">{(page - 1) * limit + index + 1}</TableCell>
								<TableCell>
									<p className="font-medium text-gray-800">{category.name}</p>
								</TableCell>
								<TableCell>
									<Badge
										variant="outline"
										className={
											category.status === "PUBLISHED"
												? "bg-green-50 text-green-700 border-green-200"
												: "bg-orange-50 text-orange-600 border-orange-200"
										}
									>
										{category.status}
									</Badge>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
											onClick={() => setEditCategory(category)}
										>
											<Pencil className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
											onClick={() => category.id && handleDelete(category.id, category.name)}
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
			{editCategory && (
				<EditCategoryDialog category={editCategory} open={!!editCategory} onClose={() => setEditCategory(null)} />
			)}
		</div>
	);
}
