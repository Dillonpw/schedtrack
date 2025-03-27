import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Home, Zap, DollarSign, Shield, Menu } from "lucide-react";

export default async function Nav() {
  return (
    <nav className="flex items-center justify-between px-4 py-2">
      {/* Desktop navigation */}
      <div className="hidden items-center gap-2 sm:flex sm:gap-6">
        <Link
          href="/#features"
          className="hover:text-primary text-lg font-medium"
          prefetch={false}
        >
          Features
        </Link>
        <Link
          href="/#pricing"
          className="hover:text-primary text-lg font-medium"
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          data-testid="privacyLink"
          href="/privacy"
          className="hover:text-primary text-lg font-medium"
          prefetch={true}
        >
          Privacy
        </Link>
      </div>

      {/* Mobile Dropdown */}
      <div className="flex justify-end sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/#features" className="flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                <span>Features</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/#pricing" className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Pricing</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/privacy"
                className="flex items-center"
                data-testid="privacyLink"
              >
                <Shield className="mr-2 h-4 w-4" />
                <span>Privacy</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
