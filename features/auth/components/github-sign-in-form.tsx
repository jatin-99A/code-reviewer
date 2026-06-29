import { signInWithGithub } from "../actions";
import { SubmitButton } from "./submit-button.client";

type GithubSignInFormProps = {
    callbackUrl?: string;
};

export function GithubSignInForm({ callbackUrl }: GithubSignInFormProps) {
    return (
        <form action={signInWithGithub} className="w-full">
            {callbackUrl ? (
                <input type="hidden" name="callbackUrl" value={callbackUrl} />
            ) : null}
            <SubmitButton />
        </form>
    )
}