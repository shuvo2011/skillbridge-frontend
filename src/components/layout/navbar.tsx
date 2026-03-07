import { Button } from "@/components/ui/button";
import { Logo } from "../common/logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
	return (
		<nav className="h-16 bg-brand-peach">
			<div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
				<Logo />

				{/* Desktop Menu */}
				<NavMenu className="hidden md:block" />

				<div className="flex items-center gap-3">
					<Button className="hidden sm:inline-flex" variant="outline">
						Login
					</Button>
					<Button className="bg-brand-violet hover:bg-brand-navy">Register</Button>

					{/* Mobile Menu */}
					<div className="md:hidden">
						<NavigationSheet />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
