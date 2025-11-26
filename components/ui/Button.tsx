import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "link";
    size?: "sm" | "md" | "lg" | "icon";
    "data-testid"?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", "data-testid": testId, ...props }, ref) => {
        return (
            <button
                ref={ref}
                data-testid={testId}
                className={cn(
                    // Base styles
                    "inline-flex items-center justify-center rounded-md font-cinzel font-bold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500",
                    "disabled:pointer-events-none disabled:opacity-50",
                    // Variants
                    {
                        "bg-gold-500 text-background hover:bg-gold-600 shadow-lg shadow-gold-500/20":
                            variant === "primary",
                        "bg-parchment-200 text-background hover:bg-parchment-100":
                            variant === "secondary",
                        "border border-gold-500 text-gold-500 hover:bg-gold-500/10":
                            variant === "outline",
                        "text-gold-500 hover:text-gold-400 hover:bg-gold-500/10":
                            variant === "ghost",
                        "text-gold-500 underline-offset-4 hover:underline":
                            variant === "link",
                    },
                    // Sizes
                    {
                        "h-9 px-4 text-sm": size === "sm",
                        "h-11 px-8 text-base": size === "md",
                        "h-14 px-10 text-lg": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
