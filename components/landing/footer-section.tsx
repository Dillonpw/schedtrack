import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-background border-primary/10 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center">
                <Image
                  src="/favicon.png"
                  alt="Sched Track"
                  width={32}
                  height={32}
                />
                <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                  Sched Track
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground ml-2 max-w-xs text-sm">
              Simplify your life.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-semibold text-transparent">
              Product
            </h3>
            <ul className="space-y-2">
              {["Features", "Pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-secondary text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-semibold text-transparent">
              Company
            </h3>
            <ul className="space-y-2">
              {["About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="from-primary/10 via-secondary/10 to-primary/10 my-8 bg-gradient-to-r" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Sched Track. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-muted-foreground hover:text-secondary text-xs transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
