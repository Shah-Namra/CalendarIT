import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@radix-ui/react-dialog';
=======
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
>>>>>>> fed4cec (1st)
import Logo from '@/public/logo.png';
import Image from "next/image";
import { signIn } from "../lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButtons";

export function AuthModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Try For Free</Button>
            </DialogTrigger>
<<<<<<< HEAD

=======
            
>>>>>>> fed4cec (1st)
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader className="flex-row items-center justify-center gap-2">
                    <Image src={Logo} alt="Logo" className="size-10" />
                    <h4 className="text-3xl font-semibold">
                        Calendar
                        <span className="text-primary">IT</span>
                    </h4>
                </DialogHeader>
                <div className="flex flex-col mt-5 gap-4">
                    <form
                        action={async () => {
                            "use server";
                            await signIn("google");
                        }}
                        className="w-full"
                    >
                        <GoogleAuthButton />
                    </form>

                    <form
                        action={async () => {
                            "use server";
                            await signIn("github");
                        }}
                        className="w-full"
                    >
                        <GitHubAuthButton />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
