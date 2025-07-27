
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {useRouter} from "next/navigation"
import {usePlatform} from "@/hooks/usePlatform";

export const LayoutGrid = ({
                               cards
                           }) => {
    const [selected, setSelected] = useState(null);
    const [lastSelected, setLastSelected] = useState(null);
    const router = useRouter();
    const handleMouseEnter = (card) => {
        setLastSelected(selected);
        setSelected(card);
    };

    const handleMouseLeave = () => {
        setLastSelected(selected);
        setSelected(null);
    };

    const handleClick = (card) => {
        router.push(`/allproducts/${card.title.toLocaleLowerCase()}/newArrivals`);
    }
    const platform = usePlatform()

    return (
        (<div
            className={`w-full h-full p-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  mx-auto gap-4 relative ${platform.isWindows?"max-w-5xl":"max-w-7xl"}`}>
            {cards.map((card, i) => (
                <div key={i} className={cn(card.className, "aspect-square")}>
                    <motion.div
                        onMouseEnter={() => handleMouseEnter(card)}
                        onMouseLeave={handleMouseLeave}

                        className={cn(card.className, "relative overflow-hidden aspect-square", selected?.id === card.id
                            ? "rounded-lg cursor-pointer absolute w-[70vw] md:w-[45%] lg:h-[45%] lg:w-[33%] z-19 flex flex-wrap flex-col"
                            : lastSelected?.id === card.id
                                ? "z-18 bg-white rounded-xl h-full w-full"
                                : "bg-white rounded-xl h-full w-full")}
                        layoutId={`card-${card.id}`}>
                        {selected?.id === card.id && <SelectedCard handleClick={handleClick} selected={selected} />}
                        <ImageComponent card={card} />
                    </motion.div>
                </div>
            ))}
            <motion.div
                onMouseOut={handleMouseLeave}
                onClick={handleMouseLeave}
                className={cn(
                    "absolute h-full w-full left-0 top-0 bg-black/30 opacity-0 z-10",
                    selected?.id ? "pointer-events-auto" : "pointer-events-none"
                )}
                animate={{ opacity: selected?.id ? 0.3 : 0 }} />
        </div>)
    );
};

const ImageComponent = ({
                            card
                        }) => {
    return (
        (<motion.img
            layoutId={`image-${card.id}-image`}
            src={card.thumbnail}
            height="500"
            width="500"
            className={cn(
                "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
            )}
            alt="thumbnail" />)
    );
};

const SelectedCard = ({
                          handleClick,selected
                      }) => {
    return (
        (<div
            className="bg-transparent aspect-square h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]" onClick={()=>{console.log(selected) ;handleClick(selected); }}>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 0.6,
                }}
                className="absolute aspect-square inset-0 h-full w-full bg-black opacity-60 z-10" />
            <motion.div
                layoutId={`content-${selected?.id}`}
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: 100,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="relative px-8 pb-4 z-[70]">
                {selected?.content}
            </motion.div>
        </div>)
    );
};
