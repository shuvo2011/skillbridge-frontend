// components/module/tutorPage/tutor-filters.tsx
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { BRAND } from "./tutor-types";
import { Filters } from "@/types/tutor.types";

interface TutorFiltersProps {
	filters: Filters;
	setFilter: (k: keyof Filters, v: string) => void;
	clearAll: () => void;
	filteredCount: number;
	categories: string[];
}

export function TutorFilters({ filters, setFilter, clearAll, filteredCount, categories }: TutorFiltersProps) {
	const hasActive =
		!!filters.search || filters.category !== "All" || filters.minExperience !== "0" || filters.sortBy !== "featured";

	return (
		<div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 sm:p-5 mb-8 space-y-4">
			{/* Search */}
			<div className="relative">
				<Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
				<input
					className="w-full h-10 pl-9 pr-9 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all"
					onFocus={(e) => {
						e.target.style.borderColor = `${BRAND}50`;
						e.target.style.boxShadow = `0 0 0 3px ${BRAND}12`;
					}}
					onBlur={(e) => {
						e.target.style.borderColor = "";
						e.target.style.boxShadow = "";
					}}
					placeholder="Search by name, subject, or keyword..."
					value={filters.search}
					onChange={(e) => setFilter("search", e.target.value)}
				/>
				{filters.search && (
					<button
						onClick={() => setFilter("search", "")}
						className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
					>
						<X size={13} />
					</button>
				)}
			</div>

			{/* Category pills */}
			<div className="overflow-x-auto -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
				<div className="flex gap-2 pb-0.5 w-max sm:w-auto sm:flex-wrap">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setFilter("category", cat)}
							className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 whitespace-nowrap"
							style={
								filters.category === cat
									? { background: BRAND, color: "#fff", borderColor: BRAND, boxShadow: `0 2px 8px ${BRAND}40` }
									: { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }
							}
							onMouseEnter={(e) => {
								if (filters.category !== cat) {
									(e.target as HTMLElement).style.borderColor = `${BRAND}50`;
									(e.target as HTMLElement).style.color = BRAND;
								}
							}}
							onMouseLeave={(e) => {
								if (filters.category !== cat) {
									(e.target as HTMLElement).style.borderColor = "#e5e7eb";
									(e.target as HTMLElement).style.color = "#6b7280";
								}
							}}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			{/* Dropdowns */}
			<div className="flex items-center gap-2 flex-wrap">
				<Select value={filters.minExperience} onValueChange={(v) => setFilter("minExperience", v)}>
					<SelectTrigger className="h-9 w-[145px] text-xs border-gray-200 bg-gray-50">
						<SelectValue placeholder="Experience" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">Any experience</SelectItem>
						<SelectItem value="2">2+ years</SelectItem>
						<SelectItem value="5">5+ years</SelectItem>
						<SelectItem value="8">8+ years</SelectItem>
					</SelectContent>
				</Select>
				<Select value={filters.maxPrice} onValueChange={(v) => setFilter("maxPrice", v)}>
					<SelectTrigger className="h-9 w-[145px] text-xs border-gray-200 bg-gray-50">
						<SelectValue placeholder="Max Price" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">Any price</SelectItem>
						<SelectItem value="500">Under ৳500</SelectItem>
						<SelectItem value="1000">Under ৳1000</SelectItem>
						<SelectItem value="2000">Under ৳2000</SelectItem>
					</SelectContent>
				</Select>
				<Select value={filters.sortBy} onValueChange={(v) => setFilter("sortBy", v)}>
					<SelectTrigger className="h-9 w-36 text-xs border-gray-200 bg-gray-50">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="featured">Featured first</SelectItem>
						<SelectItem value="rating">Top rated</SelectItem>
						<SelectItem value="experience">Most experienced</SelectItem>
						<SelectItem value="price_low">Price: Low to High</SelectItem> {/* ← add */}
						<SelectItem value="price_high">Price: High to Low</SelectItem>
					</SelectContent>
				</Select>

				{hasActive && (
					<button
						onClick={clearAll}
						className="ml-auto flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
					>
						<X size={11} /> Clear filters
					</button>
				)}
			</div>

			{hasActive && (
				<p className="text-xs text-gray-500 pt-2 border-t border-gray-50">
					<span className="font-semibold text-gray-800">{filteredCount}</span> tutor
					{filteredCount !== 1 ? "s" : ""} match your filters
				</p>
			)}
		</div>
	);
}
