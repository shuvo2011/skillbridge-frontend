import { Logo } from "../common/logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import NavbarSearch from "../common/Navbarsearch";
import { getSession } from "@/lib/get-session";
import { Button } from "@/components/ui/button";
import { NavbarUserMenu } from "./navbar-user-menu";

const Navbar = async () => {
	const session = await getSession();
	const user = session?.user;

	const dashboardHref = user?.role === "ADMIN" ? "/admin" : user?.role === "TUTOR" ? "/tutor/dashboard" : "/dashboard";

	return (
		<nav className="h-16 bg-brand-peach border-black/5">
			<div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
				<Logo />
				<NavMenu className="hidden md:block" />
				<div className="flex items-center gap-3">
					{user ? (
						<NavbarUserMenu user={user} dashboardHref={dashboardHref} />
					) : (
						<>
							<Link href="/login">
								<Button className="hidden sm:inline-flex" variant="outline">
									Login
								</Button>
							</Link>
							<Link href="/register">
								<Button className="bg-brand-violet hover:bg-brand-navy">Register</Button>
							</Link>
						</>
					)}
					<NavbarSearch className="hidden md:block" />
					<div className="md:hidden">
						<NavigationSheet />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
