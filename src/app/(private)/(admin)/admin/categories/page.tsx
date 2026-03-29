import CategoryTable from "@/components/module/category/categoryTable";
import { CreateCategory } from "@/components/module/category/createCategory";
import PaginationControls from "@/components/ui/pagination-controls";
import { categoryService } from "@/services/category.service";

export default async function CategoryPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
	const { page } = await searchParams;

	const response = await categoryService.getCategories({
		page,
	});

	const categories = response.data?.data || [];

	const pagination = response.data?.meta || {
		limit: 10,
		page: 1,
		total: 0,
		totalPages: 1,
	};
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Category</h1>
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-12 md:col-span-4">
					<CreateCategory />
				</div>

				<div className="col-span-12 md:col-span-8">
					<CategoryTable categories={categories} page={pagination.page} limit={pagination.limit} />
					<PaginationControls meta={pagination} />
				</div>
			</div>
		</div>
	);
}
