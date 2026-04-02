"use client";

import { createAvailability } from "@/actions/availability.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export function AddAvailabilityForm() {
	const form = useForm({
		defaultValues: {
			dayOfWeek: "" as (typeof Days)[number],
			availableFrom: "",
			availableTo: "",
		},
		validators: { onSubmit: availabilitySchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Adding availability...");
			try {
				const res = await createAvailability(value);
				if (res.error) {
					toast.error(res.error.message, { id: toastId });
					return;
				}
				toast.success("Availability Added", { id: toastId });
				form.reset();
			} catch {
				toast.error("Something Went Wrong", { id: toastId });
			}
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Add Availability</CardTitle>
				<CardDescription>Set your available days and time slots.</CardDescription>
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
											<option value="" disabled>
												Select a day
											</option>
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
						Add Availability
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
