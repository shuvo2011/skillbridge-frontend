"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export default function NewsletterSection() {
	const form = useForm({
		defaultValues: { email: "" },
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			toast.success("Subscribed successfully!");
			form.reset();
		},
	});

	return (
		<section className="w-full bg-brand-peach py-20 px-6">
			<div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-4">
				<h2 className="text-3xl font-extrabold text-brand-navy">Subscribe Newsletter</h2>
				<p className="text-sm text-brand-slate">Subscribe our newsletter for getting the updates</p>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="mt-4 w-full max-w-lg"
				>
					<form.Field
						name="email"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<div className="flex w-full bg-white rounded-2xl shadow-sm overflow-hidden">
										<Input
											type="email"
											id={field.name}
											placeholder="Enter your email."
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											className="flex-1 h-12 border-none shadow-none focus-visible:ring-0 text-brand-navy placeholder:text-brand-gray bg-transparent px-4"
										/>
										<Button
											type="submit"
											className="bg-brand-violet h-12 hover:bg-brand-navy text-white px-8 py-5 rounded-xl font-semibold transition-all duration-200 shrink-0"
										>
											Get started
										</Button>
									</div>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					/>
				</form>
			</div>
		</section>
	);
}
