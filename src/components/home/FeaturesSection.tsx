import { Monitor, MessageCircleMore, FileText } from "lucide-react";

const features = [
	{
		icon: Monitor,
		iconBg: "bg-yellow-400",
		title: "Live class with best teachers",
	},
	{
		icon: MessageCircleMore,
		iconBg: "bg-red-400",
		title: "Conversation about the class",
	},
	{
		icon: FileText,
		iconBg: "bg-brand-purple",
		title: "We care your home work activity",
	},
];

export default function FeaturesSection() {
	return (
		<section className="w-full bg-white py-10 lg:py-20 px-6">
			<div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-4">
				<h2 className="text-4xl font-extrabold text-brand-navy">What we provide</h2>
				<p className="text-brand-slate text-sm leading-relaxed max-w-sm">
					Here is our amazing teaching method that suits for you.
					<br />
					Read our features and know the best.
				</p>

				<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-12 w-full">
					{features.map((f, i) => (
						<div key={i} className="flex flex-col items-center gap-5">
							<div className={`w-20 h-20 rounded-2xl ${f.iconBg} flex items-center justify-center shadow-md`}>
								<f.icon className="w-9 h-9 text-white" strokeWidth={2} />
							</div>
							<p className="text-base font-bold text-brand-navy leading-snug max-w-[160px]">{f.title}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
