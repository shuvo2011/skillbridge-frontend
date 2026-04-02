"use client";

import { createCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = z.object({
	name: z
		.string()
		.min(3, "Category name must be at least 3 characters")
		.max(100, "Category name must be less than 100 characters"),
	status: z.enum(["DRAFT", "PUBLISHED"], { message: "Status is required" }),
});

export function CreateCategory() {
	const form = useForm({
		defaultValues: {
			name: "",
			status: "",
		},
		validators: {
			onSubmit: categorySchema,
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Creating category...");

			const categoryData = {
				name: value.name,
				status: value.status,
			};

			try {
				const res = await createCategory(categoryData);
				if (res.error) {
					toast.error(res.error.message, { id: toastId });
					return;
				}

				toast.success("Category Created", { id: toastId });
				form.reset();
			} catch (err) {
				toast.error("Something Went Wrong", { id: toastId });
			}
		},
	});

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle>Create a New Category</CardTitle>
				<CardDescription>Enter the category details below to create it.</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="category-form"
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
											type="text"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Category Name"
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
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										>
											<option value="" disabled>
												Select a status
											</option>
											<option value="DRAFT">Draft</option>
											<option value="PUBLISHED">Published</option>
										</select>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col">
				<Button form="category-form" type="submit" className="w-full">
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}
