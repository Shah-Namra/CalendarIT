import { Button } from "@/components/ui/button";
import { BanIcon, Link, PlusCircle } from "lucide-react";

interface iAppProps{
    title:string;
    description:string;
    buttonText:string;
    href:string;
}


export function EmptyState({buttonText,  description, href, title}: iAppProps){
    return (
        <div 
            className="flex flex-col flex-1 rounded-md border-dashed p-8 text-center animate-in fade-in-50 items-center justify-center h-full"
        >
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10" >
                <BanIcon className="size-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold ">{title}</h2>
            <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-sm auto">{description}</p>
            <Button asChild>
                <Link href={href}>
                    <PlusCircle className="mr-2 size-4"/>
                    {buttonText}
                </Link>
            </Button>
            
        </div>
    )
}