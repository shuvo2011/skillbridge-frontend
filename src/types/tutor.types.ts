export type Tutor = {
	id: string;
	user: { name: string; image?: string | null };
	bio?: string;
	qualification?: string;
	experienceYears?: number;
	address?: string;
	isFeatured: boolean;
	tutorCategories: { category: { name: string } }[];
	reviews: { rating: number }[];
};

export type Filters = {
	search: string;
	category: string;
	minExperience: string;
	sortBy: string;
};
