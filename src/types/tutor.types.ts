export type Tutor = {
	id: string;
	userId: string;
	user: { name: string; email: string; image?: string | null };
	bio?: string;
	qualification?: string;
	experienceYears?: number;
	phone?: string;
	address?: string;
	isFeatured: boolean;
	tutorCategories: { id: string; category: { id: string; name: string } }[];
	reviews: { rating: number }[];
};

export type Filters = {
	search: string;
	category: string;
	minExperience: string;
	sortBy: string;
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
	user: { name: string; email: string; image?: string | null };
	tutorCategories: { id: string; category: { id: string; name: string } }[];
	availability: Availability[];
	reviews: Review[];
};
