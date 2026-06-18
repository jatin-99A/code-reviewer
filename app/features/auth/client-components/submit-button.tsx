"use client";
import { GitHubIcon } from "@/components/icons/github-icon";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";


// Submit button
export function SubmitButton() {
    const { pending } = useFormStatus();

    let buttonLabel = "Continue with GitHub";
    let buttonIcon = <GitHubIcon />;

    if (pending) {
        buttonLabel = "Redirecting to GitHub…";
        buttonIcon = <Spinner className="size-4" />;
    }

    return (
        <Button
            type="submit"
            className={"w-full"}
            size={"lg"}
            disabled={pending}
        >
            {buttonIcon}
            {buttonLabel}
        </Button>
    )
}