"use client"

import { useSession } from "@/components/providers/session-provider";
import { UserMenu, UserMenuProps } from "./user-menu";

type UserMenuWithSessionProps = Omit<UserMenuProps, "user">;

export function UserMenuWithSession(props: UserMenuWithSessionProps) {
    const session = useSession();

    if (!session) return null;

    return <UserMenu user={session.user} {...props} />
} 