import { router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ prendas, filtros, auth }) {
    const [form, setForm] = useState({
        talla: filtros.talla || '',
        color: filtros.color || '',
        corte: filtros.corte || '',
        categoria: filtros.categoria || '',
        precio_max: filtros.precio_max || '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(route('prendas.index'), form, { preserveState: true });
    };

    const limpiarFiltros = () => {
        router.get(route('prendas.index'));
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto py-6 px-4">

                {/* CABECERA */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Catálogo</h1>
                    {auth.user.role === 'admin' && (
                        <button
                            onClick={() => router.get(route('prendas.create'))}
                            className="bg-black text-white px-4 py-2 rounded"
                        >
                            + Nueva prenda
                        </button>
                    )}
                </div>

                {/* FILTROS */}
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mb-6">
                    <select name="talla" value={form.talla} onChange={handleChange} className="border rounded px-3 py-2">
                        <option value="">Todas las tallas</option>
                        {['XS','S','M','L','XL','XXL'].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>

                    <select name="color" value={form.color} onChange={handleChange} className="border rounded px-3 py-2">
                        <option value="">Todos los colores</option>
                        {['negro','blanco'].map(c => (
                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                    </select>

                    <select name="corte" value={form.corte} onChange={handleChange} className="border rounded px-3 py-2">
                        <option value="">Todos los cortes</option>
                        {['slim','regular','oversize'].map(c => (
                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                    </select>

                    <select name="categoria" value={form.categoria} onChange={handleChange} className="border rounded px-3 py-2">
                        <option value="">Todas las categorías</option>
                        {['camiseta','gorra'].map(c => (
                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="precio_max"
                        placeholder="Precio máximo"
                        value={form.precio_max}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-36"
                    />

                    <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                        Filtrar
                    </button>
                    <button type="button" onClick={limpiarFiltros} className="border px-4 py-2 rounded">
                        Limpiar
                    </button>
                </form>

                {/* LISTADO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prendas.data.length === 0 ? (
                        <p>No se encontraron prendas con esos filtros.</p>
                    ) : (
                        prendas.data.map(prenda => (
                            <div
                                key={prenda.id}
                                onClick={() => router.get(route('prendas.show', prenda.id))}
                                className="border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition"
                            >
                                {prenda.imagen && (
                                    <img
                                        src={`/storage/${prenda.imagen}`}
                                        alt={prenda.nombre}
                                        className="w-full h-48 object-cover rounded mb-3"
                                    />
                                )}
                                <h2 className="font-semibold text-lg">{prenda.nombre}</h2>
                                <p className="text-gray-500 text-sm">{prenda.descripcion}</p>
                                <p className="text-sm mt-1">Talla: {prenda.talla} · Color: {prenda.color}</p>
                                <p className="font-bold mt-2">{prenda.precio}€</p>
                            </div>
                        ))
                    )}
                </div>

                {/* PAGINACIÓN */}
                <div className="flex gap-2 mt-6">
                    {prendas.links.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => link.url && router.get(link.url)}
                            disabled={!link.url}
                            className={`px-3 py-1 border rounded ${link.active ? 'bg-black text-white' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
