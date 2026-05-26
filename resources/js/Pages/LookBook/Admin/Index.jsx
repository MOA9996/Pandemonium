import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminIndex({ lookbooks }) {
    return (
        <AuthenticatedLayout>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

                <button
                    onClick={() => router.get(route('admin.index'))}
                    style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', textTransform: 'uppercase', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#8B0000'}
                    onMouseLeave={e => e.target.style.color = '#555'}
                >
                    ← Panel admin
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                    <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em', margin: 0 }}>Lookbooks</h1>
                    <button
                        onClick={() => router.get(route('lookbook.create'))}
                        style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '8px 16px', fontSize: '10px', letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#8B0000'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B0000'; }}
                    >
                        + Nuevo lookbook
                    </button>
                </div>
                <div style={{ color: '#8B0000', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2rem' }}>— ✦ —</div>

                {lookbooks.length === 0 ? (
                    <p style={{ color: '#444', textAlign: 'center', padding: '4rem 0', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        No hay lookbooks creados aún.
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1a0000' }}>
                        {lookbooks.map(lookbook => (
                            <div key={lookbook.id} style={{ background: '#161616', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>

                                {/* MINIATURA */}
                                {lookbook.fotos?.[0] ? (
                                    <img
                                        src={`/storage/${lookbook.fotos[0].imagen}`}
                                        alt={lookbook.titulo}
                                        style={{ width: '60px', height: '60px', objectFit: 'cover', border: '0.5px solid #222', flexShrink: 0 }}
                                    />
                                ) : (
                                    <div style={{ width: '60px', height: '60px', background: '#1f1f1f', border: '0.5px solid #222', flexShrink: 0 }} />
                                )}

                                {/* INFO */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                        <span style={{ fontFamily: 'Cinzel, serif', color: '#ddd', fontSize: '13px', letterSpacing: '0.08em' }}>{lookbook.titulo}</span>
                                        {lookbook.activo && (
                                            <span style={{ border: '0.5px solid #1a4a1a', color: '#4a8a4a', fontSize: '9px', padding: '2px 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                                Activo
                                            </span>
                                        )}
                                    </div>
                                    {lookbook.descripcion && <p style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>{lookbook.descripcion}</p>}
                                    <span style={{ color: '#555', fontSize: '9px', letterSpacing: '0.1em' }}>{lookbook.fotos_count} fotos</span>
                                </div>

                                {/* BOTONES */}
                                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                    {!lookbook.activo ? (
                                        <button
                                            onClick={() => router.patch(route('lookbook.activar', lookbook.id))}
                                            style={{ background: 'transparent', border: '0.5px solid #1a4a1a', color: '#4a8a4a', padding: '6px 12px', fontSize: '9px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#0a1a0a'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            Activar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => router.patch(route('lookbook.desactivar', lookbook.id))}
                                            style={{ background: 'transparent', border: '0.5px solid #3a3a00', color: '#7a7a00', padding: '6px 12px', fontSize: '9px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#1a1a00'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            Desactivar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => router.get(route('lookbook.edit', lookbook.id))}
                                        style={{ background: 'transparent', border: '0.5px solid #2a2a2a', color: '#666', padding: '6px 12px', fontSize: '9px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#8B0000'; e.currentTarget.style.color = '#8B0000'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#666'; }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => { if (confirm('¿Eliminar este lookbook?')) router.delete(route('lookbook.destroy', lookbook.id)); }}
                                        style={{ background: 'transparent', border: '0.5px solid #3a0000', color: '#8B0000', padding: '6px 12px', fontSize: '9px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#8B0000'; e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B0000'; }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
