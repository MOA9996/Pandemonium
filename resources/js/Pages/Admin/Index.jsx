import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto py-6 px-4">
                <h1 className="text-2xl font-bold mb-8">Panel de administración</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Compras */}
                    <div
                        onClick={() => router.get(route('admin.compras'))}
                        className="border rounded-lg p-6 cursor-pointer hover:shadow-md transition"
                    >

                        <h2 className="text-xl font-semibold mb-1">Gestión de pedidos</h2>
                        <p className="text-gray-500 text-sm">Ver y gestionar todos los pedidos realizados.</p>
                    </div>

                    {/* Lookbooks */}
                    <div
                        onClick={() => router.get(route('lookbook.admin'))}
                        className="border rounded-lg p-6 cursor-pointer hover:shadow-md transition"
                    >
                        <h2 className="text-xl font-semibold mb-1">Lookbooks</h2>
                        <p className="text-gray-500 text-sm">Crear y gestionar las colecciones del lookbook.</p>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
