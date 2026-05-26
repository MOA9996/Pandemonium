import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Compras({ compras }) {

    const estadoStyle = (estado) => {
        const map = {
            paid:     { color: '#4a8a4a', background: '#0a1a0a', border: '#1a4a1a' },
            pending:  { color: '#8a7a4a', background: '#1a1a0a', border: '#4a3a1a' },
            refunded: { color: '#4a6a8a', background: '#0a0f1a', border: '#1a2a4a' },
            failed:   { color: '#8a4a4a', background: '#1a0a0a', border: '#4a1a1a' },
        };
        return map[estado] || map.failed;
    };

    const estadoLabel = { paid: 'Pagado', pending: 'Pendiente', refunded: 'Devuelto', failed: 'Fallido' };

    return (
        <AuthenticatedLayout>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>

                <button
                    onClick={() => router.get(route('admin.index'))}
                    style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', textTransform: 'uppercase', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#8B0000'}
                    onMouseLeave={e => e.target.style.color = '#555'}
                >
                    ← Panel admin
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                    <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em', margin: 0 }}>Compras</h1>
                </div>
                <div style={{ color: '#8B0000', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2rem' }}>— ✦ —</div>

                {compras.length === 0 ? (
                    <p style={{ color: '#444', textAlign: 'center', padding: '4rem 0', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        No hay compras registradas aún.
                    </p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr style={{ background: '#1a1a1a', borderBottom: '0.5px solid #2a0000' }}>
                                {['#', 'Usuario', 'Prenda', 'Talla', 'Color', 'Precio', 'Estado', 'Fecha'].map(h => (
                                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: '#777', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 'normal' }}>{h}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {compras.map((compra, i) => (
                                <tr key={compra.id} style={{ borderBottom: '0.5px solid #1a1a1a', background: i % 2 === 0 ? '#141414' : '#111' }}>
                                    <td style={{ padding: '12px 14px', color: '#444', fontSize: '11px' }}>{compra.id}</td>
                                    <td style={{ padding: '12px 14px' }}>
                                        <div style={{ color: '#ccc', fontSize: '12px' }}>{compra.user?.name ?? 'Eliminado'}</div>
                                        <div style={{ color: '#555', fontSize: '10px', marginTop: '2px' }}>{compra.user?.email}</div>
                                    </td>
                                    <td style={{ padding: '12px 14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {compra.prenda?.imagen && (
                                                <img src={`/storage/${compra.prenda.imagen}`} alt={compra.prenda.nombre} style={{ width: '36px', height: '36px', objectFit: 'cover', border: '0.5px solid #222' }} />
                                            )}
                                            <span style={{ color: '#bbb', fontSize: '11px', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>{compra.prenda?.nombre ?? 'Eliminada'}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 14px', color: '#777', fontSize: '11px' }}>{compra.prenda?.talla ?? '—'}</td>
                                    <td style={{ padding: '12px 14px', color: '#777', fontSize: '11px' }}>{compra.prenda?.color ?? '—'}</td>
                                    <td style={{ padding: '12px 14px', color: '#ccc', fontFamily: 'Cinzel, serif', fontSize: '12px' }}>{compra.precio_pagado}€</td>
                                    <td style={{ padding: '12px 14px' }}>
                                        {(() => {
                                            const s = estadoStyle(compra.estado);
                                            return (
                                                <span style={{ padding: '3px 8px', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: s.color, background: s.background, border: `0.5px solid ${s.border}` }}>
                                                        {estadoLabel[compra.estado]}
                                                    </span>
                                            );
                                        })()}
                                    </td>
                                    <td style={{ padding: '12px 14px', color: '#555', fontSize: '10px' }}>
                                        {new Date(compra.fecha_compra).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
