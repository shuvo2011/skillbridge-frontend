// components/module/tutorPage/tutor-types.ts

import { Tutor } from "@/types/tutor.types";

export const BRAND = "#210095";
export const PER_PAGE = 6;

export const CATEGORIES = [
	"All",
	"Math",
	"Physics",
	"Chemistry",
	"English",
	"Programming",
	"Biology",
	"Statistics",
	"Economics",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const avgRating = (reviews: { rating: number }[]) =>
	reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

export const initials = (name: string) =>
	name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

// ─── Mock data ────────────────────────────────────────────────────────────────
const NAMES = [
	"Arif Hassan",
	"Nusrat Jahan",
	"Tanvir Ahmed",
	"Sumaiya Khatun",
	"Rakibul Islam",
	"Fariha Akter",
	"Imran Hossain",
	"Tania Begum",
];
const QUALS = ["BSc in CSE", "MSc Mathematics", "MBA Finance", "BSc Physics", "MSc Chemistry", "BBA Marketing"];
const ADDRESSES = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Cumilla"];
const CATS = [
	["Math", "Calculus"],
	["Physics", "Mechanics"],
	["Chemistry", "Organic"],
	["English", "Literature"],
	["Programming", "Web Dev"],
	["Biology", "Genetics"],
	["Statistics", "Data"],
	["Economics", "Finance"],
];
const BIOS = [
	"Passionate educator focused on practical learning. I break complex topics into digestible lessons tailored to each student's needs.",
	"Experienced tutor with a research background. I help students build strong foundations and develop critical thinking skills.",
	"Dedicated to making learning enjoyable. My interactive approach helps students gain confidence and achieve their academic goals.",
];

export const MOCK_TUTORS: Tutor[] = Array.from({ length: 24 }, (_, i) => ({
	id: `tutor-${i}`,
	user: {
		name: NAMES[i % NAMES.length],
		image: i % 3 === 0 ? null : `https://i.pravatar.cc/150?img=${i + 10}`,
	},
	bio: BIOS[i % BIOS.length],
	qualification: QUALS[i % QUALS.length],
	experienceYears: [2, 4, 6, 8, 10, 12, 3, 5][i % 8],
	address: ADDRESSES[i % ADDRESSES.length],
	isFeatured: i % 5 === 0,
	tutorCategories: CATS[i % CATS.length].map((name) => ({ category: { name } })),
	reviews: Array.from({ length: Math.floor(Math.random() * 40) + 3 }, () => ({
		rating: Math.floor(Math.random() * 2) + 4,
	})),
}));
