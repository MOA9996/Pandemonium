import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
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
            <Head title="Recuperar contraseña" />
            <style>{`
                .btn-forgot:hover { background: #8B0000 !important; color: #fff !important; }
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px #0f0f0f inset !important;
                    -webkit-text-fill-color: #ccc !important;
                }
            `}</style>

            <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>

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

                    <div style={{ border: '0.5px solid #1a0000', padding: '2rem', background: '#0a0a0a' }}>

                        <p style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                            Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
                        </p>

                        {status && (
                            <div style={{ color: '#888', fontSize: '11px', letterSpacing: '0.05em', padding: '8px 12px', border: '0.5px solid #1a1a1a', background: '#111', marginBottom: '1.5rem' }}>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            <div>
                                <label style={labelStyle}>Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    autoFocus
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#8B0000'}
                                    onBlur={e => e.target.style.borderColor = '#2a0000'}
                                />
                                {errors.email && <p style={{ color: '#8B0000', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link
                                    href={route('login')}
                                    style={{ color: '#444', fontSize: '10px', letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.target.style.color = '#8B0000'}
                                    onMouseLeave={e => e.target.style.color = '#444'}
                                >
                                    ← Volver al login
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-forgot"
                                    style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '10px 24px', fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.2em', cursor: processing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
                                >
                                    {processing ? '...' : 'Enviar enlace'}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}
