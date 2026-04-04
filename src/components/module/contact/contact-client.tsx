"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
const contactInfo = [
	{ icon: Mail, label: "Email Us", value: "hello@skillbridge.com", sub: "We'll respond within 24 hours" },
	{ icon: Phone, label: "Call Us", value: "0105 192 3556", sub: "Sat–Thu, 9am–6pm" },
	{ icon: MapPin, label: "Office", value: "81 Rivington Street", sub: "London EC2A 3AY" },
	{ icon: Clock, label: "Working Hours", value: "9:00 AM – 6:00 PM", sub: "Saturday to Thursday" },
];

const formSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	subject: z.string().min(1, "Subject is required"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactClient() {
	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			subject: "",
			message: "",
		},
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			toast.success("Message sent successfully!");
			form.reset();
		},
	});
	return (
		<main className="bg-white text-gray-800">
			<section className="py-20 px-6 text-center" style={{ background: "#f9f7ff" }}>
				<div className="max-w-2xl mx-auto">
					<span
						className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
						style={{ background: "#ede9fe", color: "#210095" }}
					>
						Contact Us
					</span>
					<h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#210095" }}>
						We'd love to hear from you
					</h1>
					<p className="text-gray-500 text-base leading-relaxed">
						Have a question, feedback, or need help? Reach out to the SkillBridge team and we'll get back to you as soon
						as possible.
					</p>
				</div>
			</section>

			<section className="py-20 px-6">
				<div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-12">
					<div className="flex flex-col gap-6">
						<h2 className="text-2xl font-extrabold" style={{ color: "#210095" }}>
							Get in touch
						</h2>
						<p className="text-sm text-gray-500 leading-relaxed">
							Whether you're a student looking for help, a tutor wanting to join, or just curious about SkillBridge —
							we're here for you.
						</p>
						<div className="flex flex-col gap-4 mt-2">
							{contactInfo.map(({ icon: Icon, label, value, sub }) => (
								<div key={label} className="flex items-start gap-4">
									<div
										className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
										style={{ background: "#ede9fe" }}
									>
										<Icon size={17} style={{ color: "#210095" }} />
									</div>
									<div>
										<p className="text-xs text-gray-400 font-medium">{label}</p>
										<p className="text-sm font-semibold text-gray-800">{value}</p>
										<p className="text-xs text-gray-400">{sub}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
						<h3 className="text-lg font-bold text-gray-800 mb-6">Send us a message</h3>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit();
							}}
							className="flex flex-col gap-4"
						>
							<FieldGroup>
								<div className="grid grid-cols-2 gap-4">
									<form.Field
										name="firstName"
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>First Name</FieldLabel>
													<Input
														id={field.name}
														placeholder="John"
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									/>
									<form.Field
										name="lastName"
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
													<Input
														id={field.name}
														placeholder="Doe"
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									/>
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
													placeholder="john@example.com"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>

								<form.Field
									name="subject"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Subject</FieldLabel>
												<Input
													id={field.name}
													placeholder="How can we help?"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>

								<form.Field
									name="message"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Message</FieldLabel>
												<textarea
													id={field.name}
													rows={4}
													placeholder="Write your message here..."
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-indigo-300 transition resize-none"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>

								<Field>
									<Button type="submit" className="w-full" style={{ background: "#210095" }}>
										Send Message
									</Button>
								</Field>
							</FieldGroup>
						</form>
					</div>
				</div>
			</section>
		</main>
	);
}
