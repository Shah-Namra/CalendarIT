// app/components/AuthModal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButtons";
import { signInWithGoogle, signInWithGithub } from "../lib/actions";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row justify-center items-center gap-2">
          <Image src={Logo} alt="Logo" className="size-10" />
          <h4 className="text-3xl font-semibold">
            Cal<span className="text-primary">Marshal</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form action={signInWithGoogle} className="w-full">
            <GoogleAuthButton />
          </form>
          <form action={signInWithGithub}>
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}