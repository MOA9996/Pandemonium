import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminIndex({ lookbooks }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-5xl mx-auto py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Gestión de Lookbooks</h1>
                    <button
                        onClick={() => router.get(route('lookbook.create'))}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        + Nuevo lookbook
                    </button>
                </div>

                {lookbooks.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">No hay lookbooks creados aún.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {lookbooks.map(lookbook => (
                            <div key={lookbook.id} className="border rounded-lg p-4 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="font-semibold text-lg">{lookbook.titulo}</h2>
                                        {lookbook.activo && (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                                Activo
                                            </span>
                                        )}
                                    </div>
                                    {lookbook.descripcion && (
                                        <p className="text-gray-500 text-sm mt-1">{lookbook.descripcion}</p>
                                    )}
                                    <p className="text-gray-400 text-xs mt-1">{lookbook.fotos_count} fotos</p>
                                </div>

                                <div className="flex gap-2">
                                    {!lookbook.activo && (
                                        <button
                                            onClick={() => router.patch(route('lookbook.activar', lookbook.id))}
                                            className="border border-green-500 text-green-600 px-3 py-1 rounded text-sm"
                                        >
                                            Activar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            if (confirm('¿Eliminar este lookbook?')) {
                                                router.delete(route('lookbook.destroy', lookbook.id));
                                            }
                                        }}
                                        className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
