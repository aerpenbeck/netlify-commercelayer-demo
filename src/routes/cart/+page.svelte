<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData
</script>

<nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex flex-shrink-0 items-center">
                    <img
                        class="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Future Shopping"
                    />
                    <img
                        class="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Future Shopping"
                    />
                </div>
                <div class="hidden sm:ml-6 sm:block">
                    <div class="flex space-x-3">
                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        <a
                            href="/"
                            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            >Home</a
                        >
                        <a
                            href="/products"
                            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            >Products</a
                        >
                        <a
                            href="/cart"
                            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            aria-current="page">Cart</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>

{#if data.cart.items.length > 0}

<h1 class="text-3xl font-bold">Your Shopping Cart!</h1>

<div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-2 md:gap-6">
        {#each data.cart.items as { title, quantity, id }}
            <div class="md:col-span-1">
                {quantity} * {title}
            </div>
            <div class="md:col-span-1">
                <form method="POST" action="?/removeFromCart">
                    <input type="hidden" name="id" value={id} />
                    <button aria-label="Remove from cart">🗑</button>
                </form>
            </div>
        {/each}
    </div>
</div>

<div class="mt-10 sm:mt-0">
    <div class="bg-gray-50 px-4 py-3 text-left sm:px-6">
        <form method="POST" action="?/clearCart">
            <button type="submit" aria-label="Clear cart">🔄</button>
        </form>
    </div>
</div>

<h2 class="text-2xl font-bold">Checkout</h2>

<div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">1. Email Address {#if data.cart.email}✔️{/if}</h3>
                <p class="mt-1 text-sm text-gray-600">Used for order confirmation</p>
            </div>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
            <form method="POST" action="?/setEmail">
                <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <label
                                    for="email-address"
                                    class="block text-sm font-medium text-gray-700"
                                    >Email address</label
                                >
                                <input
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    autocomplete="email"
                                    value={data.cart.email || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >Save</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

{#if data.cart.email}
<div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">2. Billing Address {#if data.cart.address}✔️{/if}</h3>
                <p class="mt-1 text-sm text-gray-600">
                    Where do you want your stuff to be shipped to?
                </p>
            </div>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
            <form method="POST" action="?/setAddress">
                <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium text-gray-700"
                                    >First name</label
                                >
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autocomplete="given-name"
                                    value={data.cart.address?.firstName || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label
                                    for="last-name"
                                    class="block text-sm font-medium text-gray-700">Last name</label
                                >
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autocomplete="family-name"
                                    value={data.cart.address?.lastName || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <label for="phone" class="block text-sm font-medium text-gray-700"
                                    >Phone</label
                                >
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    autocomplete="phone"
                                    value={data.cart.address?.phone || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="country" class="block text-sm font-medium text-gray-700"
                                    >Country</label
                                >
                                <select
                                    id="country"
                                    name="country"
                                    autocomplete="country-name"
                                    value={data.cart.address?.countryCode || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="MX">Mexico</option>
                                </select>
                            </div>

                            <div class="col-span-6">
                                <label
                                    for="street-address"
                                    class="block text-sm font-medium text-gray-700"
                                    >Street address</label
                                >
                                <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autocomplete="street-address"
                                    value={data.cart.address?.street || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label for="city" class="block text-sm font-medium text-gray-700"
                                    >City</label
                                >
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autocomplete="address-level2"
                                    value={data.cart.address?.city || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label for="region" class="block text-sm font-medium text-gray-700"
                                    >State / Province</label
                                >
                                <input
                                    type="text"
                                    name="region"
                                    id="region"
                                    autocomplete="address-level1"
                                    value={data.cart.address?.region || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                    for="postal-code"
                                    class="block text-sm font-medium text-gray-700"
                                    >ZIP / Postal code</label
                                >
                                <input
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    autocomplete="postal-code"
                                    value={data.cart.address?.zipCode || ''}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >Save</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
{/if}

{#if data.shippingMethods.length > 0}
<div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">3. Shipping Method {#if data.cart.shippingMethodSelected}✔️{/if}</h3>
                <p class="mt-1 text-sm text-gray-600">Select delivery method of your goods</p>
            </div>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
            <form method="POST" action="?/setShippingMethod">
                <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                {#each data.shippingMethods as { id, name, shipmentId, price }}
                                    <div>
                                        <input type="hidden" name="shipment-id" value={shipmentId}>
                                        <input type="radio" id={id} name="shipping-method" value={id}>
                                        <label for={id}>{name} ({price})</label>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >Select</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
{/if}

{#if data.cart.shippingMethodSelected}
<div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">4. Payment Method {#if data.cart.paymentMethodSelected}✔️{/if}</h3>
                <p class="mt-1 text-sm text-gray-600">Select payment method of your order</p>
            </div>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
            <form method="POST" action="?/setPaymentMethod">
                <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                {#each data.paymentMethods as { id, name }}
                                    <div>
                                        <input type="radio" id={id} name="payment-method" value={id}>
                                        <label for={id}>{name}</label>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >Select</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
{/if}

{#if data.cart.paymentMethodSelected}
<div class="mt-10 sm:mt-0">
    <div class="bg-gray-50 px-4 py-3 text-left sm:px-6">
        <form method="POST" action="/checkout">
            <button type="submit" aria-label="Checkout">💸</button>
        </form>
    </div>
</div>
{/if}

{:else}

<h1 class="text-3xl font-bold">Your Shopping Cart is still empty!</h1>

{/if}
