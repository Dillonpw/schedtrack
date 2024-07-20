import Link from 'next/link';

export default function Pricing() {
    return (
        <div className="gap-6 max-w-xl mx-auto py-10 px-20">
            <div className="bg-background rounded-lg shadow-lg overflow-hidden dark:border-gray-600 dark:border">
                <div className="p-6 md:p-8">
                    <h3 className="text-4xl font-bold mb-2 text-center">
                        Subscribe
                    </h3>
                    <p className="text-muted-foreground mb-6 text-center">
                        Perfect for individuals
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2">
                            <CheckIcon className="w-5 h-5 text-primary" />
                            <span>
                                Full access to our schedule generating
                                technology
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon className="w-5 h-5 text-primary" />
                            <span>
                                Access to Calendar-view and List-view models
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon className="w-5 h-5 text-primary" />
                            <span>Unlimited schedule adjustments</span>
                        </li>
                    </ul>
                    <div className="flex justify-between items-end">
                        <div className="text-4xl font-bold">$1/mo</div>
                        <Link
                            href="#"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            prefetch={false}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}
