// HeroSection.tsx
// Uses your existing brand colors from globals.css:
// --color-brand-violet: #210095
// --color-brand-navy: #262062
// --color-brand-midnight: #04004D
// --color-brand-slate: #706E81
// --color-brand-purple: #39326E
// --color-brand-peach: #FFEDE9
// --color-brand-gray: #707183

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const avatars = [
	{ initials: "AK", color: "bg-brand-violet" },
	{ initials: "SR", color: "bg-brand-purple" },
	{ initials: "MR", color: "bg-brand-navy" },
];

export default function HeroSection() {
	return (
		<section className="relative w-full min-h-[calc(100vh-64px)] bg-brand-peach overflow-hidden flex items-center">
			{/* Decorative blobs */}
			<div className="absolute top-10 right-[38%] w-14 h-14 rounded-full bg-brand-violet/15 blur-sm" />
			<div className="absolute bottom-24 left-[42%] w-24 h-24 rounded-full bg-brand-violet opacity-80" />
			<div className="absolute top-1/3 right-[30%] w-6 h-6 rounded-full bg-brand-purple/40" />

			{/* Main content grid */}
			<div className="mx-auto w-full max-w-7xl px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
				{/* LEFT — Text content */}
				<div className="flex flex-col gap-6 z-10">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 w-fit">
						<span className="text-lg">😎</span>
						<span className="text-sm font-semibold text-brand-navy tracking-wide">Book your course</span>
					</div>

					{/* Headline */}
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-midnight leading-[1.1] tracking-tight">
						A great place
						<br />
						for learning.
					</h1>

					{/* Subtext */}
					<p className="text-base text-brand-slate max-w-sm leading-relaxed">
						A best and cheapest way of getting know learning to make a better tomorrow
					</p>

					{/* CTA Button */}
					<div className="mt-2">
						<Link href="/register">
							<Button className="bg-brand-violet hover:bg-brand-navy text-white px-8 py-6 text-base font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-brand-violet/30 hover:shadow-brand-navy/30">
								Get started
							</Button>
						</Link>
					</div>
				</div>

				{/* RIGHT — Image + Floating cards */}
				<div className="relative flex justify-center items-end h-120 lg:h-130 z-10">
					{/* Student placeholder */}
					<div className="absolute bottom-0 right-0 left-0 mx-auto w-72 lg:w-80 h-full rounded-3xl bg-brand-purple/10 border-2 border-brand-purple/20 flex items-end justify-center overflow-hidden">
						<Image
							src="/images/home/hero-student.jpeg"
							alt="Student"
							fill
							className="object-cover object-top"
							priority
						/>
					</div>

					{/* Floating card — top left: 5000+ courses */}
					<div className="absolute top-8 -left-4 lg:-left-8 bg-white rounded-2xl shadow-xl shadow-brand-navy/10 px-4 py-3 flex items-center gap-3 min-w-42.5">
						<div className="w-10 h-10 rounded-full bg-brand-midnight flex items-center justify-center shrink-0">
							<svg
								className="w-5 h-5 text-white"
								fill="none"
								stroke="currentColor"
								strokeWidth={2.5}
								viewBox="0 0 24 24"
							>
								<rect x="3" y="3" width="18" height="18" rx="3" />
							</svg>
						</div>
						<div>
							<p className="text-lg font-extrabold text-brand-midnight leading-none">1000+</p>
							<p className="text-[10px] font-semibold text-brand-gray uppercase tracking-widest mt-0.5">
								Active Tutors
							</p>
						</div>
					</div>

					{/* Floating card — bottom right: 20K students */}
					<div className="absolute bottom-12 -right-4 lg:-right-8 bg-white rounded-2xl shadow-xl shadow-brand-navy/10 px-4 py-3 min-w-42.5">
						<p className="text-xl font-extrabold text-brand-midnight leading-none">20K</p>
						<p className="text-[10px] font-semibold text-brand-gray uppercase tracking-widest mt-0.5 mb-3">
							Active Student
						</p>
						{/* Avatar stack */}
						<div className="flex items-center gap-1">
							<div className="flex -space-x-2">
								{avatars.map((a, i) => (
									<div
										key={i}
										className={`w-7 h-7 rounded-full ${a.color} border-2 border-white flex items-center justify-center`}
									>
										<span className="text-[9px] font-bold text-white">{a.initials}</span>
									</div>
								))}
							</div>
							<span className="ml-2 text-xs font-bold text-brand-violet bg-brand-violet/10 px-2 py-0.5 rounded-full">
								20K+
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
