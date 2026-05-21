import { router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ prendas, filtros, opciones, auth }) {
    const [form, setForm] = useState({
        talla: filtros.talla || '',
        color: filtros.color || '',
        corte: filtros.corte || '',
        categoria: filtros.categoria || '',
        precio_max: filtros.precio_max || '',
        coleccion: filtros.coleccion || '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(route('prendas.index'), form, { preserveState: true });
    };

    const limpiarFiltros = () => {
        router.get(route('prendas.index'));
    };

    const selectStyle = {
        border: '0.5px solid #3a0000',
        color: '#888',
        background: '#0f0000',
        padding: '7px 14px',
        fontSize: '11px',
        letterSpacing: '0.08em',
        cursor: 'pointer',
        transition: 'border-color 0.2s, color 0.2s',
        minWidth: '180px',
    };

    return (
        <AuthenticatedLayout>
            <style>{`
                .filtro-select:hover { border-color: #8B0000 !important; color: #bbb !important; }
                .filtro-input:hover { border-color: #8B0000 !important; color: #bbb !important; }
                .btn-filtrar:hover { background: #8B0000 !important; color: #fff !important; }
                .btn-limpiar:hover { border-color: #8B0000 !important; color: #8B0000 !important; }
                .btn-nueva:hover { background: #8B0000 !important; color: #fff !important; }
                .prenda-card:hover .card-nombre { color: #fff !important; }
                .prenda-card:hover .card-precio { color: #c00 !important; }
                .pag-btn:hover { border-color: #8B0000 !important; color: #8B0000 !important; }
            `}</style>

            <div style={{ background: '#080808', minHeight: '100vh', padding: '2rem 1rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* CABECERA */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '22px', letterSpacing: '0.2em', margin: 0 }}>
                            Catálogo
                        </h1>
                        {auth.user?.role === 'admin' && (
                            <button
                                className="btn-nueva"
                                onClick={() => router.get(route('prendas.create'))}
                                style={{ border: '0.5px solid #8B0000', color: '#8B0000', background: 'transparent', padding: '8px 16px', fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s' }}
                            >
                                + Nueva prenda
                            </button>
                        )}
                    </div>

                    {/* SEPARADOR */}
                    <div style={{ textAlign: 'center', color: '#8B0000', fontSize: '12px', letterSpacing: '0.4em', margin: '0.5rem 0 1.5rem' }}>
                        — ✦ —
                    </div>

                    {/* FILTROS */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem', alignItems: 'center' }}>
                        {[
                            { name: 'talla', placeholder: 'Tallas', opts: opciones?.talla },
                            { name: 'color', placeholder: 'Colores', opts: opciones?.color },
                            { name: 'corte', placeholder: 'Cortes', opts: opciones?.corte },
                            { name: 'categoria', placeholder: 'Categorías', opts: opciones?.categoria },
                            { name: 'coleccion', placeholder: 'Colecciones', opts: opciones?.coleccion },
                        ].map(({ name, placeholder, opts }) => (
                            <select
                                key={name}
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                className="filtro-select"
                                style={selectStyle}
                            >
                                <option value="">{placeholder}</option>
                                {(opts || []).map(o => (
                                    <option key={o.id} value={o.valor}>{o.valor}</option>
                                ))}
                            </select>
                        ))}

                        <input
                            type="number"
                            name="precio_max"
                            placeholder="Precio máx."
                            value={form.precio_max}
                            onChange={handleChange}
                            className="filtro-input"
                            style={{ ...selectStyle, width: '130px', appearance: 'textfield', minWidth: 'unset' }}
                        />

                        <button
                            type="submit"
                            className="btn-filtrar"
                            style={{ border: '0.5px solid #8B0000', color: '#8B0000', background: 'transparent', padding: '7px 18px', fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            Filtrar
                        </button>
                        <button
                            type="button"
                            onClick={limpiarFiltros}
                            className="btn-limpiar"
                            style={{ border: '0.5px solid #3a0000', color: '#666', background: 'transparent', padding: '7px 18px', fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            Limpiar
                        </button>
                    </form>

                    {/* LISTADO */}
                    {prendas.data.length === 0 ? (
                        <p style={{ color: '#555', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em', textAlign: 'center', marginTop: '3rem' }}>
                            No se encontraron prendas con esos filtros.
                        </p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: '#111' }}>
                            {prendas.data.map(prenda => {
                                const imagen = prenda.imagenes?.[0]?.imagen || prenda.imagen;
                                return (
                                    <div
                                        key={prenda.id}
                                        className="prenda-card"
                                        onClick={() => router.get(route('prendas.show', prenda.id))}
                                        style={{ background: '#0a0a0a', cursor: 'pointer', transition: 'background 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
                                    >
                                        {imagen ? (
                                            <img src={`/storage/${imagen}`} alt={prenda.nombre} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block', borderBottom: '0.5px solid #111' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '280px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2a2a2a', fontSize: '11px' }}>Sin imagen</div>
                                        )}
                                        <div style={{ padding: '14px 12px' }}>
                                            <div className="card-nombre" style={{ fontFamily: 'Cinzel, serif', color: '#ddd', fontSize: '12px', letterSpacing: '0.08em', marginBottom: '4px', transition: 'color 0.2s' }}>
                                                {prenda.nombre}
                                            </div>
                                            <div style={{ color: '#444', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                                {[prenda.coleccion, prenda.talla].filter(Boolean).join(' · ')}
                                            </div>
                                            <div className="card-precio" style={{ color: '#8B0000', fontFamily: 'Cinzel, serif', fontSize: '13px', transition: 'color 0.2s' }}>
                                                {prenda.precio}€
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* PAGINACIÓN */}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '2rem', justifyContent: 'center' }}>
                        {prendas.links.map((link, i) => (
                            <button
                                key={i}
                                className="pag-btn"
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                style={{
                                    border: link.active ? '0.5px solid #8B0000' : '0.5px solid #2a0000',
                                    color: link.active ? '#8B0000' : '#555',
                                    background: 'transparent',
                                    padding: '4px 12px',
                                    fontSize: '10px',
                                    letterSpacing: '0.1em',
                                    cursor: link.url ? 'pointer' : 'default',
                                    opacity: link.url ? 1 : 0.3,
                                    transition: 'all 0.2s',
                                }}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', color: '#3a0000', fontSize: '14px', letterSpacing: '0.6em', marginTop: '2rem' }}>
                        ⸻ ✦ ⸻
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
