import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            data-testid="breadcrumbs"
            className={cn("flex items-center text-sm text-muted-foreground mb-6", className)}
        >
            <Link
                href="/"
                className="hover:text-gold-500 transition-colors flex items-center gap-1"
                data-testid="breadcrumb-home"
            >
                <Home className="h-4 w-4" />
                <span className="sr-only">Início</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-gold-500 transition-colors"
                            data-testid={`breadcrumb-link-${index}`}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span
                            className="text-gold-500 font-medium line-clamp-1 max-w-[200px] sm:max-w-none"
                            aria-current="page"
                            data-testid="breadcrumb-current"
                        >
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
