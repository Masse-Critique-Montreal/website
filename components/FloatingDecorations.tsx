"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function DecorativeImages() {
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const isMobile = useIsMobile();

    //const isMobile = true;

    useEffect(() => {
        let lastY = window.scrollY;
        let timeout: NodeJS.Timeout;

        const handleScroll = () => {
            const delta = window.scrollY - lastY;
            lastY = window.scrollY;

            // clamp so it stays subtle
            setScrollVelocity(Math.max(-6, Math.min(6, delta * 0.25)));

            clearTimeout(timeout);
            timeout = setTimeout(() => setScrollVelocity(0), 80);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeout);
        };
    }, []);

    const decorations = [
        {
            src: "/phil_snail.png",
            top: -100,
            left: -20,
            scale: 0.52,
            factor: 3,
            desktopOffset: [60, 160]
        },
        {
            src: "/phil_cardinal.png",
            top: -92,
            left: 66,
            scale: 0.28,
            factor: -2.2,
            desktopOffset: [130, 600],
        },
        {
            src: "/phil_two_on_a_bike.png",
            top: 550,
            right: 0,
            scale: 0.55,
            factor: -1.2,
            desktopOffset: [0, 0]
        },
    ];

    return (
        <>
            {/* Hide entirely on desktop */}
            <div className="relative w-full pointer-events-none overflow-visible">
                {decorations.map((item, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            top: item.top,
                            left: item.left,
                            right: item.right,
                            "--dx": `${item.desktopOffset[0]}px`,
                            "--dy": `${item.desktopOffset[1]}px`,
                        }}
                    >
                        {/* desktop offset layer */}
                        <div className="lg:[translate:var(--dx)_var(--dy)]">
                            {/* scroll animation layer */}
                            <div
                                className="transition-transform duration-300 ease-out"
                                style={{
                                    transform: `rotate(${scrollVelocity * item.factor}deg) scale(${item.scale || 1})`,
                                }}
                            >
                                <Image
                                    src={item.src}
                                    alt=""
                                    width={160}
                                    height={160}
                                    className="opacity-80 lg:scale-300 lg:opacity-30 lg:-z-1000"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}