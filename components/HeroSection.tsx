'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import React from 'react';

const HeroSection = () => {
    const initiallySelectedDates = [new Date(), (new Date(), 1)];

    const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-left text-center lg:text-5xl/none">
                                Effortless Rotating Schedule Management
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl md:text-left text-center">
                                Our rotating schedule builder helps
                                professionals track, share, and schedule with
                                ease. Say goodbye to manual planning.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center md:justify-start gap-2 min-[400px]:flex-row">
                            <Button variant="default" asChild>
                                <Link href="#" prefetch={false}>
                                    Get Started
                                </Link>
                            </Button>
                            <Button asChild variant="secondary">
                                <Link href="#" prefetch={false}>
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit mx-auto">
                        <Calendar
                            mode="multiple"
                            selected={selectedDates}
                            onSelect={(dates) => setSelectedDates(dates || [])}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
