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
				<FieldSeparator>Or continue with</FieldSeparator>
				<Field>
					<Button variant="outline" type="button">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								fill="currentColor"
							/>
						</svg>
						Login with Google
					</Button>
					<FieldDescription className="px-6 text-center">
						Don&apos;t have an account? <Link href="/register">Register now</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
