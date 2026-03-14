"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const POPULAR = ["Mathematics", "Physics", "English", "Web Design", "UI/UX"];
interface NavbarSearchProps {
	className?: string;
}
export default function NavbarSearch({ className }: NavbarSearchProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	// Focus input when popup opens
	useEffect(() => {
		if (open) setTimeout(() => inputRef.current?.focus(), 50);
	}, [open]);

	// Close on Escape
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	const handleSearch = () => {
		if (!query.trim()) return;
		router.push(`/tutors?q=${encodeURIComponent(query.trim())}`);
		setOpen(false);
		setQuery("");
	};

	return (
		<>
			{/* Search icon button */}
			<button
				onClick={() => setOpen(true)}
				className={`text-brand-navy hover:text-brand-violet transition-colors p-1.5 rounded-lg hover:bg-brand-violet/10 ${className ?? ""}`}
				aria-label="Search"
			>
				<Search className="w-5 h-5" />
			</button>

			{/* Backdrop */}
			{open && <div className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" onClick={() => setOpen(false)} />}

			{/* Popup */}
			{open && (
				<div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
					<div className="bg-white rounded-2xl shadow-2xl shadow-brand-navy/15 p-4 border border-brand-purple/10">
						{/* Input row */}
						<div className="flex items-center gap-2">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate" />
								<Input
									ref={inputRef}
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyDown={(e) => e.key === "Enter" && handleSearch()}
									placeholder="Search tutors, subjects..."
									className="pl-9 border-brand-purple/20 focus-visible:ring-brand-violet/30 text-brand-navy placeholder:text-brand-slate/60 rounded-xl"
								/>
							</div>
							<Button
								onClick={handleSearch}
								className="bg-brand-violet hover:bg-brand-navy text-white rounded-xl px-5 shrink-0"
							>
								Search
							</Button>
							<button
								onClick={() => setOpen(false)}
								className="text-brand-slate hover:text-brand-navy p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						{/* Popular tags */}
						<div className="mt-3 flex items-center gap-2 flex-wrap">
							<span className="text-[11px] text-brand-slate font-medium">Popular:</span>
							{POPULAR.map((tag) => (
								<button
									key={tag}
									onClick={() => {
										setQuery(tag);
										router.push(`/tutors?q=${encodeURIComponent(tag)}`);
										setOpen(false);
									}}
									className="text-[11px] font-medium text-brand-violet bg-brand-violet/8 hover:bg-brand-violet hover:text-white px-2.5 py-1 rounded-full transition-colors border border-brand-violet/20"
								>
									{tag}
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
