import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VideoGif from "@/public/work-is-almost-over-happy.gif"
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function onboardingrouteTwo() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        You are almost done!
                    </CardTitle>
                    <CardDescription>
                        We need to connect your calendar to account.
                    </CardDescription>
                    <Image src={VideoGif} alt="Almost finished " className="w-full rounded-xl"> </Image>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full" >
                        <Link href= "/">
                        <CalendarCheck2 className="size-4 mr-2"/>
                        Connect calendar to you Acc
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}