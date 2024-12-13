import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/logo.png"
import { DashboardLinks } from "../components/DashboardLinks";
import { Menu, Sheet } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({children}: {children:ReactNode}) {
    
    return (
        // <div>
        //     <h1>Dashboard Layout</h1>
        //     {children}
        // </div>
        <>
            <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden md:block border-r bg-muted/40 ">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14  items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/"  className="flex item-center gap-2">
                            <Image src={Logo} alt="Logo" className="size-8" /> 
                            <p className="text-xl font-bold">Calendar<span className="text-primary">IT</span></p>
                            </Link>
                        </div>
                        <div className=" flex-1">
                            <nav className="items-start grid px-2 lg:px-4">
                                <DashboardLinks />
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-mute/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild> 
                                <Button className="md:hidden shrink-0" size="icon" variant="outline">
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                        </Sheet>
                    </header>
                </div>

            </div>
        
        </>
    ); 

}