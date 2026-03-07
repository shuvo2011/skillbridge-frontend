import { Button } from "@/components/ui/button";
import { Star, GraduationCap, Users } from "lucide-react";
import Image from "next/image";

const cards = [
	{
		icon: GraduationCap,
		iconBg: "bg-brand-violet",
		stat: "20K+ Happy Students",
		desc: "Lorem ipsum dolor sit amet, consectetur ncinim quis nostrud.",
		cardBg: "bg-teal-50",
		shadowBg: "bg-brand-purple/30",
		avatarBg: "bg-brand-peach",
		align: "right", // avatar on right
	},
	{
		icon: Star,
		iconBg: "bg-yellow-400",
		stat: "4.9★ Average Rating",
		desc: "Lorem ipsum dolor sit amet, consectetur ncinim quis nostrud.",
		cardBg: "bg-teal-50",
		shadowBg: "bg-brand-purple/30",
		avatarBg: "bg-brand-peach",
		align: "left", // avatar on left
	},
];

const avatarPlaceholder = (bg: string, size = "w-14 h-14") => (
	<div
		className={`${size} rounded-full ${bg} border-2 border-white flex items-center justify-center flex-shrink-0 overflow-hidden`}
	>
		<svg className="w-8 h-8 text-brand-slate/40" fill="currentColor" viewBox="0 0 24 24">
			<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
		</svg>
	</div>
);

export default function TrustedByStudents() {
	return (
		<section className="w-full bg-white lg:py-20 py-10 px-6">
			<div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				{/* LEFT — Stacked cards */}
				<div className="relative flex flex-col gap-6 py-8 px-4">
					{/* Card 1 — top right offset */}
					<div className="relative self-end w-[85%]">
						{/* Shadow layer */}
						<div className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl bg-brand-purple/25" />
						<div className="relative bg-teal-50 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
							<div className="flex flex-col flex-1">
								<p className="font-extrabold text-brand-midnight text-sm">1K+ Experienced Tutors</p>
								<p className="text-xs text-brand-slate mt-1 leading-relaxed">
									Our team of tutors is successfully <br /> teaching hundreds of students.
								</p>
							</div>
							<div className="w-14 h-14 rounded-full bg-brand-peach border-2 border-white shrink-0 overflow-hidden relative">
								<Image
									src="/images/home/experience-tutor-1.png"
									alt="Tutor"
									fill
									className="object-cover object-center"
								/>
							</div>
						</div>
					</div>

					{/* Card 2 — bottom left offset */}
					<div className="relative self-start w-[85%]">
						{/* Shadow layer */}
						<div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl bg-brand-purple/25" />
						<div className="relative bg-teal-50 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
							<div className="w-14 h-14 rounded-full bg-brand-peach border-2 border-white shrink-0 overflow-hidden relative">
								<Image
									src="/images/home/experience-tutor-2.jpg"
									alt="Tutor"
									fill
									className="object-cover object-center"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<p className="font-extrabold text-brand-midnight text-sm">20K+ Active Students</p>
								<p className="text-xs text-brand-slate mt-1 leading-relaxed">
									Trusted students are actively <br /> participating on our learning platform.
								</p>
							</div>
						</div>
					</div>

					{/* Stat badge */}
					<div className="absolute top-2 left-0 bg-white border border-brand-purple/20 rounded-xl px-3 py-2 shadow-md flex items-center gap-2">
						<Users className="w-4 h-4 text-brand-violet" />
						<span className="text-xs font-bold text-brand-navy">Trusted by students</span>
					</div>
				</div>

				{/* RIGHT — Text */}
				<div className="flex flex-col gap-5">
					<h2 className="text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight">
						Trusted by
						<br />
						students
					</h2>
					<p className="text-brand-slate text-sm leading-relaxed max-w-sm">
						We are trusted by students all over the world. Here you can learn everything from the best tutors and build
						your career on this platform.
					</p>

					{/* Stats row */}
					<div className="flex gap-6 mt-2">
						<div>
							<p className="text-2xl font-extrabold text-brand-violet">20K+</p>
							<p className="text-xs text-brand-slate">Active Students</p>
						</div>
						<div className="w-px bg-brand-purple/20" />
						<div>
							<p className="text-2xl font-extrabold text-brand-violet">1K+</p>
							<p className="text-xs text-brand-slate">Expert Tutors</p>
						</div>
						<div className="w-px bg-brand-purple/20" />
						<div>
							<p className="text-2xl font-extrabold text-brand-violet">4.9★</p>
							<p className="text-xs text-brand-slate">Avg Rating</p>
						</div>
					</div>

					<Button className="mt-2 w-fit bg-brand-violet hover:bg-brand-navy text-white px-8 py-5 rounded-xl font-semibold shadow-lg shadow-brand-violet/25 transition-all duration-200">
						Learn more
					</Button>
				</div>
			</div>
		</section>
	);
}
