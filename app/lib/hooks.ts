import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function requrieUser(){
    const session = await auth(); 

    if(!session?.user){
        return redirect("/")
    }
    
    return session;
}