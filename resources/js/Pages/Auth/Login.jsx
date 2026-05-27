import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const inputStyle = {
        background: '#0f0f0f',
        border: '0.5px solid #2a0000',
        color: '#ccc',
        padding: '10px 14px',
        width: '100%',
        fontSize: '13px',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    };

    const labelStyle = {
        color: '#555',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '6px',
        display: 'block',
    };

    return (
        <>
            <Head title="Entrar" />
            <style>{`
                .btn-login:hover { background: #8B0000 !important; color: #fff !important; }
                .link-reset:hover { color: #8B0000 !important; }
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px #0f0f0f inset !important;
                    -webkit-text-fill-color: #ccc !important;
                }
            `}</style>

            <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>

                    {/* LOGO */}
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '24px', letterSpacing: '0.3em', margin: 0 }}>
                                PANDEMONIUM
                            </h1>
                        </Link>
                        <div style={{ color: '#8B0000', fontSize: '11px', letterSpacing: '0.4em', marginTop: '0.5rem' }}>
                            — ✦ —
                        </div>
                    </div>

                    {/* FORMULARIO */}
                    <div style={{ border: '0.5px solid #1a0000', padding: '2rem', background: '#0a0a0a' }}>

                        {status && (
                            <div style={{ color: '#4a8a4a', fontSize: '11px', letterSpacing: '0.05em', marginBottom: '1.5rem', padding: '8px 12px', border: '0.5px solid #1a4a1a', background: '#0a1a0a' }}>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            <div>
                                <label style={labelStyle}>Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    autoComplete="username"
                                    autoFocus
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#8B0000'}
                                    onBlur={e => e.target.style.borderColor = '#2a0000'}
                                />
                                {errors.email && <p style={{ color: '#8B0000', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
                            </div>

                            <div>
                                <label style={labelStyle}>Contraseña</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#8B0000'}
                                    onBlur={e => e.target.style.borderColor = '#2a0000'}
                                />
                                {errors.password && <p style={{ color: '#8B0000', fontSize: '11px', marginTop: '4px' }}>{errors.password}</p>}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    style={{ accentColor: '#8B0000', width: '14px', height: '14px' }}
                                />
                                <label htmlFor="remember" style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                                    Recordarme
                                </label>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="link-reset"
                                        style={{ color: '#444', fontSize: '10px', letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-login"
                                    style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '10px 24px', fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.2em', cursor: processing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                >
                                    {processing ? '...' : 'Entrar'}
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* REGISTRO */}
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <span style={{ color: '#333', fontSize: '10px', letterSpacing: '0.1em' }}>¿No tienes cuenta? </span>
                        <Link
                            href={route('register')}
                            style={{ color: '#555', fontSize: '10px', letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.target.style.color = '#8B0000'}
                            onMouseLeave={e => e.target.style.color = '#555'}
                        >
                            Regístrate
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
}
