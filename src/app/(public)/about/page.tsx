import { Users, BookOpen, Star, Shield, Target, Heart } from "lucide-react";
import Link from "next/link";

const stats = [
	{ label: "Active Students", value: "20K+" },
	{ label: "Expert Tutors", value: "1K+" },
	{ label: "Avg Rating", value: "4.9★" },
	{ label: "Subjects", value: "50+" },
];

const values = [
	{
		icon: Target,
		title: "Our Mission",
		desc: "To make quality education accessible to every student by connecting them with expert tutors anytime, anywhere.",
	},
	{
		icon: Heart,
		title: "Our Vision",
		desc: "A world where every learner has a personal guide to help them achieve their full potential.",
	},
	{
		icon: Shield,
		title: "Our Promise",
		desc: "Every tutor on SkillBridge is vetted and verified. We ensure safe, effective, and meaningful learning experiences.",
	},
];

const team = [
	{ name: "Md Arif Uddin", role: "Founder & CEO", initials: "AR" },
	{ name: "Firoz Ahmed", role: "Lead Developer", initials: "FZ" },
	{ name: "Nadia Islam", role: "Head of Tutors", initials: "NI" },
];

export default function AboutPage() {
	return (
		<main className="bg-white text-gray-800">
			<section className="py-20 px-6 text-center" style={{ background: "#f9f7ff" }}>
				<div className="max-w-3xl mx-auto">
					<span
						className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
						style={{ background: "#ede9fe", color: "#210095" }}
					>
						About SkillBridge
					</span>
					<h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight" style={{ color: "#210095" }}>
						Bridging the gap between <br /> students and great tutors
					</h1>
					<p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
						SkillBridge is a platform built to connect passionate learners with expert tutors. Whether you're struggling
						with a subject or looking to excel, we have the right tutor for you.
					</p>
					<Link
						href="/tutors"
						className="inline-block mt-8 px-6 py-3 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
						style={{ background: "#210095" }}
					>
						Browse Tutors
					</Link>
				</div>
			</section>

			<section className="py-14 px-6 border-b border-gray-100">
				<div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
					{stats.map((s) => (
						<div key={s.label}>
							<p className="text-3xl font-extrabold" style={{ color: "#210095" }}>
								{s.value}
							</p>
							<p className="text-sm text-gray-500 mt-1">{s.label}</p>
						</div>
					))}
				</div>
			</section>

			<section className="py-20 px-6">
				<div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-12 items-center">
					<div>
						<h2 className="text-3xl font-extrabold mb-4" style={{ color: "#210095" }}>
							Our Story
						</h2>
						<p className="text-gray-500 text-sm leading-relaxed mb-4">
							SkillBridge was born from a simple frustration — finding a reliable, affordable tutor shouldn't be this
							hard. Our founders experienced this firsthand and decided to build a solution.
						</p>
						<p className="text-gray-500 text-sm leading-relaxed">
							Since our launch, we've helped thousands of students across Bangladesh find the perfect tutor, schedule
							sessions with ease, and see real improvement in their academic performance.
						</p>
					</div>
					<div className="grid grid-cols-2 gap-4">
						{[
							{ icon: Users, label: "Community Driven" },
							{ icon: BookOpen, label: "Expert Tutors" },
							{ icon: Star, label: "Top Rated" },
							{ icon: Shield, label: "Verified & Safe" },
						].map(({ icon: Icon, label }) => (
							<div
								key={label}
								className="rounded-2xl p-5 flex flex-col items-center gap-2 text-center border border-gray-100 shadow-sm"
							>
								<div
									className="w-10 h-10 rounded-xl flex items-center justify-center"
									style={{ background: "#ede9fe" }}
								>
									<Icon size={18} style={{ color: "#210095" }} />
								</div>
								<p className="text-xs font-semibold text-gray-700">{label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 px-6" style={{ background: "#f9f7ff" }}>
				<div className="max-w-4xl mx-auto text-center mb-12">
					<h2 className="text-3xl font-extrabold" style={{ color: "#210095" }}>
						What drives us
					</h2>
					<p className="text-sm text-gray-500 mt-2">The values behind everything we build</p>
				</div>
				<div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
					{values.map(({ icon: Icon, title, desc }) => (
						<div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
							<div
								className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
								style={{ background: "#ede9fe" }}
							>
								<Icon size={18} style={{ color: "#210095" }} />
							</div>
							<h3 className="font-bold text-gray-800 mb-2">{title}</h3>
							<p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className="py-20 px-6">
				<div className="max-w-4xl mx-auto text-center mb-12">
					<h2 className="text-3xl font-extrabold" style={{ color: "#210095" }}>
						Meet the team
					</h2>
					<p className="text-sm text-gray-500 mt-2">The people building SkillBridge</p>
				</div>
				<div className="max-w-2xl mx-auto grid sm:grid-cols-3 gap-6">
					{team.map((member) => (
						<div key={member.name} className="text-center">
							<div
								className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
								style={{ background: "#210095" }}
							>
								{member.initials}
							</div>
							<p className="font-semibold text-gray-800 text-sm">{member.name}</p>
							<p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
