import Image from "next/image";
import type { Metadata } from 'next';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSet,
} from "@/components/ui/field";
import { GithubSignInForm } from '@/features/auth/components/github-sign-in-form';
import Link from "next/link";
import { X } from "lucide-react";


export const metadata: Metadata = {
    title: "Sign up",
    description: "Sign up to CodeMortal AI Code Reviewer with your GitHub account.",
};

type SignInPageProps = {
    searchParams: Promise<{ callbackUrl?: string }>;
};


const SignUpPage = async ({ searchParams }: SignInPageProps) => {
    const { callbackUrl } = await searchParams;
    return (
        <Card className="relative border-b border-border/40 bg-background/30 dark:bg-background/10">
            <Link href={"/"}><X className="absolute right-2 top-2 text-red-600 cursor-pointer" /></Link>
            <CardHeader className="items-center text-center">
                <div className="mb-6 flex justify-center pt-2">
                    <Image
                        src="/logo.png"
                        alt="Chai AI Code Reviewer"
                        width={172}
                        height={172}
                        priority
                        className="text-foreground"
                    />
                </div>
                <CardTitle className="text-base">Welcome back</CardTitle>
                <CardDescription>
                    Sign up with GitHub to review and manage your code.
                </CardDescription>

            </CardHeader>
            <CardContent>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <GithubSignInForm callbackUrl={callbackUrl} />
                            <p className="text-muted-foreground text-center">Already have an account?<Link className="text-primary ml-2" href={"sign-in"}>Sign in</Link></p>
                            <FieldDescription className="text-center">
                                We only request the permissions needed to identify your
                                account. You can revoke access anytime from GitHub settings.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </CardContent>
        </Card>
    )
}

export default SignUpPage