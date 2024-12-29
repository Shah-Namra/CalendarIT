import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background text-white border-t border-border">
      <div className="container mx-auto flex flex-col gap-6 py-8 px-4 md:flex-row md:items-center md:justify-between">
        {/* Left Section: Company Info */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © 2024 Shah Namra. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with TypeScript, Tailwind CSS, and shadcn/ui.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center md:justify-end">
          <Link href="/" passHref>
            <Button variant="ghost" size="sm" className="text-primary ">
              Privacy
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="ghost" size="sm" className="text-primary ">
              Terms
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/shah-namra/" passHref>
            <Button variant="ghost" size="sm" className="text-primary ">
              Contact
            </Button>
          </Link>

          <a href="https://github.com/shah-namra" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="text-primary ">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://x.com/Namra_Shah_" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="text-primary ">
              <Twitter className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
}
