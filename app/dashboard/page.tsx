// imp to name page.tsx

import { notFound } from "next/navigation";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";
import { ExternalLink, Link, Link2, Pen, Settings, Trash, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where:{
      id: userId,
    },
    select:{
      userName: true,
      eventType:{
        select:{
          id: true,
          active :true,
          title: true,
          url: true,
          duration: true,
        },
      }
    },
  });
  if(!data)
    return notFound();
  return data;
}
export default async function Dashboard() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return (
      <>
        {data.eventType.length === 0?(
          <EmptyState 
            title="You have no Event Types" 
            description="You can create your first event by clicking on button below" 
            href="/dashboard/new" 
            buttonText="Add Event Type"
          />
        ): (
          <>
            <div className="flex items-center justify-between px-2">
                <div className="hidden sm:grid gap-y-2">
                  <h1 className="text-3xl md:text-4xl font-semibold">Event Types</h1>
                  <p className="text-muted-foreground text-lg">Create and Manage your event tpyes right here.</p>
                </div>
                <Button asChild>
                  <Link href="/dashboard/new">Create New Event</Link>
                </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.eventType.mao((item: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) =>{
                <div className="overflow-hidden shadow rounded-lg relative" key={item.id}>
                  
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Settings className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel> Event </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                          <DropdownMenuItem asChild> 
                            <Link href={`/${data.userName}/${item.url}`} className="flex items-center">
                              <ExternalLink className="mr-2 size-4"/>
                              Preview
                            </Link>  
                           </DropdownMenuItem>
                           <DropdownMenuItem>
                            <Link2 className="mr-2 size-4"/>
                            Copy
                           </DropdownMenuItem>
                           <DropdownMenuItem>
                              <Pen className="size-4 mr-2"/>
                           </DropdownMenuItem>

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Trash className="size-4 mr-2"/>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <Link href="/" className="flex items-center p-6">
                    <div className="flex-shrink-0">
                      <User2 className="size-6"/>
                    </div>
                    <div className="ml-5 w-0 fkex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground truncate">
                          {item.duration} Minutes Meeting
                        </dt>
                        <dd className="text-lg font-medium">{item.title}</dd>
                      </dl>
                    </div>
                    <div className="bg-muted px-6 py-4 justify-between items-center flex">
                      <Switch />
                      <Button>
                        Edit Event
                      </Button>
                    </div>
                  
                  </Link>
                  {/* <h1>{item.title}</h1> */}
                </div>
              })}
            </div>
          </>
        )}
      </>

    );
} 