import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    return (
        <AuthenticatedLayout>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                    Panel de Administración
                </h1>
                <div style={{ color: '#8B0000', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2.5rem' }}>— ✦ —</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1a0000' }}>
                    {[
                        { titulo: 'Gestión de Pedidos', desc: 'Ver y gestionar todos los pedidos realizados.', ruta: 'admin.compras' },
                        { titulo: 'Lookbooks', desc: 'Crear y gestionar las colecciones del lookbook.', ruta: 'lookbook.admin' },
                        { titulo: 'Usuarios', desc: 'Ver, editar, crear y eliminar los usuarios registrados.', ruta: 'admin.usuarios' },
                    ].map(({ titulo, desc, ruta }) => (
                        <div
                            key={ruta}
                            onClick={() => router.get(route(ruta))}
                            style={{ background: '#0a0a0a', padding: '2rem', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#0f0000'}
                            onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
                        >
                            <div>
                                <h2 style={{ fontFamily: 'Cinzel, serif', color: '#ddd', fontSize: '14px', letterSpacing: '0.1em', marginBottom: '6px' }}>{titulo}</h2>
                                <p style={{ color: '#444', fontSize: '11px', letterSpacing: '0.05em', lineHeight: '1.6' }}>{desc}</p>
                            </div>
                            <div style={{ color: '#8B0000', fontSize: '20px', marginLeft: '2rem' }}>→</div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
