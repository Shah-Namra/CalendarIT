"use server";
// server side validation

import prisma from "./lib/db";
import { requrieUser } from "./lib/hooks";
import {parseWithZod} from '@conform-to/zod'
import {  onBoardingSchemaValidation } from "./lib/zodSchemas";
import { redirect } from "next/navigation";

export async function OnboardingAction(_prevState: unknown, formData: FormData){
    const session = await requrieUser();
    
    const submission = parseWithZod(formData, {
        schema: onBoardingSchemaValidation({
            async isUserNameUnique(){
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