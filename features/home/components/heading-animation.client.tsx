"use client";

import { motion } from "framer-motion";

export default function HeadingAnimation() {
    return (
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
        >
            AI Code Review for{" "}
            <span className="text-primary">GitHub Pull Requests</span>
        </motion.h1>
    );
}