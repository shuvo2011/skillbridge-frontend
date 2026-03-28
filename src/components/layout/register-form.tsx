"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { GoogleRoleDialog } from "../common/GoogleRoleDialog";

const formSchema = z
	.object({
		name: z.string().min(1, "This field is required"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Minimum length is 8"),
		confirmPassword: z.string().min(1, "This field is required"),
		role: z.enum(["STUDENT", "TUTOR"], { message: "Please select a role" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			role: "",
		},
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Creating user");
			try {
				const { data, error } = await authClient.signUp.email({
					name: value.name,
					email: value.email,
					password: value.password,
					role: value.role,
				} as any);

				if (error) {
					toast.error(error.message, { id: toastId });
					return;
				}

				toast.success("User Created Successfully", { id: toastId });
			} catch (err) {
				toast.error("Something went wrong, please try again.", { id: toastId });
			}
		},
	});

	const [open, setOpen] = useState(false);

	const handleGoogleLogin = async (role: "STUDENT" | "TUTOR") => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "http://localhost:3000",
			fetchOptions: {
				body: { role },
			},
		});
		setOpen(false);
	};

	return (
		<form
			id="registration-form"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Create your account</h1>
					<p className="text-sm text-balance text-muted-foreground">Fill in the form below to create your account</p>
				</div>
				<form.Field
					name="role"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid} className="w-full max-w-xs">
								<FieldLabel htmlFor={field.name}>Register as</FieldLabel>
								<Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
									<SelectTrigger id={field.name}>
										<SelectValue placeholder="Select your role" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="STUDENT">Student</SelectItem>
											<SelectItem value="TUTOR">Tutor</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				<form.Field
					name="name"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Name</FieldLabel>
								<Input
									type="text"
									id={field.name}
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				<form.Field
					name="email"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									type="email"
									id={field.name}
									name={field.name}
									placeholder="m@example.com"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				<form.Field
					name="password"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								<Input
									type="password"
									id={field.name}
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				<form.Field
					name="confirmPassword"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
								<Input
									type="password"
									id={field.name}
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>
				<Field>
					<Button type="submit">Create Account</Button>
				</Field>
				<Field>
					<FieldDescription className="px-6 text-center">
						Already have an account? <Link href="/login">Sign in</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
