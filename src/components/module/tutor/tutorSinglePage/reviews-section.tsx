"use client";

import { useEffect, useState } from "react";
import { Review } from "@/types/tutor.types";
import { Star, MessageSquare, Loader2 } from "lucide-react";
import { BRAND, avgRating } from "../tutorsPage/tutor-types";
import { getReviewableBookings, createReview } from "@/services/review.service";
import { toast } from "sonner";

type Session = { user: { name: string; email: string; role: string } } | null;

type ReviewableBooking = {
	id: string;
	sessionDate: string;
	slotFrom: string;
	slotTo: string;
	category?: { name: string };
};

const formatDate = (dateStr: string) =>
	new Date(dateStr).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

export function ReviewsSection({
	reviews: initialReviews,
	tutorId,
	session,
}: {
	reviews: Review[];
	tutorId: string;
	session: Session;
}) {
	const [reviews, setReviews] = useState(initialReviews);
	const [reviewableBookings, setReviewableBookings] = useState<ReviewableBooking[]>([]);
	const [selectedBookingId, setSelectedBookingId] = useState<string>("");
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const [reviewText, setReviewText] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [loadingBookings, setLoadingBookings] = useState(false);

	const isStudent = session?.user.role === "STUDENT";
	const rating_avg = avgRating(reviews);

	// Fetch reviewable bookings if student
	useEffect(() => {
		if (!isStudent) return;
		setLoadingBookings(true);
		getReviewableBookings(tutorId).then(({ data }) => {
			setReviewableBookings(data ?? []);
			if (data?.length > 0) setSelectedBookingId(data[0].id);
			setLoadingBookings(false);
		});
	}, [tutorId, isStudent]);

	const handleSubmit = async () => {
		if (!selectedBookingId || rating === 0 || !reviewText.trim()) {
			toast.error("Please fill in all fields");
			return;
		}

		const submittedBooking = reviewableBookings.find((b) => b.id === selectedBookingId);

		setSubmitting(true);
		const result = await createReview(selectedBookingId, rating, reviewText.trim());
		setSubmitting(false);

		if (result.success) {
			toast.success(result.message);

			// Optimistic update — add to reviews list immediately
			const optimisticReview = {
				id: `optimistic-${Date.now()}`,
				rating,
				reviewText: reviewText.trim(),
				sessionDate: submittedBooking?.sessionDate ?? "",
				category: submittedBooking?.category ?? null,
				student: {
					user: {
						name: session?.user.name ?? "You",
						image: null,
					},
				},
			};
			setReviews((prev) => [optimisticReview as any, ...prev]);

			// Remove submitted booking from reviewable list
			setReviewableBookings((prev) => {
				const updated = prev.filter((b) => b.id !== selectedBookingId);
				setSelectedBookingId(updated[0]?.id ?? "");
				return updated;
			});
			setRating(0);
			setReviewText("");
		} else {
			toast.error(result.message);
		}
	};

	// console.log(reviews);

	return (
		<div className="flex flex-col gap-6">
			{/* ── Review Form ── */}
			{isStudent && !loadingBookings && reviewableBookings.length > 0 && (
				<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
					<h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
						<Star size={15} style={{ color: BRAND }} />
						Leave a Review
					</h2>

					{/* Booking selector / session info */}
					<div className="mb-4">
						<label className="text-xs font-semibold text-gray-500 mb-2 block">
							{reviewableBookings.length > 1 ? "Select Session" : "Session"}
						</label>
						<div className="flex flex-col gap-2">
							{reviewableBookings.map((b) => (
								<button
									key={b.id}
									type="button"
									onClick={() => reviewableBookings.length > 1 && setSelectedBookingId(b.id)}
									className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-left transition-all"
									style={
										selectedBookingId === b.id
											? { borderColor: BRAND, background: `${BRAND}08` }
											: { borderColor: "#e5e7eb", background: "#fff" }
									}
								>
									<div className="flex items-center gap-2.5">
										<div
											className="w-2 h-2 rounded-full shrink-0 transition-colors"
											style={{ background: selectedBookingId === b.id ? BRAND : "#d1d5db" }}
										/>
										<div>
											<p className="text-xs font-semibold text-gray-800">{b.category?.name ?? "Session"}</p>
											<p className="text-[0.7rem] text-gray-400">{formatDate(b.sessionDate)}</p>
										</div>
									</div>
									{selectedBookingId === b.id && reviewableBookings.length > 1 && (
										<span
											className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
											style={{ background: `${BRAND}15`, color: BRAND }}
										>
											Selected
										</span>
									)}
								</button>
							))}
						</div>
					</div>

					{/* Star rating */}
					<div className="mb-4">
						<label className="text-xs font-semibold text-gray-500 mb-1.5 block">Rating</label>
						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<button
									key={i}
									type="button"
									onMouseEnter={() => setHoverRating(i + 1)}
									onMouseLeave={() => setHoverRating(0)}
									onClick={() => setRating(i + 1)}
								>
									<Star
										size={22}
										className={
											i < (hoverRating || rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
										}
									/>
								</button>
							))}
							{rating > 0 && (
								<span className="text-xs text-gray-400 ml-1.5">
									{["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
								</span>
							)}
						</div>
					</div>

					{/* Review text */}
					<div className="mb-4">
						<label className="text-xs font-semibold text-gray-500 mb-1.5 block">Your Review</label>
						<textarea
							rows={3}
							className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 outline-none resize-none transition-all"
							placeholder="Share your experience with this tutor..."
							value={reviewText}
							onChange={(e) => setReviewText(e.target.value)}
							onFocus={(e) => {
								e.target.style.borderColor = `${BRAND}50`;
								e.target.style.boxShadow = `0 0 0 3px ${BRAND}12`;
							}}
							onBlur={(e) => {
								e.target.style.borderColor = "";
								e.target.style.boxShadow = "";
							}}
						/>
					</div>

					<button
						onClick={handleSubmit}
						disabled={submitting || rating === 0 || !reviewText.trim()}
						className="w-full h-9 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						style={{ background: BRAND }}
					>
						{submitting && <Loader2 size={14} className="animate-spin" />}
						{submitting ? "Submitting..." : "Submit Review"}
					</button>
				</div>
			)}

			{/* ── Reviews List ── */}
			<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="font-semibold text-gray-800 flex items-center gap-2">
						<MessageSquare size={15} style={{ color: BRAND }} />
						Reviews{" "}
						{reviews.length > 0 && <span className="text-gray-400 font-normal text-sm">({reviews.length})</span>}
					</h2>
					{rating_avg && (
						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									size={12}
									className={
										i < Math.round(parseFloat(rating_avg))
											? "text-amber-400 fill-amber-400"
											: "text-gray-200 fill-gray-200"
									}
								/>
							))}
							<span className="text-sm font-semibold text-amber-600 ml-1">{rating_avg}</span>
						</div>
					)}
				</div>

				{reviews.length === 0 ? (
					<div className="text-center py-8">
						<MessageSquare size={24} className="mx-auto text-gray-200 mb-2" />
						<p className="text-sm text-gray-400">No reviews yet</p>
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{reviews.map((review) => (
							<div key={review.id} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0">
								<div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
									{review.student.user.image ? (
										<img
											src={review.student.user.image}
											alt={review.student.user.name}
											className="w-full h-full object-cover"
										/>
									) : (
										<div
											className="w-full h-full flex items-center justify-center text-xs font-bold"
											style={{ background: `${BRAND}15`, color: BRAND }}
										>
											{review.student.user.name.charAt(0).toUpperCase()}
										</div>
									)}
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-800">{review.student.user.name}</p>
										<div className="flex items-center gap-0.5">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star
													key={i}
													size={10}
													className={
														i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
													}
												/>
											))}
										</div>
									</div>
									{/* Session info */}
									<div className="flex gap-2 pt-1 items-center">
										{review.booking?.category?.name && (
											<span
												className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border"
												style={{ background: `${BRAND}10`, color: BRAND, borderColor: `${BRAND}20` }}
											>
												{review.booking.category.name}
											</span>
										)}
										{review.booking?.sessionDate && (
											<span className="text-[0.68rem] text-gray-400">{formatDate(review.booking.sessionDate)}</span>
										)}
									</div>
									{review.reviewText && (
										<p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{review.reviewText}</p>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
