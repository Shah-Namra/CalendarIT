"use server";

import prisma from "./lib/db";
import { requrieUser } from "./lib/hooks";

export async function OnboardingAction(formData: FormData){
const session = await requrieUser();

    const data = await prisma.user.update({
        where:{
            id: session.user?.id
        },
        data:{
            userName: 'asdfg',
            name: 'zxcv',
        }
    });
// type safe how??
}