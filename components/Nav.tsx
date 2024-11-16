import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { Home, Zap, DollarSign, Mail, Shield, Menu } from 'lucide-react'


export default async function Nav() {

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      {/* Desktop navigation */}
      <div className="hidden sm:flex items-center gap-2 sm:gap-6">
        <Link href="/#features" className="text-lg font-medium underline-offset-4 hover:underline" prefetch={false}>
          Features
        </Link>
        <Link href="/#pricing" className="text-lg font-medium underline-offset-4 hover:underline" prefetch={false}>
          Pricing
        </Link>
        <Link data-testid="contactLink" href="/contact" className="text-lg font-medium underline-offset-4 hover:underline" prefetch={true}>
          Contact
        </Link>
        <Link data-testid="privacyLink" href="/privacy" className="text-lg font-medium underline-offset-4 hover:underline" prefetch={true}>
          Privacy
        </Link>
      </div>

      {/* Mobile Dropdown */}
      <div className="flex sm:hidden justify-end">
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
            <div className="grid grid-cols-2 gap-2">
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
                <Link href="/contact" className="flex items-center" data-testid="contactLink">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/privacy" className="flex items-center" data-testid="privacyLink">
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
