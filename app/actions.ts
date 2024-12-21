"use server";
// server side validation

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import {parseWithZod} from '@conform-to/zod'
import {  onBoardingSchemaValidation, settingsSchema } from "./lib/zodSchemas";
import { redirect } from "next/navigation";

export async function OnboardingAction(_prevState: unknown, formData: FormData){
    const session = await requireUser   ();
    
    const submission = parseWithZod(formData, {
        schema: onBoardingSchemaValidation({
            async isUseNameUnique(){
                const existingUsername = await prisma.user.findUnique({
                    where:{
                        userName: formData.get('userName') as string,
                    }
                })
                return !existingUsername; // logical NOT 
            }  

        }),
        async: true
    });


    if( (await submission).status !== 'success'){
        return (await submission).reply;
    }
    
    const data = await prisma.user.update({
        where:{
            id: session.user?.id
        },
        data:{
            userName: submission.value.userName,
            name: submission.value.fullName,
        }
    });
    return redirect('/onboarding/grant-id');
// type safe how??
}

export async function SettingsAction( _prevState: any,formData: FormData){
    const session = await requireUser();
    const submission = parseWithZod( formData, {
        schema: settingsSchema,
    })
    if(submission.status !== 'success'){
        return submission.reply();
    }
    const user = await  prisma.user.update({
        where:{
            id:session.user?.id,
        },
        data:{
            name: submission.value.fullName,
            image: submission.value.profileImage,
        }
    })
    return redirect("/dashboard");
}