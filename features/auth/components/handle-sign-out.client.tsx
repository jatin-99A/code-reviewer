"use client"
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SIGN_IN_PATH } from "../utils";


export function Logout() {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.refresh();
                },
            },
        });
    };

    return <span className="h-full w-full cursor-pointer" onClick={handleSignOut}>Log out</span>
};