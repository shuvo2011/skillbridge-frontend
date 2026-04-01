// booking-section.tsx
"use client";

import { TutorDetail, Availability } from "@/types/tutor.types";
import { CalendarDays, Clock, LogIn, BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BRAND } from "../tutorsPage/tutor-types";
import { createBooking } from "@/actions/booking.action";

type Session = { user: { name: string; email: string; role: string } } | null;

const DAYS_ORDER = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const DAY_SHORT: Record<string, string> = {
	MONDAY: "Mon",
	TUESDAY: "Tue",
	WEDNESDAY: "Wed",
	THURSDAY: "Thu",
	FRIDAY: "Fri",
	SATURDAY: "Sat",
	SUNDAY: "Sun",
};

const formatTime = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number);
	const period = hours >= 12 ? "PM" : "AM";
	const displayHours = hours % 12 || 12;
	return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const groupByDay = (availability: Availability[]) => {
	return DAYS_ORDER.reduce(
		(acc, day) => {
			const slots = availability.filter((a) => a.dayOfWeek === day);
			if (slots.length) acc[day] = slots;
			return acc;
		},
		{} as Record<string, Availability[]>,
	);
};

export function BookingSection({ tutor, session }: { tutor: TutorDetail; session: Session }) {
	const [selectedSlot, setSelectedSlot] = useState<Availability | null>(null);
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedCategoryId, setSelectedCategoryId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [expandedDay, setExpandedDay] = useState<string | null>(null);

	const grouped = groupByDay(tutor.availability);
	const availableDays = Object.keys(grouped);
	const isStudent = session?.user?.role === "STUDENT";

	const handleBook = async () => {
		if (!selectedSlot || !selectedDate || !selectedCategoryId) {
			toast.error("Please select a slot, date and subject");
			return;
		}

		setIsLoading(true);
		const res = await createBooking({
			availabilityId: selectedSlot.id,
			sessionDate: selectedDate,
			categoryId: selectedCategoryId,
		});
		setIsLoading(false);

		if (res.error) {
			toast.error(res.error.message);
			return;
		}

		toast.success("Booking confirmed!");
		setSelectedSlot(null);
		setSelectedDate("");
		setSelectedCategoryId("");
		setExpandedDay(null);
	};

	const toggleDay = (day: string) => {
		setExpandedDay((prev) => (prev === day ? null : day));
		setSelectedSlot(null);
	};

	return (
		<div className="sticky top-6 flex flex-col gap-4">
			<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
				<h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
					<CalendarDays size={15} style={{ color: BRAND }} /> Available Slots
				</h2>

				{tutor.availability.length === 0 ? (
					<p className="text-sm text-gray-400 text-center py-4">No available slots</p>
				) : (
					<div className="flex flex-col gap-2">
						{availableDays.map((day) => {
							const slots = grouped[day];
							const isExpanded = expandedDay === day;
							const selectedInThisDay = selectedSlot && slots.some((s) => s.id === selectedSlot.id);

							return (
								<div
									key={day}
									className="rounded-xl border overflow-hidden transition-all"
									style={{
										borderColor: selectedInThisDay ? `${BRAND}40` : "#e5e7eb",
										background: selectedInThisDay ? `${BRAND}06` : "#fafafa",
									}}
								>
									{/* Day header */}
									<button
										onClick={() => toggleDay(day)}
										className="w-full flex items-center justify-between px-3 py-2.5 text-left"
									>
										<div className="flex items-center gap-2">
											<span
												className="text-[0.7rem] font-bold w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
												style={{
													background: selectedInThisDay ? BRAND : `${BRAND}12`,
													color: selectedInThisDay ? "#fff" : BRAND,
												}}
											>
												{DAY_SHORT[day]}
											</span>
											<div>
												<p className="text-xs font-semibold text-gray-700">
													{day.charAt(0) + day.slice(1).toLowerCase()}
												</p>
												<p className="text-[0.68rem] text-gray-400">
													{slots.length} slot{slots.length > 1 ? "s" : ""} available
													{selectedInThisDay && (
														<span style={{ color: BRAND }} className="ml-1 font-semibold">
															· {formatTime(selectedSlot!.availableFrom)} selected
														</span>
													)}
												</p>
											</div>
										</div>
										<ChevronDown
											size={14}
											className="text-gray-400 transition-transform duration-200"
											style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
										/>
									</button>
									{/* Slots */}
									{isExpanded && (
										<div className="px-3 pb-3 border-t border-gray-100">
											<div className="pt-2 flex flex-col gap-1.5">
												{slots.map((slot) => (
													<button
														key={slot.id}
														onClick={() => setSelectedSlot(slot)}
														className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all"
														style={
															selectedSlot?.id === slot.id
																? { background: BRAND, color: "#fff", borderColor: BRAND }
																: { background: "#fff", color: "#374151", borderColor: "#e5e7eb" }
														}
													>
														<Clock size={10} />
														{formatTime(slot.availableFrom)} – {formatTime(slot.availableTo)}
													</button>
												))}
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				)}
				{selectedSlot && tutor.price && (
					<div
						className="mt-3 px-3 py-2.5 rounded-xl flex items-center justify-between"
						style={{ background: `${BRAND}08`, border: `1px solid ${BRAND}20` }}
					>
						<span className="text-xs text-gray-500">Session fee</span>
						<span className="text-sm font-bold" style={{ color: BRAND }}>
							৳ {tutor.price}
						</span>
					</div>
				)}
				{/* Category select */}
				{selectedSlot && (
					<div className="mt-4">
						<p className="text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
							<BookOpen size={11} style={{ color: BRAND }} /> Select Subject
						</p>
						<select
							value={selectedCategoryId}
							onChange={(e) => setSelectedCategoryId(e.target.value)}
							className="w-full h-9 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none"
						>
							<option value="" disabled>
								Choose a subject
							</option>
							{tutor.tutorCategories.map((c) => (
								<option key={c.category.id} value={c.category.id}>
									{c.category.name}
								</option>
							))}
						</select>
					</div>
				)}

				{/* Date picker */}
				{selectedSlot && (
					<div className="mt-4">
						<p className="text-xs font-medium text-gray-600 mb-1.5">Select Date</p>
						<input
							type="date"
							value={selectedDate}
							min={new Date().toISOString().split("T")[0]}
							onChange={(e) => setSelectedDate(e.target.value)}
							className="w-full h-9 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none"
						/>
					</div>
				)}

				{/* Book button or login message */}
				<div className="mt-4">
					{!session ? (
						<div className="text-center">
							<p className="text-xs text-gray-500 mb-3">Login or register to book this tutor</p>
							<Link
								href="/login"
								className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-sm font-bold text-white transition-all"
								style={{ background: BRAND, boxShadow: `0 4px 14px ${BRAND}35` }}
							>
								<LogIn size={14} /> Login to Book
							</Link>
						</div>
					) : !isStudent ? (
						<p className="text-xs text-center text-gray-400">Only students can book tutors</p>
					) : (
						<button
							onClick={handleBook}
							disabled={!selectedSlot || !selectedDate || !selectedCategoryId || isLoading}
							className="w-full h-10 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							style={{ background: BRAND, boxShadow: `0 4px 14px ${BRAND}35` }}
						>
							{isLoading ? "Booking..." : "Confirm Booking"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
