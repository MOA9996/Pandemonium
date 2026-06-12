import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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

function NuevoUsuarioForm({ onCancel }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'admin',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.usuarios.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div style={{ border: '0.5px solid #1a0000', padding: '1.5rem', background: '#0a0a0a', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', color: '#ddd', fontSize: '13px', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>Nuevo usuario</h2>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label style={labelStyle}>Nombre</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                               style={inputStyle}
                               onFocus={e => e.target.style.borderColor = '#8B0000'}
                               onBlur={e => e.target.style.borderColor = '#2a0000'} />
                        {errors.name && <p style={{ color: '#8B0000', fontSize: '11px', marginTop: '4px' }}>{errors.name}</p>}
                    </div>
                    <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                               style={inputStyle}
                               onFocus={e => e.target.style.borderColor = '#8B0000'}
                               onBlur={e => e.target.style.borderColor = '#2a0000'} />
                        {errors.email && <p style={{ color: '#8B0000', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
                    </div>
                    <div>
                        <label style={labelStyle}>Contraseña</label>
                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)}
                               style={inputStyle}
                               onFocus={e => e.target.style.borderColor = '#8B0000'}
                               onBlur={e => e.target.style.borderColor = '#2a0000'} />
                        {errors.password && <p style={{ color: '#8B0000', fontSize: '11px', marginTop: '4px' }}>{errors.password}</p>}
                    </div>
                    <div>
                        <label style={labelStyle}>Rol</label>
                        <select value={data.role} onChange={e => setData('role', e.target.value)}
                                style={{ ...inputStyle, cursor: 'pointer' }}
                                onFocus={e => e.target.style.borderColor = '#8B0000'}
                                onBlur={e => e.target.style.borderColor = '#2a0000'}>
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={onCancel}
                            style={{ background: 'transparent', border: '0.5px solid #2a0000', color: '#555', padding: '8px 20px', fontSize: '10px', letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.target.style.borderColor = '#8B0000'; e.target.style.color = '#8B0000'; }}
                            onMouseLeave={e => { e.target.style.borderColor = '#2a0000'; e.target.style.color = '#555'; }}>
                        Cancelar
                    </button>
                    <button type="submit" disabled={processing}
                            style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '8px 20px', fontSize: '10px', letterSpacing: '0.1em', cursor: processing ? 'not-allowed' : 'pointer', textTransform: 'uppercase', fontFamily: 'Cinzel, serif', transition: 'all 0.2s' }}
                            onMouseEnter={e => { if (!processing) { e.target.style.background = '#8B0000'; e.target.style.color = '#fff'; } }}
                            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#8B0000'; }}>
                        {processing ? '...' : 'Crear usuario'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function Usuarios({ usuarios }) {
    const [creando, setCreando] = useState(false);

    const eliminar = (id) => {
        if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;
        router.delete(route('admin.usuarios.destroy', id));
    };

    const labelStyle2 = {
        color: '#555',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
    };

    const badgeStyle = (role) => ({
        display: 'inline-block',
        padding: '2px 10px',
        fontSize: '9px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        border: role === 'admin' ? '0.5px solid #8B0000' : '0.5px solid #333',
        color: role === 'admin' ? '#8B0000' : '#555',
    });

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

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em' }}>
                        Usuarios
                    </h1>
                    {!creando && (
                        <button
                            onClick={() => setCreando(true)}
                            style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '8px 18px', fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.15em', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.target.style.background = '#8B0000'; e.target.style.color = '#fff'; }}
                            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#8B0000'; }}
                        >
                            + Nuevo usuario
                        </button>
                    )}
                </div>
                <div style={{ color: '#8B0000', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2rem' }}>— ✦ —</div>

                {creando && <NuevoUsuarioForm onCancel={() => setCreando(false)} />}

                {usuarios.length === 0 ? (
                    <p style={{ color: '#444', fontSize: '13px' }}>No hay usuarios registrados.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ borderBottom: '0.5px solid #1a0000' }}>
                            {['#', 'Nombre', 'Email', 'Rol', 'Compras', 'Registro', 'Acciones'].map(h => (
                                <th key={h} style={{ ...labelStyle2, padding: '8px 12px', textAlign: 'left' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.map((u, i) => (
                            <tr key={u.id} style={{ background: i % 2 === 0 ? '#111' : '#141414', borderBottom: '0.5px solid #1a0000' }}>
                                <td style={{ padding: '10px 12px', color: '#444', fontSize: '12px' }}>{u.id}</td>
                                <td style={{ padding: '10px 12px', color: '#ccc', fontSize: '12px' }}>{u.name}</td>
                                <td style={{ padding: '10px 12px', color: '#888', fontSize: '12px' }}>{u.email}</td>
                                <td style={{ padding: '10px 12px' }}><span style={badgeStyle(u.role)}>{u.role}</span></td>
                                <td style={{ padding: '10px 12px', color: '#555', fontSize: '12px', textAlign: 'center' }}>{u.compras_count}</td>
                                <td style={{ padding: '10px 12px', color: '#555', fontSize: '11px' }}>{new Date(u.created_at).toLocaleDateString('es-ES')}</td>
                                <td style={{ padding: '10px 12px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => router.get(route('admin.usuarios.edit', u.id))}
                                                style={{ background: 'transparent', border: '0.5px solid #2a0000', color: '#888', padding: '4px 12px', fontSize: '10px', letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s' }}
                                                onMouseEnter={e => { e.target.style.borderColor = '#8B0000'; e.target.style.color = '#8B0000'; }}
                                                onMouseLeave={e => { e.target.style.borderColor = '#2a0000'; e.target.style.color = '#888'; }}>
                                            Editar
                                        </button>
                                        <button onClick={() => eliminar(u.id)}
                                                style={{ background: 'transparent', border: '0.5px solid #2a0000', color: '#555', padding: '4px 12px', fontSize: '10px', letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s' }}
                                                onMouseEnter={e => { e.target.style.borderColor = '#8B0000'; e.target.style.color = '#8B0000'; }}
                                                onMouseLeave={e => { e.target.style.borderColor = '#2a0000'; e.target.style.color = '#555'; }}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
