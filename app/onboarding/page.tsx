"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import {useForm} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "../lib/zodSchemas";
import { OnboardingAction } from "../actions";
import { SubmitButton } from "../components/SubmitButtons";

export default function OnboardingRoute() {
    const [lastResult, action] = useActionState(OnboardingAction, undefined);

    const[form, fields ] = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData, {
                schema:onBoardingSchema,
            })
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })
    return (
        <div className="h-screen w-screen flex items-center ">
            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
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
                            <Input 
                                name={fields.fullName.name} 
                                defaultValue={fields.fullName.initialValue} 
                                key={fields.fullName.key} 
                                placeholder= "John DOe"
                            />
                            <p className="text-red-500 text-sm"> {fields.fullName.errors}</p>
                        </div>
                        <div className="grid gap-y-2">
                            <Label>User Name</Label>
                            <div className="flex rounded-md">
                                <span className="
                                    inline-flex items-center px-3 rounded-l-md 
                                    border-r-0 border-muted 
                                    bg-muted text-sm text-muted-foreground"
                                >
                                CalendarIT.com
                                </span>
                                <Input 
                                    placeholder="example-User-1" 
                                    className="rounded-l-none" 
                                    name={fields.userName.name}
                                    defaultValue={fields.userName.initialValue}
                                    key={fields.userName.key}      
                                />
                            </div>
                            <p className="text-red-500 text-sm"> {fields.userName.errors}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                    <SubmitButton text="Submit" className="w-full">

                    </SubmitButton>
                    </CardFooter>
                </form>
            </Card>
            </form>
        </div>
    )
}