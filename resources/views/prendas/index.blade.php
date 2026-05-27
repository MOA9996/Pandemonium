<x-app-layout>
    <div class="max-w-7xl mx-auto py-6 px-4">

        {{-- FORMULARIO DE FILTROS --}}
        <form method="GET" action="{{ route('prendas.index') }}" class="flex gap-4 mb-6">

            <select name="talla">
                <option value="">Todas las tallas</option>
                @foreach(['XS','S','M','L','XL','XXL'] as $talla)
                    <option value="{{ $talla }}" {{ request('talla') == $talla ? 'selected' : '' }}>
                        {{ $talla }}
                    </option>
                @endforeach
            </select>

            <select name="color">
                <option value="">Todos los colores</option>
                @foreach(['negro','blanco'] as $color)
                    <option value="{{ $color }}" {{ request('color') == $color ? 'selected' : '' }}>
                        {{ ucfirst($color) }}
                    </option>
                @endforeach
            </select>

            <select name="corte">
                <option value="">Todos los cortes</option>
                @foreach(['slim','regular','oversize'] as $corte)
                    <option value="{{ $corte }}" {{ request('corte') == $corte ? 'selected' : '' }}>
                        {{ ucfirst($corte) }}
                    </option>
                @endforeach
            </select>

            <select name="categoria">
                <option value="">Todas las categorías</option>
                @foreach(['camisetas','pantalónes','gorras','otros'] as $cat)
                    <option value="{{ $cat }}" {{ request('categoria') == $cat ? 'selected' : '' }}>
                        {{ ucfirst($cat) }}
                    </option>
                @endforeach
            </select>

            <input type="number" name="precio_max" placeholder="Precio máximo"
                   value="{{ request('precio_max') }}">

            <button type="submit">Filtrar</button>
            <a href="{{ route('prendas.index') }}">Limpiar</a>

        </form>

        {{-- LISTADO DE PRENDAS --}}
        <div class="grid grid-cols-3 gap-4">
            @forelse($prendas as $prenda)
                <div class="border rounded p-4">
                    @if($prenda->imagen)
                        <img src="{{ asset('storage/' . $prenda->imagen) }}" alt="{{ $prenda->nombre }}">
                    @endif
                    <h2>{{ $prenda->nombre }}</h2>
                    <p>{{ $prenda->descripcion }}</p>
                    <p>Talla: {{ $prenda->talla }}</p>
                    <p>Color: {{ $prenda->color }}</p>
                    <p>Precio: {{ $prenda->precio }}€</p>
                    <p>{{ $prenda->estaVendida() ? 'Vendida' : 'Disponible' }}</p>
                </div>
            @empty
                <p>No se encontraron prendas con esos filtros.</p>
            @endforelse
        </div>

        {{-- PAGINACIÓN --}}
        {{ $prendas->withQueryString()->links() }}

    </div>
</x-app-layout>
