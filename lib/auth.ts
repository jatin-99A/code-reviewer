import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { nextCookies } from "better-auth/next-js";
import env from "@/config/env";
import { profile } from "console";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,

            mapProfileToUser: async(profile) => (
                {
                    email:profile.email ?? `${profile.id}@users-noreply.github.com`,
                    name: profile.name ?? profile.login,
                }
            )
        },
    },

    plugins: [nextCookies()],
});