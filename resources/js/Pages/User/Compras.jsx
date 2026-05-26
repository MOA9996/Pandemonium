import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Compras({ compras }) {
    const estadoStyle = (estado) => {
        const map = {
            paid:     { color: '#4a8a4a', background: '#0a1a0a', border: '#1a4a1a', label: 'Pagado' },
            pending:  { color: '#8a7a4a', background: '#1a1a0a', border: '#4a3a1a', label: 'Pendiente' },
            refunded: { color: '#4a6a8a', background: '#0a0f1a', border: '#1a2a4a', label: 'Devuelto' },
            failed:   { color: '#8a4a4a', background: '#1a0a0a', border: '#4a1a1a', label: 'Fallido' },
        };
        return map[estado] || map.failed;
    };

    return (
        <AuthenticatedLayout>
            <style>{`
                .btn-catalogo:hover { background: #8B0000 !important; color: #fff !important; }
                .compra-item:hover { border-color: #2a0000 !important; }
            `}</style>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

                <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                    Mis Compras
                </h1>
                <div style={{ color: '#ddd', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2rem' }}>— ✦ —</div>

                {compras.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ color: '#444', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            Aún no has realizado ninguna compra.
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1a0000' }}>
                        {compras.map(compra => {
                            const s = estadoStyle(compra.estado);
                            return (
                                <div
                                    key={compra.id}
                                    className="compra-item"
                                    style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: '#0a0a0a', padding: '1rem 1.2rem', transition: 'border-color 0.2s' }}
                                >
                                    {compra.prenda?.imagen ? (
                                        <img
                                            src={`/storage/${compra.prenda.imagen}`}
                                            alt={compra.prenda.nombre}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', border: '0.5px solid #1a0000', flexShrink: 0 }}
                                        />
                                    ) : (
                                        <div style={{ width: '80px', height: '80px', background: '#111', border: '0.5px solid #1a0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '10px', flexShrink: 0 }}>
                                            Sin imagen
                                        </div>
                                    )}

                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: 'Cinzel, serif', color: '#ddd', fontSize: '13px', letterSpacing: '0.05em', marginBottom: '4px' }}>
                                            {compra.prenda?.nombre ?? 'Prenda eliminada'}
                                        </div>
                                        <div style={{ color: '#444', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>
                                            {[compra.prenda?.talla && `Talla: ${compra.prenda.talla}`, compra.prenda?.color && `Color: ${compra.prenda.color}`].filter(Boolean).join(' · ')}
                                        </div>
                                        <div style={{ color: '#333', fontSize: '10px', letterSpacing: '0.05em' }}>
                                            {new Date(compra.fecha_compra).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                                        <div style={{ color: '#ddd', fontFamily: 'Cinzel, serif', fontSize: '14px' }}>
                                            {compra.precio_pagado}€
                                        </div>
                                        <span style={{ padding: '3px 8px', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: s.color, background: s.background, border: `0.5px solid ${s.border}` }}>
                                            {s.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
