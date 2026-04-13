'use client';

import React, { useState, useRef, useEffect, } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

type Card = {
    title: string;
    description: string;
    skeleton: React.ReactNode;
    className: string;
    config: {
        y: number;
        x: number;
        rotate: number;
        zIndex: number;
    };
}

const Skeleton = ({ className }: { className?: string }) => {
    const renderLineSet = (isTop: boolean) => (
        <div className={cn(
            "absolute inset-0 flex justify-around p-4 gap-1",
            isTop ? "items-start" : "items-end"
        )}>
            {[...Array(30)].map((_, i) => {
                // Flip the curve for the top set: long on left, short on right
                const curveIndex = isTop ? (29 - i) : i;
                const maxHeight = (20 + Math.pow(curveIndex / 29, 2.5) * 80) * 0.83;
                const isAnimating = i % 2 === 1;

                if (isAnimating) {
                    return (
                        <motion.div
                            key={i}
                            className={cn("w-[1.5px] rounded-full", className)}
                            initial={{ scaleY: 0.15 }}
                            animate={{
                                scaleY: [0.15, 1, 0.15]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatType: "loop", // Using loop with a returning set looks smoother in many browsers
                                ease: "easeInOut",
                                delay: i * 0.1,
                            }}
                            style={{
                                height: `${maxHeight}%`,
                                originY: isTop ? 0 : 1,
                            }}
                        />
                    );
                }

                return (
                    <div
                        key={i}
                        className={cn("w-[1.5px] rounded-full h-[100%] opacity-100", className)}
                    />
                );
            })}
        </div>
    );

    return (
        <div className="h-50 w-full relative -translate-y-4">
            {renderLineSet(false)} {/* Bottom set growing UP */}
            {renderLineSet(true)}  {/* Top set growing DOWN */}
        </div>
    );
};

const Skeleton2 = ({ className }: { className?: string }) => {
    return (
        <div className="h-50 w-full relative -translate-y-4 overflow-hidden flex flex-col justify-around">
            {[...Array(30)].map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="relative w-full h-8 -my-2.5"
                    style={{
                        zIndex: (rowIndex % 5),
                    }}
                >
                    <svg
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        className="w-[250%] h-full absolute top-0 left-0"
                    >
                        <motion.path
                            d="M 0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10 T 125 10 T 150 10 T 175 10 T 200 10"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            className={cn(className?.replace('bg-', 'text-'))}
                            animate={{
                                x: ["0%", "-50%"],
                                strokeWidth: [0.6, 2.4, 0.6],
                                opacity: [0.1, 0.9, 0.1],
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear",
                                delay: rowIndex * 0.20,
                            }}
                        />

                    </svg>
                </div>
            ))}
        </div>
    );
};

const Skeleton3 = ({ className }: { className?: string }) => {
    return (
        <div className="h-50 w-full relative -translate-y-4 overflow-hidden p-3 grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
            {[...Array(180)].map((_, i) => {
                const row = Math.floor(i / 18);
                const col = i % 18;
                return (
                    <motion.div
                        key={i}
                        className={cn("aspect-square rounded-[2px]", className)}
                        animate={{
                            opacity: [0.05, 0.7, 0.05],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: (row + col) * 0.07,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}
        </div>
    );
};

export const Cards = () => {
    const cards = [
        {
            title: 'Working Knowledge',
            description: 'Frameworks, principles and models that I have learned and developed.',
            skeleton: <Skeleton className="bg-[#fefbbf]" />,

            className: 'bg-[#e44f11] [&_h2]:text-[#fefbbf] [&_p]:text-[#fefbbf] [&_h2]:font-noto-serif [&_h2]:font-normal [&_h2]:text-4xl',
            config: {
                x: 0,
                y: 120,
                rotate: -10,
                zIndex: 2,

            },
        },
        {
            title: 'Practical Demonstration',
            description: 'See concepts come to life through hands-on examples and real-world applications.',
            skeleton: <Skeleton3 className="bg-stone-500/80" />,
            className: 'bg-[#f6ead8] [&_h2]:text-[#524632] [&_p]:text-[#524632] [&_h2]:font-noto-serif [&_h2]:font-normal [&_h2]:text-4xl',
            config: {
                x: 180,
                y: 160,
                rotate: 6,
                zIndex: 3,
            },
        },
        {
            title: 'Collaborate with AI',
            description: 'Work alongside intelligent systems to accelerate creativity and decision-making.',
            skeleton: <Skeleton2 className="bg-[#adfcfc]" />,
            className: 'bg-[#0a90d2] [&_h2]:text-[#adfcfc] [&_p]:text-[#adfcfc] [&_h2]:font-noto-serif [&_h2]:font-normal [&_h2]:text-4xl',
            config: {
                x: 360,
                y: 60,
                rotate: -2,
                zIndex: 4,
            },
        },
        {
            title: 'Means and Methods',
            description: 'Explore the tools, techniques, and workflows that power modern digital craft.',
            skeleton: <Skeleton3 className="bg-emerald-500/80" />,
            className: 'bg-[#53f298] [&_h2]:text-[#035608] [&_p]:text-[#035608] [&_h2]:font-noto-serif [&_h2]:font-normal [&_h2]:text-4xl',
            config: {
                x: 540,
                y: 160,
                rotate: 2,
                zIndex: 5,

            },
        },
        {
            title: 'Interface Kits',
            description: 'Leverage pre-built, polished UI components to ship beautiful products faster.',
            skeleton: <Skeleton className="bg-[#f3e8d7]" />,
            className: 'bg-[#211e1f] [&_h2]:text-[#f3e8d7] [&_p]:text-[#f3e8d7] [&_h2]:font-noto-serif [&_h2]:font-normal [&_h2]:text-4xl',
            config: {
                x: 720,
                y: 50,
                rotate: 5,
                zIndex: 7,
            },
        },
    ];
    const [active, setActive] = useState<Card | null>(null);

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setActive(null);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, []);

    const isAnyCardActive = () => {
        return active?.title;
    }

    const isCurrentActive = (card: Card) => {
        return active?.title === card.title;
    }
    return (
        <div ref={ref} className="max-w-5xl mx-auto w-full scale-67 h-180 relative">
            {cards.map((card, index) => (
                <motion.div key={card.title}>
                    <motion.button
                        onClick={() => setActive(card)}
                        className={cn('w-80 p-8  absolute rounded-2xl not-only:inset-0 flex flex-col justify-between items-start overflow-hidden cursor: pointer text-left', card.className)}
                        initial={{
                            y: 400,
                            x: 0,
                            scale: 0,
                            filter: "blur(10px)",
                        }}
                        animate={{
                            y: isCurrentActive(card) ? 0 : (isAnyCardActive() ? 400 : card.config.y),
                            x: isCurrentActive(card) ? 320 : (isAnyCardActive() ? card.config.x * 0.6 + 200 : card.config.x),
                            rotate: isCurrentActive(card) ? 0 : (isAnyCardActive() ? card.config.rotate * 0.15 : card.config.rotate),
                            scale: isCurrentActive(card) ? 1 : (isAnyCardActive() ? 0.8 : 1),
                            width: isCurrentActive(card) ? 400 : 320,
                            height: isCurrentActive(card) ? 500 : 400,
                            filter: "blur(0px)",
                        }}
                        whileHover={{
                            scale: isCurrentActive(card) ? 1 : (isAnyCardActive() ? 0.8 : 1.05),
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 17,
                        }}
                        style={{
                            zIndex: card.config.zIndex,
                        }}
                    >
                        {card.skeleton}
                        <motion.div
                            layout={isCurrentActive(card)}
                            className={cn(
                                "relative z-10 text-left flex flex-col items-start",
                                isCurrentActive(card) && "absolute top-[380px] left-8 right-8"
                            )}
                            animate={{
                                y: isCurrentActive(card) ? -120 : 0,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 17,
                            }}
                        >
                            <motion.h2
                                layout={isCurrentActive(card)}
                                className="text-2xl text-white font-inter font-semibold">{card.title}</motion.h2>
                            <AnimatePresence>
                                {isCurrentActive(card) && (
                                    <motion.p
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="text-white/80 font-inter text-sm mt-3 text-left overflow-hidden">{card.description}</motion.p>

                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.button>
                </motion.div>
            ))}
        </div>
    )
}