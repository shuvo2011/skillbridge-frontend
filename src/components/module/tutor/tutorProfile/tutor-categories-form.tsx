"use client";

import { addTutorCategory, removeTutorCategory } from "@/actions/tutor-category.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Category = { id: string; name: string; status: string };
type TutorCategory = { id: string; category: Category };

export function TutorCategoriesForm({
	myCategories,
	allCategories,
}: {
	myCategories: TutorCategory[];
	allCategories: Category[];
}) {
	const [selected, setSelected] = useState<TutorCategory[]>(myCategories);
	const [loading, setLoading] = useState<string | null>(null);

	const addedIds = selected.map((s) => s.category.id);
	const available = allCategories.filter((c) => !addedIds.includes(c.id) && c.status === "PUBLISHED");

	const handleAdd = async (categoryId: string) => {
		setLoading(categoryId);
		const res = await addTutorCategory(categoryId);
		if (res.error) {
			toast.error(res.error.message);
		} else {
			setSelected((prev) => [...prev, res.data]);
			toast.success("Category added");
		}
		setLoading(null);
	};

	const handleRemove = async (id: string) => {
		setLoading(id);
		const res = await removeTutorCategory(id);
		if (res.error) {
			toast.error(res.error.message);
		} else {
			setSelected((prev) => prev.filter((s) => s.id !== id));
			toast.success("Category removed");
		}
		setLoading(null);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>My Categories</CardTitle>
				<CardDescription>Select the subjects you teach.</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div>
					<p className="text-sm font-medium text-gray-700 mb-2">Selected</p>
					{selected.length === 0 ? (
						<p className="text-sm text-muted-foreground">No categories selected yet.</p>
					) : (
						<div className="flex flex-wrap gap-2">
							{selected.map((s) => (
								<Badge
									key={s.id}
									variant="outline"
									className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1.5 px-3 py-1"
								>
									{s.category.name}
									<button
										onClick={() => handleRemove(s.id)}
										disabled={loading === s.id}
										className="hover:text-red-500 transition-colors"
									>
										<X className="w-3 h-3" />
									</button>
								</Badge>
							))}
						</div>
					)}
				</div>

				<div>
					<p className="text-sm font-medium text-gray-700 mb-2">Available</p>
					{available.length === 0 ? (
						<p className="text-sm text-muted-foreground">All categories added.</p>
					) : (
						<div className="flex flex-wrap gap-2">
							{available.map((c) => (
								<Button
									key={c.id}
									variant="outline"
									size="sm"
									disabled={loading === c.id}
									onClick={() => handleAdd(c.id)}
									className="h-8 text-xs"
								>
									+ {c.name}
								</Button>
							))}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
