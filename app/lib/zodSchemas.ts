// to create server action ... post request

import { conformZodMessage } from '@conform-to/zod';
import {z} from 'zod';

export const onBoardingSchema = z.object({
    fullName: z.string().min(3).max(150),
    userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {
        message: 'Username can only contain letters, numbers, and hyphens'
    }),

}) 

export function onBoardingSchemaValidation(options?: {
    isUseNameUnique: () => Promise<boolean>
}){
    return z.object({
        userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {
            message: 'Username can only contain letters, numbers, and hyphens'
        })
        .pipe(
            z.string().superRefine((_, ctx) =>{
                if(typeof options.isUseNameUnique !== 'function'){
                    ctx.addIssue({
                        code: "custom",
                        message: conformZodMessage.VALIDATION_UNDEFINED,
                        fatal: true,
                    });
                    return;
                }

                return options.isUseNameUnique().then((isUnique) =>{
                    if(!isUnique){
                        ctx.addIssue({
                            code: "custom",
                            message: "Username is already taken",
                        })
                    }
                })
            })
        ),
        fullName: z.string().min(3).max(150),

    })
}
export const  settingsSchema = z.object({
    fullName: z.string().min(3).max(150),
    profileImage: z.string(),
})

export const eventTypeSchema = z.object({
    title: z.string().min(3).max(150),
    duration : z.number().min(15).max(60),
    url: z.string().min(3).max(150),
    description: z.string().min(3).max(150),
    videoCallSoftware: z.string().min(3),

});