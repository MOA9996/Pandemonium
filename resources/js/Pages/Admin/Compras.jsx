import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Compras({ compras }) {
    const total = compras.reduce((sum, c) => sum + parseFloat(c.precio_pagado), 0);

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Panel de administración — Compras</h1>
                    <p className="text-gray-500 text-sm">{compras.length} compras · Total: {total.toFixed(2)}€</p>
                </div>

                {compras.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">No hay compras registradas aún.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border rounded-lg overflow-hidden">
                            <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Usuario</th>
                                <th className="px-4 py-3 text-left">Prenda</th>
                                <th className="px-4 py-3 text-left">Talla</th>
                                <th className="px-4 py-3 text-left">Color</th>
                                <th className="px-4 py-3 text-left">Precio</th>
                                <th className="px-4 py-3 text-left">Estado</th>
                                <th className="px-4 py-3 text-left">Fecha</th>
                            </tr>
                            </thead>
                            <tbody>
                            {compras.map((compra, i) => (
                                <tr key={compra.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-3 text-gray-400">{compra.id}</td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium">{compra.user?.name ?? 'Usuario eliminado'}</p>
                                        <p className="text-gray-400 text-xs">{compra.user?.email}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            {compra.prenda?.imagen && (
                                                <img
                                                    src={`/storage/${compra.prenda.imagen}`}
                                                    alt={compra.prenda.nombre}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                            )}
                                            <span>{compra.prenda?.nombre ?? 'Prenda eliminada'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{compra.prenda?.talla ?? '-'}</td>
                                    <td className="px-4 py-3">{compra.prenda?.color ?? '-'}</td>
                                    <td className="px-4 py-3 font-bold">{compra.precio_pagado}€</td>
                                    <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
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
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(compra.fecha_compra).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
