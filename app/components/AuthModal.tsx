'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButtons";
import { signInWithGoogle, signInWithGithub } from "../lib/actions";
import { useState } from "react";

export function AuthModal({ triggerClassName, buttonText = "Try for Free" }: { 
  triggerClassName?: string;
  buttonText?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Use Dialog without manually controlling `open` and `onOpenChange` unless you want external control
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row justify-center items-center gap-2">
          <DialogTitle className="flex flex-row items-center gap-2 text-3xl font-semibold">
            <Image src={Logo} alt="Logo" className="size-10" priority />
            Schedule<span className="text-primary">IT</span>
          </DialogTitle>
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
