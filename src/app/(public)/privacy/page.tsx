const sections = [
	{
		title: "1. Information We Collect",
		content:
			"We collect information you provide when creating an account, such as your name, email address, and profile details. We also collect usage data to improve our services.",
	},
	{
		title: "2. How We Use Your Information",
		content:
			"We use your information to provide and improve our services, communicate with you, process payments, and ensure platform security.",
	},
	{
		title: "3. Sharing of Information",
		content:
			"We do not sell your personal data. We may share information with trusted third-party service providers who assist in operating our platform, subject to confidentiality obligations.",
	},
	{
		title: "4. Cookies",
		content:
			"We use cookies to enhance your experience. You can control cookie settings through your browser. Disabling cookies may affect some platform functionality.",
	},
	{
		title: "5. Data Security",
		content:
			"We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.",
	},
	{
		title: "6. Your Rights",
		content:
			"You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at hello@skillbridge.com.",
	},
	{
		title: "7. Children's Privacy",
		content:
			"SkillBridge is not intended for children under 13. We do not knowingly collect personal information from children under 13.",
	},
	{
		title: "8. Changes to This Policy",
		content:
			"We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page.",
	},
	{
		title: "9. Contact Us",
		content: "If you have any questions about this Privacy Policy, please contact us at hello@skillbridge.com.",
	},
];
export const metadata = {
	title: "Privacy Policy - SkillBridge",
	description: "Learn how SkillBridge collects, uses, and protects your personal information.",
};
export default function PrivacyPage() {
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
						Privacy Policy
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
