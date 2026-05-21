import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const inputStyle = {
    background: '#0f0f0f',
    border: '0.5px solid #2a0000',
    color: '#ccc',
    padding: '10px 14px',
    width: '100%',
    fontSize: '13px',
    letterSpacing: '0.03em',
    outline: 'none',
    boxSizing: 'border-box',
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
    letterSpacing: '0.05em',
};

function SelectConAnadir({ label, tipo, opciones, value, onChange, error }) {
    const [añadiendo, setAñadiendo] = useState(false);
    const [nuevo, setNuevo] = useState('');
    const [guardando, setGuardando] = useState(false);

    const handleAnadir = async () => {
        if (!nuevo.trim()) return;
        setGuardando(true);
        await router.post(route('opciones.store'), { tipo, valor: nuevo.trim() }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => { setGuardando(false); setAñadiendo(false); setNuevo(''); },
        });
    };

    return (
        <div>
            <label style={labelStyle}>{label}</label>
            <div style={{ display: 'flex', gap: '8px' }}>
                <select
                    value={value}
                    onChange={onChange}
                    style={{ ...inputStyle, flex: 1, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = '#8B0000'}
                    onBlur={e => e.target.style.borderColor = '#2a0000'}
                >
                    <option value="">— Selecciona {label.toLowerCase()} —</option>
                    {(opciones || []).map(o => <option key={o.id} value={o.valor}>{o.valor}</option>)}
                </select>
                <button
                    type="button"
                    onClick={() => setAñadiendo(!añadiendo)}
                    style={{ background: 'transparent', border: '0.5px solid #2a0000', color: '#555', padding: '0 14px', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.target.style.borderColor = '#8B0000'; e.target.style.color = '#8B0000'; }}
                    onMouseLeave={e => { e.target.style.borderColor = '#2a0000'; e.target.style.color = '#555'; }}
                    title={`Añadir ${label.toLowerCase()}`}
                >
                    +
                </button>
            </div>
            {añadiendo && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <input
                        type="text"
                        value={nuevo}
                        onChange={e => setNuevo(e.target.value)}
                        placeholder={`Nueva ${label.toLowerCase()}...`}
                        style={{ ...inputStyle, flex: 1 }}
                        onKeyDown={e => e.key === 'Enter' && handleAnadir()}
                        onFocus={e => e.target.style.borderColor = '#8B0000'}
                        onBlur={e => e.target.style.borderColor = '#2a0000'}
                    />
                    <button
                        type="button"
                        onClick={handleAnadir}
                        disabled={guardando}
                        style={{ background: '#8B0000', border: 'none', color: '#fff', padding: '0 16px', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.1em' }}
                    >
                        {guardando ? '...' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setAñadiendo(false); setNuevo(''); }}
                        style={{ background: 'transparent', border: '0.5px solid #2a0000', color: '#555', padding: '0 12px', cursor: 'pointer', fontSize: '11px' }}
                    >
                        ✕
                    </button>
                </div>
            )}
            {error && <p style={errorStyle}>{error}</p>}
        </div>
    );
}

export default function Create({ opciones }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '', descripcion: '', precio: '',
        talla: '', color: '', corte: '', categoria: '', coleccion: '',
        imagenes: [],
    });

    const [previews, setPreviews] = useState([]);

    const handleImagenes = (e) => {
        const files = Array.from(e.target.files);
        setData('imagenes', [...data.imagenes, ...files]);
        setPreviews([...previews, ...files.map(f => URL.createObjectURL(f))]);
    };

    const quitarImagen = (index) => {
        setData('imagenes', data.imagenes.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('prendas.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>

                <button
                    onClick={() => router.get(route('prendas.index'))}
                    style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', textTransform: 'uppercase', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#8B0000'}
                    onMouseLeave={e => e.target.style.color = '#555'}
                >
                    ← Volver al catálogo
                </button>

                <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '20px', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                    Nueva Prenda
                </h1>
                <div style={{ textAlign: 'left', color: '#8B0000', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '2rem' }}>
                    — ✦ —
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* NOMBRE */}
                    <div>
                        <label style={labelStyle}>Nombre *</label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}

                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = '#8B0000'}
                            onBlur={e => e.target.style.borderColor = '#2a0000'}
                        />
                        {errors.nombre && <p style={errorStyle}>{errors.nombre}</p>}
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div>
                        <label style={labelStyle}>Descripción</label>
                        <textarea
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}

                            style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                            onFocus={e => e.target.style.borderColor = '#8B0000'}
                            onBlur={e => e.target.style.borderColor = '#2a0000'}
                        />
                    </div>

                    {/* PRECIO */}
                    <div>
                        <label style={labelStyle}>Precio (€) *</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.precio}
                            onChange={e => setData('precio', e.target.value)}

                            style={{ ...inputStyle, appearance: 'textfield' }}
                            onFocus={e => e.target.style.borderColor = '#8B0000'}
                            onBlur={e => e.target.style.borderColor = '#2a0000'}
                        />
                        {errors.precio && <p style={errorStyle}>{errors.precio}</p>}
                    </div>

                    {/* SEPARADOR */}
                    <div style={{ borderTop: '0.5px solid #1a0000' }} />

                    {/* SELECTS */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <SelectConAnadir label="Talla" tipo="talla" opciones={opciones?.talla} value={data.talla} onChange={e => setData('talla', e.target.value)} error={errors.talla} />
                        <SelectConAnadir label="Color" tipo="color" opciones={opciones?.color} value={data.color} onChange={e => setData('color', e.target.value)} error={errors.color} />
                        <SelectConAnadir label="Corte" tipo="corte" opciones={opciones?.corte} value={data.corte} onChange={e => setData('corte', e.target.value)} error={errors.corte} />
                        <SelectConAnadir label="Categoría" tipo="categoria" opciones={opciones?.categoria} value={data.categoria} onChange={e => setData('categoria', e.target.value)} error={errors.categoria} />
                    </div>

                    <SelectConAnadir label="Colección" tipo="coleccion" opciones={opciones?.coleccion} value={data.coleccion} onChange={e => setData('coleccion', e.target.value)} error={errors.coleccion} />

                    {/* SEPARADOR */}
                    <div style={{ borderTop: '0.5px solid #1a0000' }} />

                    {/* IMÁGENES */}
                    <div>
                        <label style={labelStyle}>Imágenes</label>
                        <p style={{ color: '#444', fontSize: '11px', letterSpacing: '0.03em', marginBottom: '10px' }}>
                            La primera imagen será la principal en el catálogo. Puedes añadir varias.
                        </p>
                        <label
                            style={{ display: 'block', border: '0.5px dashed #2a0000', padding: '20px', textAlign: 'center', cursor: 'pointer', color: '#444', fontSize: '11px', letterSpacing: '0.1em', transition: 'border-color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = '#8B0000'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a0000'}
                        >
                            + Seleccionar imágenes
                            <input type="file" accept="image/*" multiple onChange={handleImagenes} style={{ display: 'none' }} />
                        </label>

                        {previews.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '12px' }}>
                                {previews.map((src, i) => (
                                    <div key={i} style={{ position: 'relative' }}
                                         onMouseEnter={e => e.currentTarget.querySelector('.btn-quitar').style.opacity = '1'}
                                         onMouseLeave={e => e.currentTarget.querySelector('.btn-quitar').style.opacity = '0'}
                                    >
                                        <img src={src} alt={`Preview ${i + 1}`} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block', border: '0.5px solid #1a0000' }} />
                                        {i === 0 && (
                                            <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: '#8B0000', color: '#fff', fontSize: '9px', padding: '2px 6px', letterSpacing: '0.1em' }}>
                                                PRINCIPAL
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            className="btn-quitar"
                                            onClick={() => quitarImagen(i)}
                                            style={{ position: 'absolute', top: '6px', right: '6px', background: '#8B0000', color: '#fff', border: 'none', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.imagenes && <p style={errorStyle}>{errors.imagenes}</p>}
                    </div>

                    {/* BOTÓN */}
                    <button
                        type="submit"
                        disabled={processing}
                        style={{ background: processing ? '#1a0000' : 'transparent', border: '0.5px solid #8B0000', color: '#8B0000', padding: '14px', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', cursor: processing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', marginTop: '8px' }}
                        onMouseEnter={e => { if (!processing) e.target.style.background = '#8B0000'; if (!processing) e.target.style.color = '#fff'; }}
                        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#8B0000'; }}
                    >
                        {processing ? 'Guardando...' : 'Crear prenda'}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
