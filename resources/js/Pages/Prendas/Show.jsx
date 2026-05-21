import { router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Show({ prenda }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const imagenes = prenda.imagenes?.length > 0 ? prenda.imagenes : (prenda.imagen ? [{ id: 0, imagen: prenda.imagen }] : []);
    const [current, setCurrent] = useState(0);

    const siguiente = () => setCurrent((prev) => (prev + 1) % imagenes.length);
    const anterior = () => setCurrent((prev) => (prev - 1 + imagenes.length) % imagenes.length);

    const handleAnadirCarrito = () => {
        if (!user) { router.get(route('login')); return; }
        router.post(route('carrito.añadir', prenda.id));
    };

    const handleComprarAhora = () => {
        if (!user) { router.get(route('login')); return; }
        if (confirm('¿Confirmas la compra directa de esta prenda?')) {
            router.post(route('carrito.añadir', prenda.id), {}, {
                onSuccess: () => router.get(route('carrito.pago')),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <style>{`
                .btn-carrito:hover { background: #8B0000 !important; color: #fff !important; }
                .btn-comprar:hover { background: #fff !important; color: #000 !important; }
                .btn-editar:hover { border-color: #8B0000 !important; color: #8B0000 !important; }
                .btn-eliminar:hover { background: #8B0000 !important; color: #fff !important; }
                .miniatura:hover { border-color: #8B0000 !important; }
                .btn-volver:hover { color: #8B0000 !important; }
            `}</style>

            <div style={{ background: '#080808', minHeight: '100vh', padding: '2rem 1rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                    {/* VOLVER */}
                    <button
                        className="btn-volver"
                        onClick={() => router.get(route('prendas.index'))}
                        style={{ color: '#555', fontSize: '11px', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', transition: 'color 0.2s', textTransform: 'uppercase' }}
                    >
                        ← Volver al catálogo
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

                        {/* IMÁGENES */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {imagenes.length > 0 ? (
                                <>
                                    <div style={{ position: 'relative' }}>
                                        <img
                                            src={`/storage/${imagenes[current].imagen}`}
                                            alt={prenda.nombre}
                                            style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block', border: '0.5px solid #1a0000' }}
                                        />
                                        {imagenes.length > 1 && (
                                            <>
                                                <button onClick={anterior} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: '0.5px solid #3a0000', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}>‹</button>
                                                <button onClick={siguiente} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: '0.5px solid #3a0000', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}>›</button>
                                            </>
                                        )}
                                    </div>
                                    {imagenes.length > 1 && (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {imagenes.map((img, i) => (
                                                <img
                                                    key={img.id}
                                                    src={`/storage/${img.imagen}`}
                                                    alt={`${prenda.nombre} ${i + 1}`}
                                                    onClick={() => setCurrent(i)}
                                                    className="miniatura"
                                                    style={{ width: '64px', height: '64px', objectFit: 'cover', cursor: 'pointer', border: i === current ? '1px solid #8B0000' : '0.5px solid #2a0000', transition: 'border-color 0.2s' }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div style={{ width: '100%', aspectRatio: '1', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '12px', border: '0.5px solid #1a0000' }}>
                                    Sin imagen
                                </div>
                            )}
                        </div>

                        {/* DETALLES */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* NOMBRE Y PRECIO */}
                            <div>
                                <div style={{ color: '#444', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                    {prenda.coleccion || 'Pandemonium'}
                                </div>
                                <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '24px', letterSpacing: '0.1em', margin: '0 0 12px' }}>
                                    {prenda.nombre}
                                </h1>
                                <div style={{ color: '#8B0000', fontFamily: 'Cinzel, serif', fontSize: '22px' }}>
                                    {prenda.precio}€
                                </div>
                            </div>

                            {/* SEPARADOR */}
                            <div style={{ borderTop: '0.5px solid #1a0000' }} />

                            {/* DESCRIPCIÓN */}
                            {prenda.descripcion && (
                                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.8', letterSpacing: '0.03em' }}>
                                    {prenda.descripcion}
                                </p>
                            )}

                            {/* ATRIBUTOS */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    { label: 'Talla', value: prenda.talla },
                                    { label: 'Color', value: prenda.color },
                                    { label: 'Corte', value: prenda.corte },
                                    { label: 'Categoría', value: prenda.categoria },
                                ].filter(a => a.value).map(({ label, value }) => (
                                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid #111', paddingBottom: '8px' }}>
                                        <span style={{ color: '#444', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</span>
                                        <span style={{ color: '#aaa', fontSize: '11px', letterSpacing: '0.05em' }}>{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* SEPARADOR */}
                            <div style={{ borderTop: '0.5px solid #1a0000' }} />

                            {/* BOTONES */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {prenda.disponible ? (
                                    <>
                                        <button
                                            className="btn-carrito"
                                            onClick={handleAnadirCarrito}
                                            style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '14px', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                        >
                                            {user ? 'Añadir al carrito' : 'Iniciar sesión para comprar'}
                                        </button>
                                        {user && (
                                            <button
                                                className="btn-comprar"
                                                onClick={handleComprarAhora}
                                                style={{ background: 'transparent', border: '0.5px solid #fff', color: '#fff', padding: '14px', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                            >
                                                Comprar ahora
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <button disabled style={{ background: 'transparent', border: '0.5px solid #2a0000', color: '#333', padding: '14px', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', cursor: 'not-allowed', textTransform: 'uppercase' }}>
                                        No disponible
                                    </button>
                                )}

                                {user?.role === 'admin' && (
                                    <>
                                        <div style={{ borderTop: '0.5px solid #1a0000', marginTop: '4px' }} />
                                        <button
                                            className="btn-editar"
                                            onClick={() => router.get(route('prendas.edit', prenda.id))}
                                            style={{ background: 'transparent', border: '0.5px solid #333', color: '#555', padding: '10px', fontSize: '10px', letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                        >
                                            Editar prenda
                                        </button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => { if (confirm('¿Seguro que quieres eliminar esta prenda?')) router.delete(route('prendas.destroy', prenda.id)); }}
                                            style={{ background: 'transparent', border: '0.5px solid #3a0000', color: '#8B0000', padding: '10px', fontSize: '10px', letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                        >
                                            Eliminar prenda
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* SEPARADOR FINAL */}
                            <div style={{ textAlign: 'center', color: '#3a0000', fontSize: '12px', letterSpacing: '0.4em', marginTop: '1rem' }}>
                                — ✦ PANDEMONIUM ✦ —
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
