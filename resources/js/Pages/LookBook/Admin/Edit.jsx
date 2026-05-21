import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const inputStyle = {
    background: '#0f0f0f', border: '0.5px solid #2a0000', color: '#ccc',
    padding: '10px 14px', width: '100%', fontSize: '13px', letterSpacing: '0.03em',
    outline: 'none', boxSizing: 'border-box',
};
const labelStyle = {
    color: '#555', fontSize: '10px', letterSpacing: '0.2em',
    textTransform: 'uppercase', marginBottom: '6px', display: 'block',
};

export default function Edit({ lookbook }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        titulo: lookbook.titulo || '',
        descripcion: lookbook.descripcion || '',
        activo: lookbook.activo || false,
        fotos: [],
        fotos_eliminar: [],
    });

    const [previews, setPreviews] = useState([]);
    const [fotosExistentes, setFotosExistentes] = useState(lookbook.fotos || []);

    const handleFotos = (e) => {
        const files = Array.from(e.target.files);
        setData('fotos', [...data.fotos, ...files]);
        setPreviews([...previews, ...files.map(f => URL.createObjectURL(f))]);
    };

    const quitarNueva = (index) => {
        setData('fotos', data.fotos.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const marcarEliminar = (fotoId) => {
        setFotosExistentes(fotosExistentes.filter(f => f.id !== fotoId));
        setData('fotos_eliminar', [...data.fotos_eliminar, fotoId]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('lookbook.update', lookbook.id), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>
                <button
                    onClick={() => router.get(route('lookbook.admin'))}
                    style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', textTransform: 'uppercase', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#8B0000'}
                    onMouseLeave={e => e.target.style.color = '#555'}
                >
                    ← Volver a lookbooks
                </button>

                <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                    Editar Lookbook
                </h1>
                <div style={{ color: '#8B0000', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2rem' }}>— ✦ —</div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div>
                        <label style={labelStyle}>Título de la colección *</label>
                        <input type="text" value={data.titulo} onChange={e => setData('titulo', e.target.value)} style={inputStyle}
                               onFocus={e => e.target.style.borderColor = '#8B0000'} onBlur={e => e.target.style.borderColor = '#2a0000'} />
                        {errors.titulo && <p style={{ color: '#8B0000', fontSize: '11px', marginTop: '4px' }}>{errors.titulo}</p>}
                    </div>

                    <div>
                        <label style={labelStyle}>Descripción</label>
                        <textarea value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} rows={3}
                                  style={{ ...inputStyle, resize: 'vertical' }}
                                  onFocus={e => e.target.style.borderColor = '#8B0000'} onBlur={e => e.target.style.borderColor = '#2a0000'} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type="checkbox" id="activo" checked={data.activo} onChange={e => setData('activo', e.target.checked)}
                               style={{ accentColor: '#8B0000', width: '14px', height: '14px' }} />
                        <label htmlFor="activo" style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                            Lookbook activo
                        </label>
                    </div>

                    <div style={{ borderTop: '0.5px solid #1a0000' }} />

                    {fotosExistentes.length > 0 && (
                        <div>
                            <label style={labelStyle}>Fotos actuales</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                {fotosExistentes.map(foto => (
                                    <div key={foto.id} style={{ position: 'relative' }}
                                         onMouseEnter={e => e.currentTarget.querySelector('.btn-q').style.opacity = '1'}
                                         onMouseLeave={e => e.currentTarget.querySelector('.btn-q').style.opacity = '0'}
                                    >
                                        <img src={`/storage/${foto.imagen}`} alt="Foto" style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block', border: '0.5px solid #1a0000' }} />
                                        <button type="button" className="btn-q" onClick={() => marcarEliminar(foto.id)}
                                                style={{ position: 'absolute', top: '6px', right: '6px', background: '#8B0000', color: '#fff', border: 'none', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px', opacity: 0, transition: 'opacity 0.2s' }}>
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <label style={labelStyle}>Añadir más fotos</label>
                        <label
                            style={{ display: 'block', border: '0.5px dashed #2a0000', padding: '20px', textAlign: 'center', cursor: 'pointer', color: '#444', fontSize: '11px', letterSpacing: '0.1em', transition: 'border-color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = '#8B0000'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a0000'}
                        >
                            + Seleccionar fotos
                            <input type="file" accept="image/*" multiple onChange={handleFotos} style={{ display: 'none' }} />
                        </label>

                        {previews.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '12px' }}>
                                {previews.map((src, i) => (
                                    <div key={i} style={{ position: 'relative' }}
                                         onMouseEnter={e => e.currentTarget.querySelector('.btn-q').style.opacity = '1'}
                                         onMouseLeave={e => e.currentTarget.querySelector('.btn-q').style.opacity = '0'}
                                    >
                                        <img src={src} alt={`Nueva ${i + 1}`} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block', border: '0.5px solid #1a0000' }} />
                                        <button type="button" className="btn-q" onClick={() => quitarNueva(i)}
                                                style={{ position: 'absolute', top: '6px', right: '6px', background: '#8B0000', color: '#fff', border: 'none', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px', opacity: 0, transition: 'opacity 0.2s' }}>
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={processing}
                            style={{ background: 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '14px', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', cursor: processing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
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
