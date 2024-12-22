// imp to name page.tsx

import { notFound } from "next/navigation";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";

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
            buttonText="Add Event Type"/>
        ): (
          <p>We have event types</p>
        )}
      </>

    );
} 