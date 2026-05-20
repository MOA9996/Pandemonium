import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
        const newFiles = [...data.fotos, ...files];
        const newPreviews = [...previews, ...files.map(f => URL.createObjectURL(f))];
        setData('fotos', newFiles);
        setPreviews(newPreviews);
    };

    const quitarNueva = (index) => {
        const newFiles = data.fotos.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setData('fotos', newFiles);
        setPreviews(newPreviews);
    };

    const marcarEliminar = (fotoId) => {
        setFotosExistentes(fotosExistentes.filter(f => f.id !== fotoId));
        setData('fotos_eliminar', [...data.fotos_eliminar, fotoId]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('lookbook.update', lookbook.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto py-6 px-4">
                <button
                    onClick={() => router.get(route('lookbook.admin'))}
                    className="text-sm text-gray-500 underline mb-6 block"
                >
                    ← Volver a lookbooks
                </button>

                <h1 className="text-2xl font-bold mb-6">Editar Lookbook</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Título de la colección</label>
                        <input
                            type="text"
                            value={data.titulo}
                            onChange={e => setData('titulo', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        />
                        {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo}</p>}
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

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="activo"
                            checked={data.activo}
                            onChange={e => setData('activo', e.target.checked)}
                        />
                        <label htmlFor="activo" className="text-sm">Lookbook activo</label>
                    </div>

                    {/* Fotos existentes */}
                    {fotosExistentes.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Fotos actuales</label>
                            <div className="grid grid-cols-3 gap-2">
                                {fotosExistentes.map(foto => (
                                    <div key={foto.id} className="relative group">
                                        <img
                                            src={`/storage/${foto.imagen}`}
                                            alt="Foto"
                                            className="w-full h-32 object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => marcarEliminar(foto.id)}
                                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-bold"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Añadir nuevas fotos */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Añadir más fotos</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFotos}
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    {previews.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                            {previews.map((src, i) => (
                                <div key={i} className="relative group">
                                    <img
                                        src={src}
                                        alt={`Nueva ${i + 1}`}
                                        className="w-full h-32 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => quitarNueva(i)}
                                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-bold"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-black text-white px-6 py-2 rounded mt-2"
                    >
                        {processing ? 'Guardando...' : 'Guardar cambios'}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
