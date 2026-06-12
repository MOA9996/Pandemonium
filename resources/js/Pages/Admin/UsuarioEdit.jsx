import { useForm, router } from '@inertiajs/react';
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

const errorStyle = {
    color: '#8B0000',
    fontSize: '11px',
    marginTop: '4px',
};

export default function UsuarioEdit({ usuario }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: usuario.name || '',
        email: usuario.email || '',
        role: usuario.role || 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.usuarios.update', usuario.id));
    };

    return (
        <AuthenticatedLayout>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>

                <button
                    onClick={() => router.get(route('admin.usuarios'))}
                    style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', textTransform: 'uppercase', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#8B0000'}
                    onMouseLeave={e => e.target.style.color = '#555'}
                >
                    ← Volver a usuarios
                </button>

                <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                    Editar Usuario
                </h1>
                <div style={{ color: '#8B0000', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2rem' }}>— ✦ —</div>

                <div style={{ background: '#0a0a0a', border: '0.5px solid #1a0000', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <p style={{ color: '#444', fontSize: '11px', letterSpacing: '0.05em' }}>ID: {usuario.id}</p>
                    <p style={{ color: '#444', fontSize: '11px', letterSpacing: '0.05em', marginTop: '4px' }}>
                        Registrado: {new Date(usuario.created_at).toLocaleDateString('es-ES')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div>
                        <label style={labelStyle}>Nombre</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = '#8B0000'}
                            onBlur={e => e.target.style.borderColor = '#2a0000'}
                        />
                        {errors.name && <p style={errorStyle}>{errors.name}</p>}
                    </div>

                    <div>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = '#8B0000'}
                            onBlur={e => e.target.style.borderColor = '#2a0000'}
                        />
                        {errors.email && <p style={errorStyle}>{errors.email}</p>}
                    </div>

                    <div>
                        <label style={labelStyle}>Rol</label>
                        <select
                            value={data.role}
                            onChange={e => setData('role', e.target.value)}
                            style={{ ...inputStyle, cursor: 'pointer' }}
                            onFocus={e => e.target.style.borderColor = '#8B0000'}
                            onBlur={e => e.target.style.borderColor = '#2a0000'}
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                        {errors.role && <p style={errorStyle}>{errors.role}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '14px', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', cursor: processing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', marginTop: '8px' }}
                        onMouseEnter={e => { if (!processing) { e.target.style.background = '#8B0000'; e.target.style.color = '#fff'; } }}
                        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#8B0000'; }}
                    >
                        {processing ? 'Guardando...' : 'Guardar cambios'}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
