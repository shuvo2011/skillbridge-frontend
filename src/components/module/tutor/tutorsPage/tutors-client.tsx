"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { BookOpen, X } from "lucide-react";
import { BRAND, PER_PAGE, avgRating } from "./tutor-types";
import { TutorCard, SkeletonCard } from "./tutor-card";
import { TutorFilters } from "./tutor-filters";
import { Filters, Tutor } from "@/types/tutor.types";
import { useSearchParams } from "next/navigation";

export default function TutorsClient({ tutors }: { tutors: Tutor[] }) {
	const searchParams = useSearchParams();
	const [filters, setFilters] = useState<Filters>({
		search: searchParams.get("q") ?? "",
		category: "All",
		minExperience: "0",
		sortBy: "featured",
		maxPrice: "0",
	});
	const [visible, setVisible] = useState<Tutor[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const loaderRef = useRef<HTMLDivElement>(null);

	const filtered = tutors
		.filter((t) => {
			const q = filters.search.toLowerCase();
			const matchSearch =
				!q ||
				t.user.name.toLowerCase().includes(q) ||
				t.bio?.toLowerCase().includes(q) ||
				t.tutorCategories.some((c) => c.category.name.toLowerCase().includes(q));
			const matchCat =
				filters.category === "All" || t.tutorCategories.some((c) => c.category.name === filters.category);
			const matchExp = (t.experienceYears ?? 0) >= parseInt(filters.minExperience);
			const matchPrice = filters.maxPrice === "0" || (t.price ? t.price <= parseInt(filters.maxPrice) : true);
			return matchSearch && matchCat && matchExp && matchPrice;
		})
		.sort((a, b) => {
			if (filters.sortBy === "rating")
				return parseFloat(avgRating(b.reviews) ?? "0") - parseFloat(avgRating(a.reviews) ?? "0");
			if (filters.sortBy === "experience") return (b.experienceYears ?? 0) - (a.experienceYears ?? 0);
			if (filters.sortBy === "price_low") return (a.price ?? 0) - (b.price ?? 0);
			if (filters.sortBy === "price_high") return (b.price ?? 0) - (a.price ?? 0);
			return Number(b.isFeatured) - Number(a.isFeatured);
		});

	const loadMore = useCallback(() => {
		if (loading || !hasMore) return;
		setLoading(true);
		setTimeout(() => {
			setVisible((prev) => {
				const next = filtered.slice(prev.length, prev.length + PER_PAGE);
				const updated = [...prev, ...next];
				setHasMore(updated.length < filtered.length);
				return updated;
			});
			setLoading(false);
		}, 400);
	}, [loading, hasMore, filtered]);

	useEffect(() => {
		setVisible([]);
		setHasMore(true);
	}, [filters]);

	useEffect(() => {
		if (visible.length === 0) loadMore();
	}, [visible]);

	useEffect(() => {
		const el = loaderRef.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) loadMore();
			},
			{
				threshold: 0.1,
				rootMargin: "200px",
			},
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [loadMore]);

	const setFilter = (k: keyof Filters, v: string) => setFilters((p) => ({ ...p, [k]: v }));
	const clearAll = () =>
		setFilters({ search: "", category: "All", minExperience: "0", sortBy: "featured", maxPrice: "0" });
	const hasActive =
		!!filters.search ||
		filters.category !== "All" ||
		filters.minExperience !== "0" ||
		filters.sortBy !== "featured" ||
		filters.maxPrice !== "0";

	const allCategoryNames = [
		"All",
		...Array.from(new Set(tutors.flatMap((t) => t.tutorCategories.map((c) => c.category.name)))),
	];

	return (
		<div className="min-h-screen bg-[#f7f6fb]">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
				<div className="mb-8">
					<div
						className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border mb-4"
						style={{ color: BRAND, background: `${BRAND}10`, borderColor: `${BRAND}20` }}
					>
						<BookOpen size={12} /> Browse Tutors
					</div>
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
						Find your perfect <span style={{ color: BRAND }}>tutor</span>
					</h1>
					<p className="text-sm text-gray-500 mt-1.5">Browse {tutors.length}+ verified tutors across all subjects</p>
				</div>

				<TutorFilters
					filters={filters}
					setFilter={setFilter}
					clearAll={clearAll}
					filteredCount={filtered.length}
					categories={allCategoryNames}
				/>

				{!hasActive && visible.length > 0 && (
					<p className="text-sm text-gray-500 mb-5">
						Showing <span className="font-semibold text-gray-800">{visible.length}</span> of{" "}
						<span className="font-semibold text-gray-800">{filtered.length}</span> tutors
					</p>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					{visible.map((t, i) => (
						<TutorCard key={t.id} tutor={t} index={i} />
					))}

					{loading && Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}

					{!loading && visible.length === 0 && (
						<div className="col-span-full flex flex-col items-center py-20 text-center">
							<div
								className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
								style={{ background: `${BRAND}10` }}
							>
								<BookOpen size={24} style={{ color: BRAND }} />
							</div>
							<h3 className="font-semibold text-gray-800 mb-1">No tutors found</h3>
							<p className="text-sm text-gray-500 mb-5">Try adjusting your search or filters</p>
							<button
								onClick={clearAll}
								className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
								style={{ background: BRAND, color: "#fff", boxShadow: `0 4px 14px ${BRAND}35` }}
							>
								Clear filters
							</button>
						</div>
					)}

					{!hasMore && visible.length > 0 && !loading && (
						<div className="col-span-full flex flex-col items-center py-10 gap-2">
							<div className="w-10 h-0.5 rounded-full" style={{ background: `${BRAND}25` }} />
							<p className="text-xs text-gray-400">All {filtered.length} tutors shown</p>
						</div>
					)}
				</div>

				{loading && visible.length > 0 && (
					<div className="flex justify-center py-8">
						<div
							className="w-7 h-7 rounded-full border-2 animate-spin"
							style={{ borderColor: `${BRAND}25`, borderTopColor: BRAND }}
						/>
					</div>
				)}

				<div ref={loaderRef} className="h-4" />
			</div>
		</div>
	);
}
