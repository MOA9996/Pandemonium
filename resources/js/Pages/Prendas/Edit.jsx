import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div className="flex gap-2">
                <select value={value} onChange={onChange} className="border rounded px-3 py-2 flex-1">
                    <option value="">Selecciona {label.toLowerCase()}</option>
                    {(opciones || []).map(o => <option key={o.id} value={o.valor}>{o.valor}</option>)}
                </select>
                <button type="button" onClick={() => setAñadiendo(!añadiendo)} className="border rounded px-3 py-2 text-gray-500 hover:bg-gray-50 transition">+</button>
            </div>
            {añadiendo && (
                <div className="flex gap-2 mt-2">
                    <input type="text" value={nuevo} onChange={e => setNuevo(e.target.value)} placeholder={`Nueva ${label.toLowerCase()}...`} className="border rounded px-3 py-2 flex-1 text-sm" onKeyDown={e => e.key === 'Enter' && handleAnadir()} />
                    <button type="button" onClick={handleAnadir} disabled={guardando} className="bg-black text-white px-3 py-2 rounded text-sm">{guardando ? '...' : 'Guardar'}</button>
                    <button type="button" onClick={() => { setAñadiendo(false); setNuevo(''); }} className="border rounded px-3 py-2 text-sm text-gray-500">Cancelar</button>
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

export default function Edit({ prenda, opciones }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        nombre: prenda.nombre || '',
        descripcion: prenda.descripcion || '',
        precio: prenda.precio || '',
        talla: prenda.talla || '',
        color: prenda.color || '',
        corte: prenda.corte || '',
        categoria: prenda.categoria || '',
        coleccion: prenda.coleccion || '',
        imagenes: [],
        imagenes_eliminar: [],
    });

    const [nuevasPreviews, setNuevasPreviews] = useState([]);
    const [imagenesExistentes, setImagenesExistentes] = useState(prenda.imagenes || []);

    const handleImagenes = (e) => {
        const files = Array.from(e.target.files);
        setData('imagenes', [...data.imagenes, ...files]);
        setNuevasPreviews([...nuevasPreviews, ...files.map(f => URL.createObjectURL(f))]);
    };

    const quitarNueva = (index) => {
        setData('imagenes', data.imagenes.filter((_, i) => i !== index));
        setNuevasPreviews(nuevasPreviews.filter((_, i) => i !== index));
    };

    const marcarEliminar = (imgId) => {
        setImagenesExistentes(imagenesExistentes.filter(i => i.id !== imgId));
        setData('imagenes_eliminar', [...data.imagenes_eliminar, imgId]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('prendas.update', prenda.id), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto py-6 px-4">
                <button onClick={() => router.get(route('prendas.show', prenda.id))} className="text-sm text-gray-500 underline mb-6 block">← Volver a la prenda</button>
                <h1 className="text-2xl font-bold mb-6">Editar Prenda</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input type="text" value={data.nombre} onChange={e => setData('nombre', e.target.value)} className="border rounded px-3 py-2 w-full" />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descripción</label>
                        <textarea value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} className="border rounded px-3 py-2 w-full" rows={3} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Precio (€)</label>
                        <input type="number" step="0.01" value={data.precio} onChange={e => setData('precio', e.target.value)} className="border rounded px-3 py-2 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
                    </div>

                    <SelectConAnadir label="Talla" tipo="talla" opciones={opciones?.talla} value={data.talla} onChange={e => setData('talla', e.target.value)} error={errors.talla} />
                    <SelectConAnadir label="Color" tipo="color" opciones={opciones?.color} value={data.color} onChange={e => setData('color', e.target.value)} error={errors.color} />
                    <SelectConAnadir label="Corte" tipo="corte" opciones={opciones?.corte} value={data.corte} onChange={e => setData('corte', e.target.value)} error={errors.corte} />
                    <SelectConAnadir label="Categoría" tipo="categoria" opciones={opciones?.categoria} value={data.categoria} onChange={e => setData('categoria', e.target.value)} error={errors.categoria} />
                    <SelectConAnadir label="Colección" tipo="coleccion" opciones={opciones?.coleccion} value={data.coleccion} onChange={e => setData('coleccion', e.target.value)} error={errors.coleccion} />

                    {/* Imágenes existentes */}
                    {imagenesExistentes.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Imágenes actuales</label>
                            <div className="grid grid-cols-3 gap-2">
                                {imagenesExistentes.map((img, i) => (
                                    <div key={img.id} className="relative group">
                                        <img src={`/storage/${img.imagen}`} alt="Imagen" className="w-full h-32 object-cover rounded border" />
                                        {i === 0 && <span className="absolute bottom-1 left-1 bg-black text-white text-xs px-1 rounded">Principal</span>}
                                        <button type="button" onClick={() => marcarEliminar(img.id)} className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-bold">✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Añadir nuevas imágenes */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Añadir imágenes</label>
                        <input type="file" accept="image/*" multiple onChange={handleImagenes} className="border rounded px-3 py-2 w-full" />
                        {nuevasPreviews.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {nuevasPreviews.map((src, i) => (
                                    <div key={i} className="relative group">
                                        <img src={src} alt={`Nueva ${i + 1}`} className="w-full h-32 object-cover rounded border" />
                                        <button type="button" onClick={() => quitarNueva(i)} className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-bold">✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={processing} className="bg-black text-white px-6 py-2 rounded mt-2">
                        {processing ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
