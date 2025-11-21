import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div className="container mx-auto py-24 px-4 flex items-center justify-center min-h-[80vh]">
            <SignIn
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-background/95 backdrop-blur-sm border-gold-500/20",
                    }
                }}
            />
        </div>
    );
}
