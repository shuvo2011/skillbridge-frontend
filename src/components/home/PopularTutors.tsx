import Link from "next/link";
import { Calendar, BookOpen } from "lucide-react";
import Image from "next/image";

const tutors = [
	{
		name: "Ahmed Rahman",
		subject: "Physics",
		desc: "Basic to advanced concepts in physics for a solid foundation.",
		profilePicture: "ahmed-rahman.jpg",
		experience: "5 Years",
		students: "1.2K Students",
	},
	{
		name: "Sarah Khan",
		subject: "Mathematics",
		desc: "From fundamental math to professional-level problem-solving.",
		profilePicture: "sara-khan.jpg",
		experience: "4 Years",
		students: "980 Students",
	},
	{
		name: "Rafiq Islam",
		subject: "English",
		desc: "Master the English language from basics to fluency.",
		profilePicture: "rafiq-islam.jpg",
		experience: "6 Years",
		students: "2.1K Students",
	},
];

export default function PopularTutors() {
	return (
		<section className="w-full bg-white py-10 lg:py-20 px-6">
			<div className="mx-auto max-w-6xl">
				{/* Header row */}
				<div className="flex items-start justify-between gap-4 mb-12">
					<div>
						<h2 className="text-4xl font-extrabold text-brand-navy">Our popular tutors</h2>
						<p className="text-brand-slate text-sm mt-2 max-w-sm leading-relaxed">
							Here is your favourite tutor that suits for you. Pick the
							<br />
							best tutor and get the better outcome.
						</p>
					</div>
					<Link
						href="#"
						className="text-sm font-semibold text-brand-violet underline underline-offset-4 hover:text-brand-navy transition-colors whitespace-nowrap mt-1"
					>
						View All Tutors
					</Link>
				</div>

				{/* Tutor cards */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{tutors.map((tutor, i) => (
						<div
							key={i}
							className="rounded-2xl border border-brand-purple/10 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white"
						>
							{/* Avatar area */}
							<div className="relative w-full h-52 overflow-hidden">
								<Image
									src={`/images/home/${tutor.profilePicture}`}
									alt={tutor.name}
									fill
									className="object-cover object-center"
								/>
							</div>

							{/* Info */}
							<div className="p-5 flex flex-col gap-1">
								<p className="text-xl font-extrabold text-brand-midnight">{tutor.name}</p>
								<p className="text-base font-bold text-brand-navy">{tutor.subject}</p>
								<p className="text-xs text-brand-slate mt-0.5">{tutor.desc}</p>

								{/* Meta */}
								<div className="flex items-center gap-4 mt-3 text-xs text-brand-gray">
									<span className="flex items-center gap-1">
										<Calendar className="w-3.5 h-3.5" />
										{tutor.experience}
									</span>
									<span className="flex items-center gap-1">
										<BookOpen className="w-3.5 h-3.5" />
										{tutor.students}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
