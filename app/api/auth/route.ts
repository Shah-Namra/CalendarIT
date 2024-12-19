import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";

export async function GET(){
    const authURL = nylas.auth.urlForOAuth2({
        clientId: nylasConfig.clientId,
        redirectUri: nylasConfig.redirectUri,
    });

    return redirect(authURL);
}