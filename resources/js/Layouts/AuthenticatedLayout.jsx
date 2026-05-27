import Dropdown from '@/Components/Dropdown';
import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth?.user;
    const carritoCount = usePage().props.carritoCount;
    const { flash, errors } = usePage().props;

    const [menuAbierto, setMenuAbierto] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setMensaje({ tipo: 'success', texto: flash.success });
            const t = setTimeout(() => setMensaje(null), 3000);
            return () => clearTimeout(t);
        }
        if (flash?.error) {
            setMensaje({ tipo: 'error', texto: flash.error });
            const t = setTimeout(() => setMensaje(null), 3000);
            return () => clearTimeout(t);
        }
        if (errors?.message) {
            setMensaje({ tipo: 'error', texto: errors.message });
            const t = setTimeout(() => setMensaje(null), 3000);
            return () => clearTimeout(t);
        }
    }, [flash?.success, flash?.error, errors?.message]);

    return (
        <div style={{ minHeight: '100vh', background: '#080808' }}>
            <style>{`
                .nav-link:hover { color: #fff !important; }
                .nav-link { transition: color 0.2s; }
                .carrito-btn:hover svg { stroke: #8B0000; }
                .dropdown-item:hover { background: #0f0000 !important; color: #fff !important; }
            `}</style>

            {/* NAVBAR */}
            <nav style={{ background: '#0a0a0a', borderBottom: '0.5px solid #1a0000', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>

                    {/* LOGO */}
                    <Link
                        href="/"
                        style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '16px', letterSpacing: '0.25em', textDecoration: 'none' }}
                    >
                        PANDEMONIUM
                    </Link>

                    {/* NAV LINKS */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <Link
                            href={route('prendas.index')}
                            className="nav-link"
                            style={{ color: '#666', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}
                        >
                            Catálogo
                        </Link>

                        {/* CARRITO */}
                        {user && (
                            <button
                                className="carrito-btn"
                                onClick={() => router.get(route('carrito.index'))}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '4px' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', stroke: '#666', fill: 'none', transition: 'stroke 0.2s' }} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {carritoCount > 0 && (
                                    <span style={{ position: 'absolute', top: '-2px', right: '-4px', background: '#8B0000', color: '#fff', fontSize: '9px', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {carritoCount}
                                    </span>
                                )}
                            </button>
                        )}

                        {/* USUARIO */}
                        {user ? (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        style={{ background: 'none', border: '0.5px solid #2a0000', color: '#666', fontSize: '10px', letterSpacing: '0.15em', padding: '6px 12px', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', transition: 'border-color 0.2s, color 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#8B0000'; e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a0000'; e.currentTarget.style.color = '#666'; }}
                                    >
                                        {user.name.toUpperCase()}
                                        <svg style={{ width: '10px', height: '10px', fill: 'currentColor' }} viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {user.role === 'admin' && (
                                        <Dropdown.Link href={route('admin.index')}>Panel admin</Dropdown.Link>
                                    )}
                                    <Dropdown.Link href={route('user.compras')}>Mis compras</Dropdown.Link>
                                    <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Cerrar sesión</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <Link
                                href={route('login')}
                                className="nav-link"
                                style={{ color: '#666', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}
                            >
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* FLASH */}
            {mensaje && (
                <div style={{
                    position: 'fixed', top: '1rem', right: '1rem', zIndex: 100,
                    padding: '12px 16px', fontSize: '12px', letterSpacing: '0.05em',
                    border: `0.5px solid ${mensaje.tipo === 'success' ? '#1a4a1a' : '#4a1a1a'}`,
                    background: mensaje.tipo === 'success' ? '#0a1a0a' : '#1a0a0a',
                    color: mensaje.tipo === 'success' ? '#4a8a4a' : '#8a4a4a',
                }}>
                    {mensaje.texto}
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}
