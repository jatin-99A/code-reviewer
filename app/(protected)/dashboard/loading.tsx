import { Spinner } from "@/components/ui/spinner";

function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-transparent p-6">
            <div className="w-full max-w-lg rounded-[2rem] border border-border/70 bg-muted/80 p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl">
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg shadow-primary/10">
                        <Spinner className="size-10 text-primary" />
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">
                            Preparing your workspace
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                            Loading ...
                        </h1>
                        <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
                            Please wait while we fetch your projects, insights, and activity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loading;