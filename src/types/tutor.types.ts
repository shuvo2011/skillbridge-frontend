export type Tutor = {
	id: string;
	userId: string;
	user: { name: string; email: string; image?: string | null; banned?: boolean };
	bio?: string;
	qualification?: string;
	experienceYears?: number;
	phone?: string;
	address?: string;
	price?: number;
	isFeatured: boolean;
	tutorCategories: { id: string; category: { id: string; name: string } }[];
	reviews: { rating: number }[];
	image?: string;
};

export type Filters = {
	search: string;
	category: string;
	minExperience: string;
	sortBy: string;
	maxPrice: string;
};

export type Availability = {
	id: string;
	dayOfWeek: string;
	availableFrom: string;
	availableTo: string;
};

export type Review = {
	id: string;
	rating: number;
	comment?: string;
	student: {
		user: { name: string; image?: string | null };
	};
	reviewText?: string;
	booking?: {
		sessionDate: string;
		category?: { name: string };
	};
};

export type TutorDetail = {
	id: string;
	userId: string;
	bio?: string;
	qualification?: string;
	experienceYears?: number;
	phone?: string;
	address?: string;
	isFeatured: boolean;
	price?: number;
	user: { name: string; email: string; image?: string | null };
	tutorCategories: { id: string; category: { id: string; name: string } }[];
	availability: Availability[];
	reviews: Review[];
};
