"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
	meta: {
		limit: number;
		page: number;
		total: number;
		totalPages: number;
	};
}

export default function PaginationControls({ meta }: PaginationControlsProps) {
	const { limit: pageSize, page: currentPage, total, totalPages } = meta;

	const searchParams = useSearchParams();
	const router = useRouter();

	const navigateToPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`?${params.toString()}`);
	};

	const start = (currentPage - 1) * pageSize + 1;
	const end = Math.min(currentPage * pageSize, total);

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-4 border-t mt-4">
			<div className="text-sm text-muted-foreground">
				Showing {start}–{end} of {total} results
			</div>

			<div className="flex items-center gap-1">
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8"
					onClick={() => navigateToPage(1)}
					disabled={currentPage === 1}
				>
					<ChevronsLeft className="h-3.5 w-3.5" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8"
					onClick={() => navigateToPage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="h-3.5 w-3.5" />
				</Button>

				<span className="text-sm font-medium px-2 whitespace-nowrap">
					{currentPage} / {totalPages}
				</span>

				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8"
					onClick={() => navigateToPage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="h-3.5 w-3.5" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8"
					onClick={() => navigateToPage(totalPages)}
					disabled={currentPage === totalPages}
				>
					<ChevronsRight className="h-3.5 w-3.5" />
				</Button>
			</div>
		</div>
	);
}
