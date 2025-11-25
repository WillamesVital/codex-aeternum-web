import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    "data-testid"?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, "data-testid": testId, ...props }, ref) => (
        <div
            ref={ref}
            data-testid={testId}
            className={cn(
                "rounded-lg border border-gold-500/30 bg-background/50 p-6 text-card-foreground shadow-sm backdrop-blur-sm transition-all hover:border-gold-500/60",
                className
            )}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, "data-testid": testId, ...props }, ref) => (
        <div
            ref={ref}
            data-testid={testId}
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
        />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement> & { "data-testid"?: string }>(
    ({ className, "data-testid": testId, ...props }, ref) => (
        <h3
            ref={ref}
            data-testid={testId}
            className={cn(
                "font-cinzel text-2xl font-semibold leading-none tracking-tight text-gold-500",
                className
            )}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, "data-testid": testId, ...props }, ref) => (
        <div
            ref={ref}
            data-testid={testId}
            className={cn("p-6 pt-0", className)}
            {...props}
        />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, "data-testid": testId, ...props }, ref) => (
        <div
            ref={ref}
            data-testid={testId}
            className={cn("flex items-center p-6 pt-0", className)}
            {...props}
        />
    )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
