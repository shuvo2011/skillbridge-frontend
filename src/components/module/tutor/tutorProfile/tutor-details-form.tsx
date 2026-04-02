"use client";

import { updateTutorProfile } from "@/actions/tutor.action";
import { updateProfilePicture } from "@/actions/update-profile-picture";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const tutorDetailsSchema = z.object({
	bio: z.string().max(1000, "Bio must be less than 1000 characters"),
	qualification: z.string().max(255, "Qualification must be less than 255 characters"),
	experienceYears: z.number().min(0, "Experience cannot be negative").max(50, "Experience must be less than 50 years"),
	phone: z.string().max(15, "Phone number must be less than 15 characters"),
	address: z.string().max(255, "Address must be less than 255 characters"),
	price: z.number().min(0, "Price cannot be negative").max(5000, "Price must be less than 5000 BDT"),
});

type TutorProfile = {
	bio?: string;
	qualification?: string;
	experienceYears?: number;
	phone?: string;
	address?: string;
	price?: number;
};

export function TutorDetailsForm({ profile, currentImage }: { profile?: TutorProfile; currentImage?: string | null }) {
	const [preview, setPreview] = useState<string | null>(currentImage ?? null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [uploading, setUploading] = useState(false);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 2 * 1024 * 1024) {
			toast.error("Image must be less than 2MB");
			return;
		}

		setPreview(URL.createObjectURL(file));

		setUploading(true);
		const toastId = toast.loading("Uploading photo...");

		const formData = new FormData();
		formData.append("image", file);
		formData.append("currentImageUrl", currentImage ?? "");

		const result = await updateProfilePicture(formData);
		setUploading(false);

		if (result.error) {
			toast.error(result.error.message, { id: toastId });
			setPreview(currentImage ?? null);
			return;
		}

		toast.success("Profile picture updated!", { id: toastId });
	};

	const form = useForm({
		defaultValues: {
			bio: profile?.bio ?? "",
			qualification: profile?.qualification ?? "",
			experienceYears: profile?.experienceYears ?? 0,
			phone: profile?.phone ?? "",
			address: profile?.address ?? "",
			price: profile?.price ?? 0,
		},
		validators: { onSubmit: tutorDetailsSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Updating profile...");
			try {
				const res = await updateTutorProfile(value);
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
							<div className="col-span-6">
								<FieldLabel>Profile Picture</FieldLabel>
								<div className="mt-2 flex items-center gap-4">
									<div className="relative w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
										{preview ? (
											<img src={preview} alt="Profile" className="w-full h-full object-cover" />
										) : (
											<ImagePlus className="w-6 h-6 text-gray-400" />
										)}
									</div>

									<div className="flex flex-col gap-1">
										<Button
											type="button"
											variant="outline"
											size="sm"
											disabled={uploading}
											onClick={() => fileInputRef.current?.click()}
										>
											{uploading ? "Uploading..." : preview ? "Change Photo" : "Upload Photo"}
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

							<div className="col-span-6">
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
													placeholder="e.g. BSc in Computer Science, University of Dhaka"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>

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
													placeholder="e.g. 5"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>

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

							<div className="col-span-6">
								<form.Field
									name="price"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Hourly Rate (BDT)</FieldLabel>
												<div className="relative">
													<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">৳</span>
													<Input
														id={field.name}
														type="number"
														value={field.state.value}
														onChange={(e) => field.handleChange(Number(e.target.value))}
														placeholder="e.g. 500"
														className="pl-7"
													/>
												</div>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>

							<div className="col-span-6">
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
													placeholder="Your full address"
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>

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
													placeholder="Tell students about yourself, your teaching style, and what subjects you specialize in..."
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
