"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FadeIn } from "./motion";

type SectionWithImageProps = {
    id?: string;
    title?: string;
    eyebrow?: string;
    description?: string;
    children?: ReactNode;
    align?: "left" | "center";
    padded?: boolean;
    imageSrc: string;
    imageAlt: string;
    imagePosition?: "left" | "right";
    imageRatio?: "square" | "landscape" | "portrait";
};

export default function SectionWithImage({
    id,
    title,
    eyebrow,
    description,
    children,
    align = "left",
    padded = true,
    imageSrc,
    imageAlt,
    imagePosition = "right",
    imageRatio = "landscape",
}: SectionWithImageProps) {
    const alignment =
        align === "center" ? "text-center items-center" : "text-left items-start";

    const ratioClass = {
        square: "aspect-square",
        landscape: "aspect-[4/3]",
        portrait: "aspect-[3/4]",
    }[imageRatio];

    return (
        <section
            id={id}
            className={`w-full ${padded ? "px-6 py-14 md:py-16" : ""}`}
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                {/* Image - shows first on mobile, position controlled on desktop */}
                <FadeIn
                    className={`w-full lg:w-1/2 ${imagePosition === "left" ? "lg:order-1" : "lg:order-2"}`}
                >
                    <div className={`relative overflow-hidden rounded-2xl ${ratioClass}`}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/10 to-transparent" />
                    </div>
                </FadeIn>

                {/* Content */}
                <div
                    className={`w-full lg:w-1/2 ${imagePosition === "left" ? "lg:order-2" : "lg:order-1"}`}
                >
                    <FadeIn className={`flex flex-col gap-4 ${alignment}`} delay={0.1}>
                        {eyebrow ? (
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                                {eyebrow}
                            </p>
                        ) : null}
                        {title ? (
                            <h2 className="text-3xl font-semibold text-brand-black md:text-4xl">
                                {title}
                            </h2>
                        ) : null}
                        {description ? (
                            <p className="max-w-xl text-base text-brand-neutral md:text-lg">
                                {description}
                            </p>
                        ) : null}
                        {children ? <div className="mt-4 w-full">{children}</div> : null}
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
