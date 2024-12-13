"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import GoogleLogo from "@/public/google.svg";
import Image from "next/image";
import GithubLogo from "@/public/github.svg"
import {  Loader2 } from "lucide-react";



export function GoogleAuthButton (){
    const{pending }= useFormStatus();
    return (
        <>
        {pending ? (
                <Button disabled variant="outline" className="w-full">
                    <Loader2 className="size-4 mr-2 animate-spin"/> Please Wait
                </Button>
            ) : (
                <Button variant="outline" className="w-full">
                    <Image src={GoogleLogo} alt="Google" className="w-6 h-6 mr-2"/>
                    Sign In With Google
                </Button>
            )}
        </>
    )

}

export function GitHubAuthButton (){
    const{pending }= useFormStatus();
    return (
        <>
        {pending ? (
                <Button disabled variant="outline" className="w-full">
                    <Loader2 className="size-4 mr-2 animate-spin"/> Please Wait
                </Button>
            ) : (
                <Button variant="outline" className="w-full">
                    <Image src={GithubLogo} alt="Github" className="w-6 h-6 mr-2"/>
                    Sign In With Github
                </Button>
            )}
        </>
    )

}