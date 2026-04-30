import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoCheckmarkCircleOutline, IoChevronBackOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const subtotal = useMemo(
        () => cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0),
        [cart]
    );
    const taxes = subtotal * 0.08;
    const total = subtotal + taxes;

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            toast.info('Your cart is empty. Add items to checkout.');
            navigate('/cart');
            return;
        }

        if (!customerName.trim() || !email.trim() || !address.trim()) {
            toast.error('Please complete all checkout details.');
            return;
        }

        clearCart();
        setOrderPlaced(true);
        toast.success('Order placed successfully.');
    };

    return (
        <div className="min-h-screen bg-[var(--ivory)] pt-32 pb-20 px-6 md:px-12">
            <div className="mx-auto max-w-6xl">
                <button
                    onClick={() => navigate('/cart')}
                    className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--charcoal)]/70 transition hover:text-[var(--teal)]"
                >
                    <IoChevronBackOutline />
                    Back to Cart
                </button>

                <h1 className="mb-10 font-serif text-4xl md:text-5xl text-[var(--charcoal)]">Checkout</h1>

                {orderPlaced ? (
                    <div className="rounded-3xl border border-[var(--gold)]/40 bg-white p-10 text-center shadow-lg">
                        <IoCheckmarkCircleOutline className="mx-auto mb-5 text-6xl text-[var(--teal)]" />
                        <h2 className="mb-3 font-serif text-3xl text-[var(--charcoal)]">Order Placed</h2>
                        <p className="mb-8 text-sm uppercase tracking-[0.2em] text-[var(--charcoal)]/70">
                            Thank you for shopping with Elvare
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="rounded-full bg-[var(--teal)] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--purple)]"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        <form
                            onSubmit={handlePlaceOrder}
                            className="rounded-3xl border border-[var(--beige)] bg-white p-8 shadow-sm lg:col-span-2"
                        >
                            <h2 className="mb-6 font-serif text-2xl text-[var(--charcoal)]">Delivery Details</h2>
                            <div className="grid gap-5">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full rounded-xl border border-[var(--beige)] px-4 py-3 text-sm outline-none transition focus:border-[var(--teal)]"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-[var(--beige)] px-4 py-3 text-sm outline-none transition focus:border-[var(--teal)]"
                                />
                                <textarea
                                    rows={4}
                                    placeholder="Shipping Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full rounded-xl border border-[var(--beige)] px-4 py-3 text-sm outline-none transition focus:border-[var(--teal)]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[var(--teal)] to-[var(--purple)] py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
                            >
                                Place Order
                            </button>
                        </form>

                        <div className="rounded-3xl border border-[var(--beige)] bg-white p-8 shadow-sm">
                            <h3 className="mb-6 font-serif text-2xl text-[var(--charcoal)]">Order Summary</h3>
                            <div className="space-y-3 text-sm text-[var(--charcoal)]/80">
                                <div className="flex justify-between">
                                    <span>Items</span>
                                    <span>{cart.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax</span>
                                    <span>${taxes.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-6 border-t border-[var(--beige)] pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--charcoal)]/70">Total</span>
                                    <span className="font-serif text-3xl text-[var(--charcoal)]">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
