"use client";
import { authClient } from "@/lib/auth-client";
import { UserMenu, UserMenuProps } from "../components/user-menu";

type UserMenuWithSessionProps = Omit<UserMenuProps, "user">;

export function UserMenuWithSession(props: UserMenuWithSessionProps) {
    const { data: session, isPending } = authClient.useSession();

    if (isPending || !session?.user) {
        return null;
    }

    return <UserMenu user={session.user} {...props} />
}