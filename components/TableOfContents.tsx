"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/lib/extract-headings";

interface TableOfContentsProps {
    headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0% -35% 0%" }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    if (headings.length === 0) return null;

    return (
        <aside className="hidden lg:block w-full" data-testid="table-of-contents">
            <div className="sticky top-24 border-l border-gold-500/20 pl-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <h4 className="font-cinzel text-sm font-bold text-gold-500 mb-3">
                    Neste Capítulo
                </h4>
                <nav>
                    <ul className="space-y-2 text-sm">
                        {headings.map((heading) => (
                            <li
                                key={heading.id}
                                style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
                            >
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => handleClick(e, heading.id)}
                                    className={cn(
                                        "block py-1 transition-colors hover:text-gold-400",
                                        activeId === heading.id
                                            ? "text-gold-500 font-semibold"
                                            : "text-muted-foreground"
                                    )}
                                    data-testid={`toc-link-${heading.id}`}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
