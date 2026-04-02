import Link from "next/link";

// app/(public)/error/page.tsx
export default function Error404Page() {
	return (
		<main className="min-h-[70vh] flex items-center justify-center px-6">
			<div className="text-center max-w-md">
				<p className="text-8xl font-extrabold" style={{ color: "#210095" }}>
					404
				</p>
				<h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Page not found</h1>
				<p className="text-sm text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>

				<Link
					href="/"
					className="inline-block px-6 py-3 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
					style={{ background: "#210095" }}
				>
					Back to Home
				</Link>
			</div>
		</main>
	);
}
