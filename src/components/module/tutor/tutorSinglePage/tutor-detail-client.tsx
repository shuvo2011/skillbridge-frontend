// components/module/tutor/tutorsPage/tutor-detail-client.tsx
"use client";

import { TutorDetail } from "@/types/tutor.types";
import { Star, Clock, MapPin, GraduationCap, Phone, Mail, BookOpen } from "lucide-react";
import { BookingSection } from "./booking-section";
import { ReviewsSection } from "./reviews-section";
import Link from "next/link";
import { BRAND, avgRating, initials } from "../tutorsPage/tutor-types";

type Session = { user: { name: string; email: string; role: string; banned: boolean } } | null;

export function TutorDetailClient({ tutor, session }: { tutor: TutorDetail; session: Session }) {
	const rating = avgRating(tutor.reviews);
	// console.log(tutor);
	return (
		<div className="min-h-screen bg-[#f7f6fb]">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
				{/* Back */}
				<Link
					href="/tutors"
					className="inline-flex items-center gap-2 text-xs font-semibold mb-6 hover:opacity-70 transition-opacity"
					style={{ color: BRAND }}
				>
					← Back to tutors
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* ── Left column ── */}
					<div className="lg:col-span-2 flex flex-col gap-6">
						{/* Profile card */}
						<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
							<div className="h-24 w-full" style={{ background: `${BRAND}15` }} />
							<div className="px-6 pb-6 -mt-10">
								<div
									className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden flex items-center justify-center mb-3"
									style={{ background: `${BRAND}18` }}
								>
									{tutor.user.image ? (
										<img src={tutor.user.image} alt={tutor.user.name} className="w-full h-full object-cover" />
									) : (
										<span className="text-xl font-bold" style={{ color: BRAND }}>
											{initials(tutor.user.name)}
										</span>
									)}
								</div>

								<div className="flex items-start justify-between flex-wrap gap-2">
									<div>
										<div className="flex items-center gap-2 flex-wrap">
											<h1 className="text-xl font-bold text-gray-900">{tutor.user.name}</h1>
											{tutor.user.banned && (
												<span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-red-100 text-red-600 border border-red-200">
													Banned
												</span>
											)}
										</div>
										{tutor.qualification && (
											<p className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
												<GraduationCap size={13} style={{ color: BRAND }} />
												{tutor.qualification}
											</p>
										)}
									</div>
									{tutor.isFeatured && (
										<span
											className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
											style={{ background: BRAND, color: "#fff" }}
										>
											★ Featured
										</span>
									)}
								</div>

								{/* Rating */}
								{rating && (
									<div className="flex items-center gap-1 mt-2">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												size={13}
												className={
													i < Math.round(parseFloat(rating))
														? "text-amber-400 fill-amber-400"
														: "text-gray-200 fill-gray-200"
												}
											/>
										))}
										<span className="text-sm font-semibold text-amber-600 ml-1">{rating}</span>
										<span className="text-xs text-gray-400">({tutor.reviews.length} reviews)</span>
									</div>
								)}

								{/* Meta */}
								<div className="flex flex-wrap gap-2 mt-3">
									{tutor.price && (
										<span
											className="inline-flex items-center gap-1.5 text-xs font-bold bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg"
											style={{ color: BRAND }}
										>
											৳ {tutor.price} / session
										</span>
									)}
									{tutor.experienceYears !== undefined && (
										<span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg font-medium">
											<Clock size={11} style={{ color: BRAND }} /> {tutor.experienceYears} yrs exp
										</span>
									)}
									{tutor.address && (
										<span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg font-medium">
											<MapPin size={11} style={{ color: BRAND }} /> {tutor.address}
										</span>
									)}
									{tutor.phone && (
										<span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg font-medium">
											<Phone size={11} style={{ color: BRAND }} /> {tutor.phone}
										</span>
									)}
									<span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg font-medium">
										<Mail size={11} style={{ color: BRAND }} /> {tutor.user.email}
									</span>
								</div>

								{/* Categories */}
								<div className="flex flex-wrap gap-1.5 mt-3">
									{tutor.tutorCategories.map((c) => (
										<span
											key={c.id}
											className="text-xs font-semibold px-2.5 py-1 rounded-full border"
											style={{ background: `${BRAND}12`, color: BRAND, borderColor: `${BRAND}22` }}
										>
											{c.category.name}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Bio */}
						{tutor.bio && (
							<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
								<h2 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
									<BookOpen size={15} style={{ color: BRAND }} /> About
								</h2>
								<p className="text-sm text-gray-600 leading-relaxed">{tutor.bio}</p>
							</div>
						)}

						{/* Reviews */}
						<ReviewsSection reviews={tutor.reviews} tutorId={tutor.id} session={session} />
					</div>

					{/* ── Right column — Booking ── */}
					<div className="lg:col-span-1">
						{tutor.user.banned ? (
							<div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 flex flex-col items-center text-center gap-3">
								<div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
									<span className="text-red-400 text-xl">🚫</span>
								</div>
								<h3 className="font-semibold text-gray-800 text-sm">Booking Unavailable</h3>
								<p className="text-xs text-gray-400 leading-relaxed">
									This tutor's account has been suspended. Booking is currently not available.
								</p>
							</div>
						) : (
							<BookingSection tutor={tutor} session={session} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
