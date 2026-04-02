"use client";

import { updateStudentProfile } from "@/actions/student.action";
import { updateProfilePicture } from "@/actions/update-profile-picture";
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

const studentDetailsSchema = z.object({
	bio: z.string().max(1000, "Bio must be less than 1000 characters"),
	phone: z.string().max(15),
	address: z.string(),
});

type StudentProfile = {
	bio?: string;
	phone?: string;
	address?: string;
};

export function StudentDetailsForm({
	profile,
	currentImage,
}: {
	profile?: StudentProfile;
	currentImage?: string | null;
}) {
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

	const handleRemoveImage = () => {
		setPreview(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const form = useForm({
		defaultValues: {
			bio: profile?.bio ?? "",
			phone: profile?.phone ?? "",
			address: profile?.address ?? "",
		},
		validators: { onSubmit: studentDetailsSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Updating profile...");
			try {
				const res = await updateStudentProfile(value);
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
				<CardTitle>Student Details</CardTitle>
				<CardDescription>Update your personal information.</CardDescription>
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
													placeholder="Tell us about yourself..."
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
