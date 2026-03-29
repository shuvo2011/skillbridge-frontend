// components/module/tutor-profile/tutor-details-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const tutorDetailsSchema = z.object({
	bio: z.string().max(1000, "Bio must be less than 1000 characters").optional(),
	qualification: z.string().max(255).optional(),
	experienceYears: z.coerce.number().min(0).max(50).optional(),
	phone: z.string().max(15).optional(),
	address: z.string().optional(),
});

type TutorProfile = {
	bio?: string;
	qualification?: string;
	experienceYears?: number;
	phone?: string;
	address?: string;
	profilePicture?: string;
};

export function TutorDetailsForm({ profile }: { profile?: TutorProfile }) {
	const [preview, setPreview] = useState<string | null>(profile?.profilePicture ?? null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		setPreview(url);
	};

	const handleRemoveImage = () => {
		setPreview(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const form = useForm({
		defaultValues: {
			bio: profile?.bio ?? "",
			qualification: profile?.qualification ?? "",
			experienceYears: profile?.experienceYears ?? 0,
			phone: profile?.phone ?? "",
			address: profile?.address ?? "",
		},
		validators: { onSubmit: tutorDetailsSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Updating profile...");
			try {
				// TODO: updateTutorProfile action call
				toast.success("Profile Updated", { id: toastId });
			} catch {
				toast.error("Something Went Wrong", { id: toastId });
			}
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Tutor Details</CardTitle>
				<CardDescription>Update your professional information.</CardDescription>
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
							{/* Profile Picture */}
							<div className="col-span-6">
								<FieldLabel>Profile Picture</FieldLabel>
								<div className="mt-2 flex items-center gap-4">
									<div className="relative w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
										{preview ? (
											<>
												<img src={preview} alt="Profile" className="w-full h-full object-cover" />
												<button
													type="button"
													onClick={handleRemoveImage}
													className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
												>
													<X className="w-3 h-3" />
												</button>
											</>
										) : (
											<ImagePlus className="w-6 h-6 text-gray-400" />
										)}
									</div>
									<div className="flex flex-col gap-1">
										<Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
											{preview ? "Change Photo" : "Upload Photo"}
										</Button>
										<p className="text-xs text-muted-foreground">JPG, PNG. Max 2MB.</p>
									</div>
									<input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleImageChange}
									/>
								</div>
							</div>

							{/* Qualification */}
							<div className="col-span-6 md:col-span-3">
								<form.Field
									name="qualification"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Qualification</FieldLabel>
												<Input
													id={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="e.g. BSc Computer Science"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>

							{/* Experience */}
							<div className="col-span-6 md:col-span-3">
								<form.Field
									name="experienceYears"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Experience (years)</FieldLabel>
												<Input
													id={field.name}
													type="number"
													value={field.state.value}
													onChange={(e) => field.handleChange(Number(e.target.value))}
													placeholder="e.g. 3"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>

							{/* Phone */}
							<div className="col-span-6 md:col-span-3">
								<form.Field
									name="phone"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Phone</FieldLabel>
												<Input
													id={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="+880 1234 567890"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>

							{/* Address */}
							<div className="col-span-6 md:col-span-3">
								<form.Field
									name="address"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Address</FieldLabel>
												<Input
													id={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Your address"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>

							{/* Bio */}
							<div className="col-span-6">
								<form.Field
									name="bio"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Bio</FieldLabel>
												<Textarea
													id={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Tell students about yourself..."
													rows={4}
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
						Save Details
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
