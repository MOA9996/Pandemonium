import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ carrito }) {
    const total = carrito.reduce((sum, item) => sum + parseFloat(item.precio), 0);

    const quitar = (prendaId) => {
        router.delete(route('carrito.quitar', prendaId));
    };

    const confirmar = () => {
        if (confirm('¿Confirmas la compra?')) {
            router.post(route('carrito.confirmar'));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Mi carrito</h1>

                {carrito.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">Tu carrito está vacío.</p>
                        <button
                            onClick={() => router.get(route('prendas.index'))}
                            className="bg-black text-white px-6 py-2 rounded"
                        >
                            Ver catálogo
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4 mb-8">
                            {carrito.map(item => (
                                <div key={item.prenda_id} className="flex items-center gap-4 border rounded-lg p-4">
                                    {item.imagen ? (
                                        <img
                                            src={`/storage/${item.imagen}`}
                                            alt={item.nombre}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                                            Sin imagen
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <h2 className="font-semibold text-lg">{item.nombre}</h2>
                                        <p className="text-sm text-gray-500">Talla: {item.talla} · Color: {item.color}</p>
                                        <p className="font-bold mt-1">{item.precio}€</p>
                                    </div>

                                    <button
                                        onClick={() => quitar(item.prenda_id)}
                                        className="text-red-500 text-sm underline"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 flex justify-between items-center">
                            <p className="text-xl font-bold">Total: {total.toFixed(2)}€</p>
                            <button
                                onClick={confirmar}
                                className="bg-black text-white px-8 py-3 rounded text-lg"
                            >
                                Confirmar compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
