"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
	const [email, setEmail] = useState("");

	return (
		<section className="w-full bg-brand-peach py-20 px-6">
			<div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-4">
				<h2 className="text-3xl font-extrabold text-brand-navy">Subscribe Newsletter</h2>
				<p className="text-sm text-brand-slate">Subscribe our newsletter for getting the updates</p>

				{/* Input + Button */}
				<div className="mt-4 flex w-full max-w-lg bg-white rounded-2xl shadow-sm overflow-hidden">
					<Input
						type="email"
						placeholder="Enter your email."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="flex-1 h-12 border-none shadow-none focus-visible:ring-0 text-brand-navy placeholder:text-brand-gray bg-transparent px-4"
					/>
					<Button className="bg-brand-violet h-12 hover:bg-brand-navy text-white px-8 py-5 rounded-xl font-semibold transition-all duration-200 shrink-0">
						Get started
					</Button>
				</div>
			</div>
		</section>
	);
}
