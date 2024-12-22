"use server";
// server side validation

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import {parseWithZod} from '@conform-to/zod'
import {  onBoardingSchemaValidation, settingsSchema } from "./lib/zodSchemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
            availaibility: {
                createMany:{
                    data: [
                        {
                            day: 'Monday',
                            fromTime:'08:00',
                            toTime: '18:00',

                        }, {
                            day: 'Tuesday',
                            fromTime:'08:00',
                            toTime: '18:00',

                        }, {
                            day: 'Wednesday',
                            fromTime:'08:00',
                            toTime: '18:00',

                        }, {
                            day: 'Thursday',
                            fromTime:'08:00',
                            toTime: '18:00',

                        }, {
                            day: 'Friday',
                            fromTime:'08:00',
                            toTime: '18:00',

                        }, {
                            day: 'Saturday',
                            fromTime:'08:00',
                            toTime: '18:00',

                        }, {
                            day: 'Sunday',
                            fromTime:'08:00',
                            toTime: '18:00', 
                        },
                    ]
                }
            }
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

export async function updateAvailabilityAction(formData: FormData){
    const session = await requireUser();
    // imp
    const rawData = Object.fromEntries(formData.entries());// takes form data and converts it to object

    const availaibilityData = Object.keys(rawData).filter((key)=>
        key.startsWith('id-')).map((key)=>{
            const id = key.replace("id-","");
            
            return{
                id,
                isActive: rawData[`isActive-${id}` ]=== "on",
                fromTime: rawData[`fromTime-${id}`] as string,
                tillTime: rawData[`tillTime-${id}`] as string,
            };
        }
    );
    try{ // it will only cost us 1 transaction instead of 7
        await prisma.$transaction(
            availaibilityData.map((data)=> prisma.availaibility.update({
                where:{
                    id: data.id,
                },
                data:{
                    isActive: data.isActive,
                    fromTime: data.fromTime,
                    toTime : data.tillTime,
                }
            }))
        );
        revalidatePath("/dashboard/availability");
    }catch(e){
        console.log(e);
    }
}