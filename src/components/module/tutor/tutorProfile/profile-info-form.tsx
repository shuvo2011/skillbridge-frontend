// components/module/tutor-profile/profile-info-form.tsx
"use client";

import { updateUserInfo } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
});

export function ProfileInfoForm({ user }: { user: { name: string; email: string } }) {
	const form = useForm({
		defaultValues: {
			name: user.name,
			email: user.email,
		},
		validators: { onSubmit: profileSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Updating profile...");
			try {
				const res = await updateUserInfo(value);
				if (res.error) {
					toast.error(res.error.message, { id: toastId });
					return;
				}
				toast.success("Profile Updated", { id: toastId });
			} catch {
				toast.error("Something Went Wrong", { id: toastId });
			}
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
				<CardDescription>Update your name and email address.</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<div className="grid grid-cols-6 gap-4">
							<div className="col-span-6 md:col-span-3">
								<form.Field
									name="name"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
												<Input
													id={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Your full name"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>
							<div className="col-span-6 md:col-span-3">
								<form.Field
									name="email"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Email</FieldLabel>
												<Input
													id={field.name}
													type="email"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="your@email.com"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>
						</div>
					</FieldGroup>
					<Button type="submit" className="mt-4">
						Save Changes
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
