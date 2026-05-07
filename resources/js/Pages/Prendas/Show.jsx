import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ prenda, auth }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto py-6 px-4">

                {/* BOTÓN VOLVER */}
                <button
                    onClick={() => router.get(route('prendas.index'))}
                    className="text-sm text-gray-500 underline mb-6 block"
                >
                    ← Volver al catálogo
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* IMAGEN */}
                    <div>
                        {prenda.imagen ? (
                            <img
                                src={`/storage/${prenda.imagen}`}
                                alt={prenda.nombre}
                                className="w-full h-auto object-cover rounded-lg border"
                            />
                        ) : (
                            <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                Sin imagen
                            </div>
                        )}
                    </div>

                    {/* DETALLES */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">{prenda.nombre}</h1>

                        <p className="text-2xl font-semibold">{prenda.precio}€</p>

                        {prenda.descripcion && (
                            <p className="text-gray-600">{prenda.descripcion}</p>
                        )}

                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                            <p><span className="font-medium">Talla:</span> {prenda.talla}</p>
                            <p><span className="font-medium">Color:</span> {prenda.color}</p>
                            <p><span className="font-medium">Corte:</span> {prenda.corte}</p>
                            <p><span className="font-medium">Categoría:</span> {prenda.categoria}</p>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                            {prenda.disponible ? (
                                <>
                                    {/* AÑADIR AL CARRITO */}
                                    <button
                                        onClick={() => router.post(route('carrito.añadir', prenda.id))}
                                        className="bg-black text-white px-6 py-3 rounded w-full text-lg"
                                    >
                                        Añadir al carrito
                                    </button>

                                    {/* COMPRAR DIRECTAMENTE */}
                                    <button
                                        onClick={() => {
                                            if (confirm('¿Confirmas la compra directa de esta prenda?')) {
                                                router.post(route('carrito.añadir', prenda.id), {}, {
                                                    onSuccess: () => router.post(route('carrito.confirmar')),
                                                });
                                            }
                                        }}
                                        className="border border-black text-black px-6 py-3 rounded w-full text-lg"
                                    >
                                        Comprar ahora
                                    </button>
                                </>
                            ) : (
                                <button
                                    disabled
                                    className="bg-gray-300 text-gray-500 px-6 py-3 rounded w-full text-lg cursor-not-allowed"
                                >
                                    No disponible
                                </button>
                            )}

                            {/* BOTONES ADMIN */}
                            {auth.user.role === 'admin' && (
                                <>
                                    <button
                                        onClick={() => router.get(route('prendas.edit', prenda.id))}
                                        className="border border-gray-400 text-gray-600 px-6 py-3 rounded w-full text-lg"
                                    >
                                        Editar prenda
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('¿Seguro que quieres eliminar esta prenda?')) {
                                                router.delete(route('prendas.destroy', prenda.id));
                                            }
                                        }}
                                        className="border border-red-500 text-red-500 px-6 py-3 rounded w-full text-lg"
                                    >
                                        Eliminar prenda
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
