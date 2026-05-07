import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Compras({ compras }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Mis compras</h1>

                {compras.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">Aún no has realizado ninguna compra.</p>
                        <button
                            onClick={() => router.get(route('prendas.index'))}
                            className="bg-black text-white px-6 py-2 rounded"
                        >
                            Ver catálogo
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {compras.map(compra => (
                            <div key={compra.id} className="flex items-center gap-4 border rounded-lg p-4">
                                {compra.prenda?.imagen ? (
                                    <img
                                        src={`/storage/${compra.prenda.imagen}`}
                                        alt={compra.prenda.nombre}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                                        Sin imagen
                                    </div>
                                )}

                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">
                                        {compra.prenda?.nombre ?? 'Prenda eliminada'}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {compra.prenda?.talla && `Talla: ${compra.prenda.talla} · `}
                                        {compra.prenda?.color && `Color: ${compra.prenda.color}`}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {new Date(compra.fecha_compra).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-bold text-lg">{compra.precio_pagado}€</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        compra.estado === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : compra.estado === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : compra.estado === 'refunded'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                        {compra.estado === 'paid' && 'Pagado'}
                                        {compra.estado === 'pending' && 'Pendiente'}
                                        {compra.estado === 'refunded' && 'Devuelto'}
                                        {compra.estado === 'failed' && 'Fallido'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
