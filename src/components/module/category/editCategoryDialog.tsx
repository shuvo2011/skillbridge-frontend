// components/module/category/editCategoryDialog.tsx
"use client";

import { updateCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/category.type";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = z.object({
	name: z.string().min(3, "Category name must be at least 3 characters").max(100),
	status: z.enum(["DRAFT", "PUBLISHED"], { message: "Status is required" }),
});

export function EditCategoryDialog({
	category,
	open,
	onClose,
}: {
	category: Category;
	open: boolean;
	onClose: () => void;
}) {
	const form = useForm({
		defaultValues: {
			name: category.name,
			status: category.status as "DRAFT" | "PUBLISHED",
		},
		validators: {
			onSubmit: categorySchema,
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Updating category...");
			const res = await updateCategory(category.id!, value);
			if (res.error) {
				toast.error(res.error.message, { id: toastId });
				return;
			}
			toast.success("Category Updated", { id: toastId });
			onClose();
		},
	});

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Edit Category</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field
							name="name"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
										<Input
											id={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
						<form.Field
							name="status"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Status</FieldLabel>
										<select
											id={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value as "DRAFT" | "PUBLISHED")}
											className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										>
											<option value="DRAFT">Draft</option>
											<option value="PUBLISHED">Published</option>
										</select>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
					</FieldGroup>
					<Button type="submit" className="w-full mt-6">
						Update
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
