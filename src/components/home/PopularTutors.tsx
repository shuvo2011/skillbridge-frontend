import Link from "next/link";
import { Calendar, BookOpen, Star } from "lucide-react";
import Image from "next/image";
import { tutorService } from "@/services/tutor.service";

export default async function PopularTutors() {
	const { data } = await tutorService.getAllTutors();

	const tutors = (data || []).filter((t: any) => !t.user?.banned).slice(0, 3);

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
						href="/tutors"
						className="text-sm font-semibold text-brand-violet underline underline-offset-4 hover:text-brand-navy transition-colors whitespace-nowrap mt-1"
					>
						View All Tutors
					</Link>
				</div>

				{/* Tutor cards */}

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{tutors.map((tutor: any) => {
						const avgRating =
							tutor.reviews?.length > 0
								? (tutor.reviews.reduce((s: number, r: any) => s + r.rating, 0) / tutor.reviews.length).toFixed(1)
								: null;

						const subject = tutor.tutorCategories?.[0]?.category?.name ?? "General";

						return (
							<Link
								key={tutor.id}
								href={`/tutors/${tutor.id}`}
								className="rounded-2xl border border-brand-purple/10 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white relative block"
							>
								<div
									key={tutor.id}
									className="rounded-2xl border border-brand-purple/10 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white relative"
								>
									{/* Featured badge */}
									{tutor.isFeatured && (
										<div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-amber-400 text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full shadow">
											<Star className="w-2.5 h-2.5 fill-white" /> FEATURED
										</div>
									)}

									{/* Avatar area */}
									<div className="relative w-full h-52 overflow-hidden bg-gray-100">
										{tutor.user?.image ? (
											<Image src={tutor.user.image} alt={tutor.user.name} fill className="object-cover object-top" />
										) : (
											<div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
												{tutor.user?.name?.[0] ?? "T"}
											</div>
										)}
									</div>

									{/* Info */}
									<div className="p-5 flex flex-col gap-1">
										<p className="text-xl font-extrabold text-brand-midnight">{tutor.user?.name}</p>
										<p className="text-base font-bold text-brand-navy">{subject}</p>
										<p className="text-xs text-brand-slate mt-0.5 line-clamp-2">{tutor.bio}</p>

										{/* Meta */}
										<div className="flex items-center gap-4 mt-3 text-xs text-brand-gray">
											<span className="flex items-center gap-1">
												<Calendar className="w-3.5 h-3.5" />
												{tutor.experienceYears} {tutor.experienceYears === 1 ? "Year" : "Years"}
											</span>
											{avgRating && (
												<span className="flex items-center gap-1">
													<Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
													{avgRating}
												</span>
											)}
											<span className="flex items-center gap-1">
												<BookOpen className="w-3.5 h-3.5" />৳{tutor.price}
											</span>
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
