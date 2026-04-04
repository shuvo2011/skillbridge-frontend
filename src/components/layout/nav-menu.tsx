"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/tutors", label: "Browse Tutors" },
	{ href: "/about", label: "About" },
	{ href: "/contact-us", label: "Contact Us" },
];

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
	const pathname = usePathname();

	return (
		<NavigationMenu {...props}>
			<NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
				{links.map(({ href, label }) => {
					const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
					return (
						<NavigationMenuItem key={href}>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={isActive}>
								<Link href={href} className={isActive ? "text-brand-violet font-semibold" : ""}>
									{label}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
