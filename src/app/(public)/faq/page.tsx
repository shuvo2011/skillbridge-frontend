export const metadata = {
	title: "FAQ - SkillBridge",
	description: "Frequently asked questions about SkillBridge, booking tutors, payments, and more.",
};

const faqs = [
	{
		question: "What is SkillBridge?",
		answer:
			"SkillBridge is an online platform that connects students with qualified tutors across a wide range of subjects. Whether you need help with Mathematics, Physics, English, or programming, we have verified tutors ready to help you.",
	},
	{
		question: "How do I book a tutor?",
		answer:
			"Simply browse our tutors, find one that matches your needs, and click 'Book Now' on their profile. Select an available time slot, choose your subject, pick a date, and confirm your booking. You need to be logged in as a student to book.",
	},
	{
		question: "How are tutors verified?",
		answer:
			"All tutors on SkillBridge go through a verification process where we review their qualifications, experience, and background before they can start teaching on our platform.",
	},
	{
		question: "What subjects are available?",
		answer:
			"We offer a wide range of subjects including Mathematics, Physics, Chemistry, Biology, English, Bangla, React, Node.js, Python, PHP, SQL, and many more. Browse our tutors to see all available subjects.",
	},
	{
		question: "How much does a session cost?",
		answer:
			"Each tutor sets their own price per session. You can see the price on each tutor's profile card. We have tutors available for different budgets.",
	},
	{
		question: "Can I cancel a booking?",
		answer:
			"Yes, you can cancel a booking from your dashboard. Please cancel at least 24 hours in advance out of respect for the tutor's time.",
	},
	{
		question: "How do I become a tutor?",
		answer:
			"Register on SkillBridge and select 'Tutor' as your role. Complete your profile with your qualifications, experience, and set your availability. Once verified, you can start receiving bookings.",
	},
	{
		question: "Is my payment information secure?",
		answer:
			"Yes, we take security seriously. All transactions are encrypted and we do not store your payment details on our servers.",
	},
];

export default function FaqPage() {
	return (
		<div className="min-h-screen bg-[#f7f6fb]">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
				<div className="mb-10 text-center">
					<span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border mb-4 text-brand-violet bg-brand-violet/10 border-brand-violet/20">
						FAQ
					</span>
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
					<p className="text-sm text-gray-500 mt-2">Everything you need to know about SkillBridge.</p>
				</div>

				<div className="flex flex-col gap-4">
					{faqs.map((faq, i) => (
						<div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
							<h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
							<p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
