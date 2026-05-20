import { router, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ lookbook }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [current, setCurrent] = useState(0);

    if (!lookbook || lookbook.fotos.length === 0) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
                <h1 className="text-4xl font-bold tracking-widest mb-8" style={{ fontFamily: 'Cinzel, serif' }}>PANDEMONIUM</h1>
                <button
                    onClick={() => router.get(route('prendas.index'))}
                    className="border border-white text-white px-8 py-3 tracking-widest hover:bg-white hover:text-black transition w-48"
                >
                    CATÁLOGO
                </button>
                {!user && (
                    <Link
                        href="/login"
                        className="border border-white text-white px-8 py-3 tracking-widest hover:bg-white hover:text-black transition w-48 text-center"
                    >
                        ENTRAR
                    </Link>
                )}
            </div>
        );
    }

    const fotos = lookbook.fotos;
    const total = fotos.length;

    const siguiente = () => setCurrent((prev) => (prev + 1) % total);
    const anterior = () => setCurrent((prev) => (prev - 1 + total) % total);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">

            {/* NAVBAR */}
            <nav className="flex justify-between items-center px-8 py-6 z-10">
                <h1 className="text-2xl font-bold tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>PANDEMONIUM</h1>
                <div className="flex gap-6 text-sm tracking-widest items-center">
                    <button
                        onClick={() => router.get(route('prendas.index'))}
                        className="hover:text-gray-400 transition"
                    >
                        CATÁLOGO
                    </button>
                    {!user && (
                        <Link href="/login" className="hover:text-gray-400 transition">
                            ENTRAR
                        </Link>
                    )}
                </div>
            </nav>

            {/* TÍTULO COLECCIÓN */}
            <div className="text-center py-4">
                <p className="text-xs tracking-[0.4em] text-gray-500 uppercase">Colección</p>
                <h2 style={{ fontFamily: 'Cinzel, serif' }} className="text-3xl tracking-widest mt-1">
                    {lookbook.titulo}
                </h2>
                {lookbook.descripcion && (
                    <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">{lookbook.descripcion}</p>
                )}
            </div>

            {/* CARRUSEL */}
            <div className="flex-1 flex items-center justify-center relative px-4 pb-8">

                {/* Botón anterior */}
                <button
                    onClick={anterior}
                    className="absolute left-4 z-10 text-white text-3xl hover:text-gray-400 transition"
                >
                    ‹
                </button>

                {/* Imagen */}
                <div
                    className="w-full max-w-2xl cursor-pointer"
                    onClick={() => router.get(route('prendas.index', { coleccion: lookbook.titulo }))}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={current}
                            src={`/storage/${fotos[current].imagen}`}
                            alt={`Foto ${current + 1}`}
                            className="w-full h-[70vh] object-cover"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.4 }}
                        />
                    </AnimatePresence>
                </div>

                {/* Botón siguiente */}
                <button
                    onClick={siguiente}
                    className="absolute right-4 z-10 text-white text-3xl hover:text-gray-400 transition"
                >
                    ›
                </button>
            </div>

            {/* INDICADORES */}
            <div className="flex justify-center gap-2 pb-8">
                {fotos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-white' : 'bg-gray-600'}`}
                    />
                ))}
            </div>

            {/* CTA */}
            <div className="text-center pb-10">
                <button
                    onClick={() => router.get(route('prendas.index', { coleccion: lookbook.titulo }))}
                    className="border border-white text-white px-10 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition"
                >
                    VER COLECCIÓN
                </button>
            </div>

        </div>
    );
}
