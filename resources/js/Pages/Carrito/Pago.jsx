import { useState } from 'react';
import { router } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function FormularioPago({ total }) {
    const stripe = useStripe();
    const elements = useElements();
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcesando(true);
        setError(null);

        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/carrito/completar',
            },
            redirect: 'if_required',
        });

        if (stripeError) {
            setError(stripeError.message);
            setProcesando(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            router.post(route('carrito.completar'), {
                payment_intent_id: paymentIntent.id,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <PaymentElement />

            {error && (
                <div className="bg-red-100 text-red-800 border border-red-300 px-4 py-3 rounded text-sm">
                    {error}
                </div>
            )}

            <div className="flex justify-between items-center border-t pt-4">
                <p className="text-xl font-bold">Total: {total.toFixed(2)}€</p>
                <button
                    type="submit"
                    disabled={!stripe || procesando}
                    className="bg-black text-white px-8 py-3 rounded text-lg disabled:opacity-50"
                >
                    {procesando ? 'Procesando...' : 'Pagar ahora'}
                </button>
            </div>
        </form>
    );
}

export default function Pago({ clientSecret, stripeKey, total }) {
    const stripePromise = loadStripe(stripeKey);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
        },
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto py-6 px-4">
                <button
                    onClick={() => router.get(route('carrito.index'))}
                    className="text-sm text-gray-500 underline mb-6 block"
                >
                    ← Volver al carrito
                </button>

                <h1 className="text-2xl font-bold mb-6">Pago seguro</h1>

                <div className="bg-white border rounded-lg p-6">
                    <Elements stripe={stripePromise} options={options}>
                        <FormularioPago total={parseFloat(total)} />
                    </Elements>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
