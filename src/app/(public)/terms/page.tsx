const sections = [
	{
		title: "1. Acceptance of Terms",
		content:
			"By accessing or using SkillBridge, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.",
	},
	{
		title: "2. Use of the Platform",
		content:
			"SkillBridge is a tutoring marketplace that connects students with tutors. You agree to use the platform only for lawful purposes and in a manner that does not infringe the rights of others.",
	},
	{
		title: "3. User Accounts",
		content:
			"You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.",
	},
	{
		title: "4. Tutor Responsibilities",
		content:
			"Tutors are independent contractors, not employees of SkillBridge. Tutors are responsible for the accuracy of their profile information and the quality of their sessions.",
	},
	{
		title: "5. Payments & Refunds",
		content:
			"All payments are processed securely through our platform. Refund requests are handled on a case-by-case basis in accordance with our refund policy.",
	},
	{
		title: "6. Prohibited Conduct",
		content:
			"You may not use SkillBridge to engage in harassment, fraud, spam, or any activity that violates applicable laws. Violation may result in account suspension.",
	},
	{
		title: "7. Changes to Terms",
		content:
			"We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.",
	},
	{
		title: "8. Contact",
		content: "If you have questions about these terms, please contact us at hello@skillbridge.com.",
	},
];

export default function TermsPage() {
	return (
		<main className="bg-white">
			<section className="py-20 px-6 text-center" style={{ background: "#f9f7ff" }}>
				<div className="max-w-2xl mx-auto">
					<span
						className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
						style={{ background: "#ede9fe", color: "#210095" }}
					>
						Legal
					</span>
					<h1 className="text-4xl font-extrabold mb-4" style={{ color: "#210095" }}>
						Terms & Conditions
					</h1>
					<p className="text-sm text-gray-500">Last updated: April 2026</p>
				</div>
			</section>

			<section className="py-20 px-6">
				<div className="max-w-3xl mx-auto flex flex-col gap-8">
					{sections.map((s) => (
						<div key={s.title}>
							<h2 className="text-base font-bold text-gray-800 mb-2">{s.title}</h2>
							<p className="text-sm text-gray-500 leading-relaxed">{s.content}</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
