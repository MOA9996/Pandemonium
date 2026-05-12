import { Head, Link } from "@inertiajs/react";

export default function Exito() {
    return (
        <>
            <Head title="Pedido confirmado" />

            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full text-center">

                    {/* Icono de éxito */}
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                        <svg
                            className="h-10 w-10 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Texto */}
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        ¡Pedido confirmado!
                    </h1>
                    <p className="text-gray-500 mb-8">
                        Tu pago se ha procesado correctamente. En breve recibirás
                        un correo con los detalles de tu compra.
                    </p>

                    {/* Acciones */}
                    <div className="flex flex-col gap-3">
                        <Link
                            href={route("user.compras")}
                            className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white hover:bg-gray-800 transition"
                        >
                            Ver mis compras
                        </Link>
                        <Link
                            href={route("prendas.index")}
                            className="w-full rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                        >
                            Seguir comprando
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
