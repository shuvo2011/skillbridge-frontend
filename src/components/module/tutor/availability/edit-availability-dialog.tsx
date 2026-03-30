// components/module/tutor/availability/edit-availability-dialog.tsx
"use client";

import { updateAvailability } from "@/actions/availability.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const Days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] as const;

const availabilitySchema = z.object({
	dayOfWeek: z.enum(Days, { message: "Day is required" }),
	availableFrom: z.string().min(1, "Start time is required"),
	availableTo: z.string().min(1, "End time is required"),
});

type Availability = {
	id: string;
	dayOfWeek: string;
	availableFrom: string;
	availableTo: string;
};

export function EditAvailabilityDialog({
	availability,
	open,
	onClose,
}: {
	availability: Availability;
	open: boolean;
	onClose: () => void;
}) {
	const form = useForm({
		defaultValues: {
			dayOfWeek: availability.dayOfWeek as (typeof Days)[number],
			availableFrom: availability.availableFrom,
			availableTo: availability.availableTo,
		},
		validators: { onSubmit: availabilitySchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Updating availability...");
			const res = await updateAvailability(availability.id, value);
			if (res.error) {
				toast.error(res.error.message, { id: toastId });
				return;
			}
			toast.success("Availability Updated", { id: toastId });
			onClose();
		},
	});

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Edit Availability</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						{/* Day */}
						<form.Field
							name="dayOfWeek"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Day</FieldLabel>
										<select
											id={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value as (typeof Days)[number])}
											className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										>
											{Days.map((day) => (
												<option key={day} value={day}>
													{day.charAt(0) + day.slice(1).toLowerCase()}
												</option>
											))}
										</select>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>

						{/* Time */}
						<div className="grid grid-cols-2 gap-4">
							<form.Field
								name="availableFrom"
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>From</FieldLabel>
											<Input
												id={field.name}
												type="time"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							/>
							<form.Field
								name="availableTo"
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>To</FieldLabel>
											<Input
												id={field.name}
												type="time"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							/>
						</div>
					</FieldGroup>
					<Button type="submit" className="w-full mt-4">
						Update Availability
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
