"use client";

import { Tutor } from "@/types/tutor.types";
import { BRAND, avgRating, initials, PER_PAGE } from "./tutor-types";
import { Star, Clock, MapPin, GraduationCap, CalendarDays, UserRound } from "lucide-react";
import Link from "next/link";

export function SkeletonCard() {
	return (
		<div className="rounded-2xl overflow-hidden border border-gray-100 bg-white">
			<div className="h-24 bg-gray-100 animate-pulse" />
			<div className="p-5 space-y-3 -mt-8">
				<div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse border-4 border-white" />
				<div className="space-y-2 pt-1">
					<div className="h-4 bg-gray-100 animate-pulse rounded w-2/3" />
					<div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
				</div>
				<div className="h-3 bg-gray-100 animate-pulse rounded" />
				<div className="h-3 bg-gray-100 animate-pulse rounded w-4/5" />
				<div className="h-10 bg-gray-100 animate-pulse rounded-xl mt-2" />
			</div>
		</div>
	);
}

export function TutorCard({ tutor, index }: { tutor: Tutor; index: number }) {
	const rating = avgRating(tutor.reviews);
	const cats = tutor.tutorCategories.slice(0, 3);
	const extra = tutor.tutorCategories.length - 3;

	return (
		<div
			className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-violet/20 hover:shadow-xl hover:shadow-brand-violet/8 hover:-translate-y-1 transition-all duration-250 cursor-pointer"
			style={{
				background: "#f8f8fa",
				animation: "fadeUp 0.35s ease both",
				animationDelay: `${(index % PER_PAGE) * 55}ms`,
			}}
		>
			<div className="relative h-20 flex items-end px-5 pb-0" style={{ background: "#efefef" }}>
				{tutor.isFeatured && (
					<span
						className="absolute top-3 right-3 text-[0.62rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
						style={{ background: BRAND, color: "#fff" }}
					>
						★ Featured
					</span>
				)}
				<div
					className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md flex items-center justify-center translate-y-8 shrink-0"
					style={{ background: `${BRAND}18` }}
				>
					{tutor.user.image ? (
						<img src={tutor.user.image} alt={tutor.user.name} className="w-full h-full object-cover" />
					) : (
						<span className="text-base font-bold" style={{ color: BRAND }}>
							{initials(tutor.user.name)}
						</span>
					)}
				</div>
			</div>

			<div className="px-5 pt-10 pb-5 flex flex-col gap-3">
				<div>
					<div className="flex items-center gap-2 flex-wrap">
						<h3 className="font-bold text-[1rem] text-gray-900 leading-tight">{tutor.user.name}</h3>
						{tutor.user.banned && (
							<span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-200">
								Banned
							</span>
						)}
					</div>
					{tutor.qualification && (
						<p className="flex items-center gap-1.5 text-[0.76rem] text-gray-500 mt-0.5">
							<GraduationCap size={11} style={{ color: BRAND }} className="shrink-0" />
							{tutor.qualification}
						</p>
					)}
					{rating && (
						<div className="flex items-center gap-1 mt-1.5">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									size={11}
									className={
										i < Math.round(parseFloat(rating)) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
									}
								/>
							))}
							<span className="text-[0.78rem] font-semibold text-amber-600 ml-0.5">{rating}</span>
							<span className="text-[0.72rem] text-gray-400">({tutor.reviews.length})</span>
						</div>
					)}
				</div>

				{tutor.bio && <p className="text-[0.79rem] text-gray-500 leading-relaxed line-clamp-2">{tutor.bio}</p>}

				<div className="flex flex-wrap gap-2">
					{tutor.price && (
						<span
							className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold bg-white border border-gray-100 px-2.5 py-1 rounded-lg shadow-sm"
							style={{ color: BRAND }}
						>
							৳ {tutor.price}
						</span>
					)}
					{tutor.experienceYears !== undefined && (
						<span className="inline-flex items-center gap-1.5 text-[0.72rem] text-gray-600 bg-white border border-gray-100 px-2.5 py-1 rounded-lg font-medium shadow-sm">
							<Clock size={10} style={{ color: BRAND }} /> {tutor.experienceYears} yrs exp
						</span>
					)}
					{tutor.address && (
						<span className="inline-flex items-center gap-1.5 text-[0.72rem] text-gray-600 bg-white border border-gray-100 px-2.5 py-1 rounded-lg font-medium shadow-sm">
							<MapPin size={10} style={{ color: BRAND }} /> {tutor.address}
						</span>
					)}
				</div>

				<div className="flex flex-wrap gap-1.5">
					{cats.map((c) => (
						<span
							key={c.category.name}
							className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full border"
							style={{ background: `${BRAND}12`, color: BRAND, borderColor: `${BRAND}22` }}
						>
							{c.category.name}
						</span>
					))}
					{extra > 0 && (
						<span className="text-[0.7rem] font-medium px-2.5 py-1 rounded-full bg-white border border-gray-100 text-gray-400">
							+{extra} more
						</span>
					)}
				</div>

				<div className="border-t border-gray-100" />

				<div className="flex gap-2">
					<Link
						href={`/tutors/${tutor.id}`}
						className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl border-2 text-[0.82rem] font-semibold transition-all hover:opacity-80"
						style={{ borderColor: `${BRAND}30`, color: BRAND, background: `${BRAND}08` }}
					>
						<UserRound size={13} /> View Profile
					</Link>
					<button
						disabled={tutor.user.banned}
						className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl text-[0.82rem] font-bold text-white transition-all hover:opacity-90 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
						style={{ background: BRAND, boxShadow: `0 4px 14px ${BRAND}35` }}
					>
						<CalendarDays size={13} /> Book Now
					</button>
				</div>
			</div>

			<style>{`
				@keyframes fadeUp {
					from { opacity: 0; transform: translateY(16px); }
					to   { opacity: 1; transform: translateY(0); }
				}
			`}</style>
		</div>
	);
}
