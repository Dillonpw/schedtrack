import Link from 'next/link';
import { CalendarIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link
                href="#"
                className="flex items-center justify-center"
                prefetch={false}
            >
                <CalendarIcon className="h-6 w-6" />
                <span className="sr-only">Rotating Schedule Builder</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link
                    href="#"
                    className="text-lg font-medium hover:underline underline-offset-4"
                    prefetch={false}
                >
                    Features
                </Link>
                <Link
                    href="#"
                    className="text-lg font-medium hover:underline underline-offset-4"
                    prefetch={false}
                >
                    Pricing
                </Link>
                <Link
                    href="#"
                    className="text-lg font-medium hover:underline underline-offset-4"
                    prefetch={false}
                >
                    About
                </Link>
                <Link
                    href="#"
                    className="text-lg font-medium hover:underline underline-offset-4"
                    prefetch={false}
                >
                    Contact
                </Link>
                <ThemeToggle />
            </nav>
        </header>
    );
};

export default Header;
