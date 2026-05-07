import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        talla: '',
        color: '',
        corte: '',
        categoria: '',
        imagen: null,
    });

    const [preview, setPreview] = useState(null);

    const handleImagen = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('imagen', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const quitarImagen = () => {
        setData('imagen', null);
        setPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('prendas.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Nueva Prenda</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descripción</label>
                        <textarea
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Precio (€)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.precio}
                            onChange={e => setData('precio', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        />
                        {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Talla</label>
                        <select
                            value={data.talla}
                            onChange={e => setData('talla', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        >
                            <option value="">Selecciona talla</option>
                            {['XS','S','M','L','XL','XXL'].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        {errors.talla && <p className="text-red-500 text-sm">{errors.talla}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Color</label>
                        <input
                            type="text"
                            value={data.color}
                            onChange={e => setData('color', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        />
                        {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Corte</label>
                        <select
                            value={data.corte}
                            onChange={e => setData('corte', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        >
                            <option value="">Selecciona corte</option>
                            {['slim','regular','oversize'].map(c => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                            ))}
                        </select>
                        {errors.corte && <p className="text-red-500 text-sm">{errors.corte}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Categoría</label>
                        <select
                            value={data.categoria}
                            onChange={e => setData('categoria', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        >
                            <option value="">Selecciona categoría</option>
                            {['camiseta','gorra','pantalón','vestido','chaqueta'].map(c => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                            ))}
                        </select>
                        {errors.categoria && <p className="text-red-500 text-sm">{errors.categoria}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Imagen</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImagen}
                            className="border rounded px-3 py-2 w-full"
                        />
                        {preview && (
                            <div className="mt-3">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={quitarImagen}
                                    className="mt-2 text-red-500 text-sm underline block"
                                >
                                    Quitar imagen
                                </button>
                            </div>
                        )}
                        {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-black text-white px-6 py-2 rounded mt-2"
                    >
                        {processing ? 'Guardando...' : 'Crear prenda'}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
