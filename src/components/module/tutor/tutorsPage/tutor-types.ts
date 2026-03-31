// components/module/tutorPage/tutor-types.ts

export const BRAND = "#210095";
export const PER_PAGE = 6;

export const avgRating = (reviews: { rating: number }[]) =>
	reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

export const initials = (name: string) =>
	name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
