import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ carrito }) {
    const total = carrito.reduce((sum, item) => sum + parseFloat(item.precio), 0);

    return (
        <AuthenticatedLayout>
            <style>{`
                .btn-quitar:hover { color: #8B0000 !important; }
                .btn-catalogo:hover { background: #8B0000 !important; color: #fff !important; }
                .btn-confirmar:hover { background: #8B0000 !important; color: #fff !important; }
                .carrito-item:hover { border-color: #2a0000 !important; }
            `}</style>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

                <button
                    onClick={() => router.get(route('prendas.index'))}
                    style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', textTransform: 'uppercase', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#8B0000'}
                    onMouseLeave={e => e.target.style.color = '#555'}
                >
                    ← Seguir comprando
                </button>

                <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                    Mi Carrito
                </h1>
                <div style={{ color: '#8B0000', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2rem' }}>
                    — ✦ —
                </div>

                {carrito.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ color: '#444', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            Tu carrito está vacío
                        </p>
                        <button
                            className="btn-catalogo"
                            onClick={() => router.get(route('prendas.index'))}
                            style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '12px 24px', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                        >
                            Ver catálogo
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1a0000', marginBottom: '2rem' }}>
                            {carrito.map(item => (
                                <div
                                    key={item.prenda_id}
                                    className="carrito-item"
                                    style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: '#0a0a0a', padding: '1rem', transition: 'border-color 0.2s' }}
                                >
                                    {item.imagen ? (
                                        <img
                                            src={`/storage/${item.imagen}`}
                                            alt={item.nombre}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', border: '0.5px solid #1a0000', flexShrink: 0 }}
                                        />
                                    ) : (
                                        <div style={{ width: '80px', height: '80px', background: '#111', border: '0.5px solid #1a0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '10px', flexShrink: 0 }}>
                                            Sin imagen
                                        </div>
                                    )}

                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: 'Cinzel, serif', color: '#ddd', fontSize: '13px', letterSpacing: '0.05em', marginBottom: '4px' }}>
                                            {item.nombre}
                                        </div>
                                        <div style={{ color: '#444', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                            {[item.talla, item.color].filter(Boolean).join(' · ')}
                                        </div>
                                    </div>

                                    <div style={{ color: '#8B0000', fontFamily: 'Cinzel, serif', fontSize: '14px', marginRight: '1rem' }}>
                                        {item.precio}€
                                    </div>

                                    <button
                                        className="btn-quitar"
                                        onClick={() => router.delete(route('carrito.quitar', item.prenda_id))}
                                        style={{ background: 'none', border: 'none', color: '#333', fontSize: '16px', cursor: 'pointer', transition: 'color 0.2s', padding: '4px' }}
                                        title="Quitar del carrito"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '0.5px solid #1a0000', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ color: '#444', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>Total</div>
                                <div style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '22px' }}>
                                    {total.toFixed(2)}€
                                </div>
                            </div>
                            <button
                                className="btn-confirmar"
                                onClick={() => router.get(route('carrito.pago'))}
                                style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '14px 32px', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                            >
                                Confirmar compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
