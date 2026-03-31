// components/module/tutor/tutorsPage/reviews-section.tsx
"use client";

import { Review } from "@/types/tutor.types";
import { Star, MessageSquare } from "lucide-react";
import { BRAND, avgRating } from "../tutorsPage/tutor-types";

type Session = { user: { name: string; email: string; role: string } } | null;

export function ReviewsSection({
	reviews,
	tutorId,
	session,
}: {
	reviews: Review[];
	tutorId: string;
	session: Session;
}) {
	const rating = avgRating(reviews);

	return (
		<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="font-semibold text-gray-800 flex items-center gap-2">
					<MessageSquare size={15} style={{ color: BRAND }} />
					Reviews {reviews.length > 0 && <span className="text-gray-400 font-normal text-sm">({reviews.length})</span>}
				</h2>
				{rating && (
					<div className="flex items-center gap-1">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								size={12}
								className={
									i < Math.round(parseFloat(rating)) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
								}
							/>
						))}
						<span className="text-sm font-semibold text-amber-600 ml-1">{rating}</span>
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
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
								style={{ background: `${BRAND}15`, color: BRAND }}
							>
								{review.student.user.name.charAt(0).toUpperCase()}
							</div>
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-gray-800">{review.student.user.name}</p>
									<div className="flex items-center gap-0.5">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												size={10}
												className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
											/>
										))}
									</div>
								</div>
								{review.comment && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{review.comment}</p>}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
