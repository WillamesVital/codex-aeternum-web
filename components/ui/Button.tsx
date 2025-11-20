import * as React from "react";
import { cn } from "@/lib/utils";
// import { Slot } from "@radix-ui/react-slot"; // Removed unused import 
// I'll stick to simple button for now to avoid extra deps unless needed.
// Actually, I'll just use a standard button.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-cinzel font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-gold-500 text-background hover:bg-gold-600 shadow-lg shadow-gold-500/20":
                            variant === "primary",
                        "bg-parchment-200 text-background hover:bg-parchment-100":
                            variant === "secondary",
                        "border border-gold-500 text-gold-500 hover:bg-gold-500/10":
                            variant === "outline",
                        "text-gold-500 hover:text-gold-400 hover:bg-gold-500/10":
                            variant === "ghost",
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
