"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import masterCard from "/public/images/logos/mastercard.png";
import prime from "/public/images/logos/prime.png";
import cocacola from "/public/images/logos/cocacola.png";
import google from "/public/images/logos/google.png";
import lgtv from "/public/images/logos/lg.png";
import maggi from "/public/images/logos/maggi.png";
import meta from "/public/images/logos/meta.png";
import nivea from "/public/images/logos/nivea.png";
import tecno from "/public/images/logos/tecno.png";
import cowrywise from "/public/images/logos/cowrywise.png";

const logos = [
    { name: "masterCard", image: masterCard },
    { name: "Prime Video", image: prime },
    { name: "Coca Cola", image: cocacola },
    { name: "Google", image: google },
    { name: "Cowrywise", image: cowrywise },
    { name: "lgtv", image: lgtv },
    { name: "Maggi", image: maggi },
    { name: "Meta", image: meta },
    { name: "Nivea", image: nivea },
    { name: "Tecno", image: tecno },
];

export default function LogoTicker() {
    return (
        <section className="py-24 overflow-x-clip">
            <div className="container">
                <h3 className="text-center text-white/50 text-xl">
                    Proudly featured in skits for these amazing brands
                </h3>
                <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        animate={{
                            x: "-50%",
                        }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                        className="flex shrink-0 gap-24 pr-24 min-w-full"
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Fragment key={i}>
                                {logos.map((logo) => (
                                    <Image
                                        src={logo.image}
                                        key={logo.name}
                                        alt={logo.name}
                                        height={50}
                                        style={{ objectFit: "cover" }}
                                    />
                                ))}
                            </Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
