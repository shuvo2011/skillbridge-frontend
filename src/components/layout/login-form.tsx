"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "This field is required"),
});

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Logging in...");
			try {
				const { data, error } = await authClient.signIn.email({
					email: value.email,
					password: value.password,
				});

				if (error) {
					toast.error(error.message, { id: toastId });
					return;
				}

				toast.success("Logged in successfully", { id: toastId });

				const role = (data?.user as any)?.role;
				if (role === "STUDENT") router.push("/dashboard");
				else if (role === "TUTOR") router.push("/tutor/dashboard");
				else if (role === "ADMIN") router.push("/admin");
			} catch (err) {
				toast.error("Something went wrong, please try again.", { id: toastId });
			}
		},
	});

	return (
		<form
			id="login-form"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Welcome back</h1>
					<p className="text-sm text-balance text-muted-foreground">Login to your SkillBridge account</p>
				</div>

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
								<div className="flex items-center">
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
									<a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
										Forgot your password?
									</a>
								</div>
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
					<Button type="submit">Login</Button>
				</Field>
				<Field>
					<FieldDescription className="px-6 text-center">
						Don&apos;t have an account? <Link href="/register">Register now</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
