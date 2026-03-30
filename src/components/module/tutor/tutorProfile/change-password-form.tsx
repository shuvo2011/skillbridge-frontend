// components/module/tutor-profile/change-password-form.tsx
"use client";

import { changePassword } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z
	.object({
		currentPassword: z.string().min(1, "Current password is required"),
		newPassword: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export function ChangePasswordForm() {
	const form = useForm({
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validators: { onSubmit: passwordSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Updating password...");

			const result = await changePassword({
				currentPassword: value.currentPassword,
				newPassword: value.newPassword,
			});

			if (result.error) {
				toast.error(result.error.message, { id: toastId });
				return;
			}

			toast.success("Password Updated", { id: toastId });
			form.reset();
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Change Password</CardTitle>
				<CardDescription>Update your password to keep your account secure.</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field
							name="currentPassword"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
										<Input
											id={field.name}
											type="password"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="••••••••"
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
						<div className="grid grid-cols-6 gap-4">
							<div className="col-span-6 md:col-span-3">
								<form.Field
									name="newPassword"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>New Password</FieldLabel>
												<Input
													id={field.name}
													type="password"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="••••••••"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>
							<div className="col-span-6 md:col-span-3">
								<form.Field
									name="confirmPassword"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
												<Input
													id={field.name}
													type="password"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="••••••••"
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
						Update Password
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
