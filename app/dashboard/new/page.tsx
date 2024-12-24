"use client"

import { CreateEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { eventTypeSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { parseWithZod } from "@conform-to/zod";
import { Link } from "lucide-react";
import {  useActionState, useState } from "react";

type VideoCallProvider= "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function NewEventRoute(){
    const [activePlatform, setActivePlatform] = useState<VideoCallProvider>("Google Meet")
 
    const [lastResult, action] = useActionState(CreateEventTypeAction, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: eventTypeSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldReValidate: "onInput",
    });


    return(
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Add New Appointment
                    </CardTitle>
                    <CardDescription>
                        Create New Appointments For Your Clients
                    </CardDescription>
                </CardHeader>
                    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                        <CardContent className="grid gap-y-6">
                            <div className="flex flex-col gap-y-2">
                                <Label>Title</Label>
                                <Input 
                                    name={fields.title.name} 
                                    key={fields.title.key} 
                                    defaultValue={fields.title.initialValue} 
                                    placeholder="30min meeting"
                                />
                                <p className="text-red-500 text-sm">{fields.title.errors}</p>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label>URL Slug</Label>
                                <div className="flex rounded-md" >
                                    <span 
                                        className=
                                            "inline-flex items-center rounded-l-md px-3 border border-r-0 border-muted bg-muted text-sm text-muted-foreground"
                                        >
                                        ScheduleIT.com/
                                    </span>
                                <Input 
                                    name={fields.url.name} 
                                    key={fields.url.key} 
                                    defaultValue={fields.url.initialValue}
                                    className="rounded-l-none" 
                                    placeholder="Example-url-1/"
                                />
                                <p className="text-red-500 text-sm">{fields.url.errors}</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Description</Label>
                                    <Textarea 
                                        name={fields.description.name} 
                                        key={fields.description.key} 
                                        defaultValue={fields.description.initialValue}
                                         placeholder="Meeting Description"
                                    />
                                    <p className="text-red-500 text-sm">{fields.description.errors}</p>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Duration </Label>
                                    <Select 
                                        name={fields.duration.name} 
                                        key={fields.duration.key} 
                                        defaultValue={fields.duration.initialValue}>
                                    <p className="text-red-500 text-sm">{fields.duration.errors}</p>

                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Duration"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Duration</SelectLabel>
                                                <SelectItem value="15">15 minutes</SelectItem>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="45">45 minutes</SelectItem>
                                                <SelectItem value="60">1 hour</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-y-2">
                                    <Label >Video Call Provider</Label>
                                    <input type="hidden" name={fields.videoCallSoftware.name} value={activePlatform} />
                                    
                                    <ButtonGroup >
                                        <Button 
                                            type = "button"
                                            variant={activePlatform === "Zoom Meeting" ? "secondary": "outline"} 
                                            onClick={() => setActivePlatform("Zoom Meeting")} 
                                            className="w-full"
                                        >
                                            Zoom
                                        </Button>
                                        <Button 
                                            type = "button"
                                            variant={activePlatform === "Google Meet" ? "secondary": "outline"} 
                                            onClick={() => setActivePlatform("Google Meet")} 
                                            className="w-full"
                                        >
                                            Google Meet
                                        </Button>
                                        <Button 
                                            type = "button"
                                            variant={activePlatform === "Microsoft Teams" ? "secondary": "outline"} 
                                            onClick={() => setActivePlatform("Microsoft Teams")} 
                                            className="w-full"
                                        >
                                            Microsoft Teams
                                        </Button>
                                    </ButtonGroup>
                                    <p className="text-red-500 text-sm">{fields.videoCallSoftware.error}</p>
                                </div>  
                        </CardContent>
                        <CardFooter className="w-full flex justify-between">
                            <Button  variant="secondary"asChild>
                                <Link href="/dashboard">Cancel </Link>    
                            </Button>    
                            <SubmitButton text="Create Appointment"/>
                        </CardFooter>
                    </form>
            </Card>
        </div>
    )
}