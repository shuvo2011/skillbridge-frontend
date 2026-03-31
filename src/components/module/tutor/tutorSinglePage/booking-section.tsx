// components/module/tutor/tutorsPage/booking-section.tsx
"use client";

import { TutorDetail, Availability } from "@/types/tutor.types";
import { CalendarDays, Clock, LogIn } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BRAND } from "../tutorsPage/tutor-types";

type Session = { user: { name: string; email: string; role: string } } | null;

const DAYS_ORDER = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

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

	const grouped = groupByDay(tutor.availability);
	const isStudent = session?.user?.role === "STUDENT";

	const handleBook = async () => {
		if (!selectedSlot || !selectedDate) {
			toast.error("Please select a slot and date");
			return;
		}
		// TODO: booking action call
		toast.success("Booking confirmed!");
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
					<div className="flex flex-col gap-3">
						{Object.entries(grouped).map(([day, slots]) => (
							<div key={day}>
								<p className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400 mb-1.5">{day}</p>
								<div className="flex flex-col gap-1.5">
									{slots.map((slot) => (
										<button
											key={slot.id}
											onClick={() => setSelectedSlot(slot)}
											className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all"
											style={
												selectedSlot?.id === slot.id
													? { background: BRAND, color: "#fff", borderColor: BRAND }
													: { background: "#f8f8fa", color: "#374151", borderColor: "#e5e7eb" }
											}
										>
											<Clock size={10} />
											{formatTime(slot.availableFrom)} – {formatTime(slot.availableTo)}
										</button>
									))}
								</div>
							</div>
						))}
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
							disabled={!selectedSlot || !selectedDate}
							className="w-full h-10 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							style={{ background: BRAND, boxShadow: `0 4px 14px ${BRAND}35` }}
						>
							Confirm Booking
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
