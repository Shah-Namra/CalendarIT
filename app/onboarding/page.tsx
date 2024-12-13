import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingRoute() {
    return (
        <div className="h-screen w-screen flex items-center ">
            <Card>
                <CardHeader>
                    <CardTitle>
                         Welcome to Calendar<span className="text-primary">IT</span>
                    </CardTitle>
                    <CardDescription>We need following Info to set up you profile!</CardDescription>
                </CardHeader>
                
                <form >
                    <CardContent className="grid gap-y-5">
                        <div className="grid gap-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder= "John DOe"/>
                        </div>
                        <div className="grid gap-y-2">
                            <Label>User Name</Label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                                    CalendarIT.com
                                </span>
                                <Input placeholder="example-User-1" className="rounded-l-none" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" >
                            Submit
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}