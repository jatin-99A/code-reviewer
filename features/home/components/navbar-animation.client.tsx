"use client"
import { motion } from "framer-motion";
import * as React from "react";

export function NavbarAnimation({ children }: { children: React.ReactNode }) {
    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/10 backdrop-blur-xl supports-backdrop-filter:bg-background/40"
        >

            { children }
        </motion.header>
    )
}