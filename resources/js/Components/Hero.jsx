import { motion } from "motion/react"

export default function Hero() {
    return (
        <section className="h-screen bg-black text-white flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-8xl font-bold tracking-tight">
                    PANDEMONIUM
                </h1>

                <p className="mt-4 text-zinc-400">
                    Spring / Summer 2026
                </p>
            </motion.div>
        </section>
    )
}
