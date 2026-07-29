"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function FloatingDecorations() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    const decorations = [
        {
            src: "/phil_snail.png",
            side: "left",
            top: "25%",
            speed:1,
        },
        {
            src: "/phil_two_on_a_bike.png",
            side: "right",
            top: "70%",
            scale: 1.25,
            speed: 1.1,
            type: 'rotate'
        },
        {
            src: "/phil_cardinal.png",
            side: "right",
            top: "30%",
            scale: 1,
            speed: 1.1,
            type: 'rotate'
        }
    ];

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {decorations.map((item, index) => {
                const translateY = scrollY * item.speed;
                const translateX = scrollY * item.speed;
                const rotate = scrollY * item.speed * 0.45;

                return (
                    <div
                        key={index}
                        className="absolute transition-transform duration-300 z-[100000]"
                        style={{
                            top: item.top,
                            [item.side]:  `-22%`,
                            transform:  
                            `
                                translateX(${100 -(scrollY*item.speed)/1.8}%)
                                scale(${item.scale || 1})
                            `,
                            opacity: Math.max(
                                0.2,
                                1 - scrollY * 0.00003
                            ),
                        }}
                    >
                        <Image
                            src={item.src}
                            alt=""
                            width={160}
                            height={160}
                            className="opacity-80 sm:w-[160px] md:w-[100px] w-[80px]"
                        />
                    </div>
                );
            })}
        </div>
    );
}