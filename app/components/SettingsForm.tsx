"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButtons";
import { useActionState, useState } from "react";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface iAppProps{
    fullName: string;
    email: string;
    profileImage: string;   
}

export function SettingsForm({ fullName, email }: iAppProps) {
   
    const [lastResult, action] = useActionState(SettingsAction, undefined);
    const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
    const [form, fields] = useForm({  
        lastResult,

        onValidate({formData}){
            return  parseWithZod(formData, {
                schema:settingsSchema,
            })
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    const handleDeleteImage = () => {
        setCurrentProfileImage("");
        
    }
    return(
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your settings</CardDescription>  
            </CardHeader>
            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                <CardContent className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <Label>Full Name</Label>
                        <Input 
                            name={fields.fullName.name} 
                            key={fields.fullName.key} 
                            defaultValue={fullName} 
                            type="text" 
                            placeholder="John Doe" 
                        />
                        <p className="text-red-500 text-sm ">{fields.fullName.errors}</p>
                   </div>
                   <div className="flex flex-col gap-y-2">
                        <Label>Email</Label>
                        <Input disabled defaultValue={email} type="email" placeholder="John@gmail.com" />
                    </div>
                    <div className="grid gap-y-5">
                        <Label> Profile Image</Label>
                        <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage} />
                        {currentProfileImage ? (
                            <div className="relative size-16">
                                <Image 
                                src={currentProfileImage} 
                                alt="Profile Image" 
                                className="size-16 rounded-lg" 
                            />
                            <Button 
                                variant="destructive"
                                size="icon" 
                                type="button"
                                className="aboustolute -top-3 -right-3"
                                onClick={handleDeleteImage} 
                            >
                                <X className="size-4s" />
                            </Button>
                            </div>
                        ):(
                           <UploadDropzone onClientUploadComplete={(res) => {
                                setCurrentProfileImage(res[0].url);
                                toast.success("Image uploaded successfully");   
                                }} 
                                onUploadError={(err) => {
                                    console.log("something went wrong ", err);
                                    toast.error(err.message);

                                }}

                                endpoint="imageUploader" 
                           />
                        )
                    }
                    <p className="text-sm text-red-500"> {fields.profileImage.errors}</p>
                    </div>
                </CardContent>n
                <CardFooter>
                    <SubmitButton text="Save Changes"/>
                </CardFooter>
            </form>
        </Card>
    )
}