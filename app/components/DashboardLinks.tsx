"use client";

import { cn } from "@/lib/utils";
import { CalendarCheck, HomeIcon, LucideProps, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";


interface navigationProps{
    id: number;
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
}// object 

export const dashboardLinks: navigationProps[] = [
    {
        id: 0,
        name: 'Event types',
        href: '/dashboard',
        icon: HomeIcon
    },
    {
        id: 1,
        name: 'Meetings',
        href: '/dashboard/meetings',
        icon: Users
    },
    {
        id: 2,
        name: 'Availability',
        href: '/dashboard/availability',
        icon: CalendarCheck
    },
    {
        id: 3,
        name: 'Settings',
        href: '/dashboard/settings',
        icon: Settings
    },
] // array

export function DashboardLinks() {
    const pathname = usePathname(); 
    
    return (
        <>
        {dashboardLinks.map((link) => ( 
            <Link className={cn(
                pathname === link.href ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground hover:text-foreground ',
                "flex items-center gap-3 rounded-lg px-3 transition-all hover:text-primary "
            )} key={link.id} href={link.href}>
                <link.icon className="size-4" />
                {link.name}
            </Link>
        )) }
        </>
    )
}