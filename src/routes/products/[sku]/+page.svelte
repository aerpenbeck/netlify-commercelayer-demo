<script lang="ts">
    import type { ProductType } from '$lib/types'
    export let data: { product: ProductType }
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
                            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            >Cart</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>

<h1 class="text-2xl font-bold">{data.product.title}</h1>

<div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
            class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
            <div class="group relative">
                <div
                    class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80"
                >
                    <img
                        src={data.product.imgUrl}
                        alt="product description"
                        class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div class="mt-4 flex justify-between">
                    <div>
                        <h3 class="text-sm text-gray-700">{data.product.description}</h3>
                    </div>
                    <p class="text-sm font-medium text-gray-900">{data.product.price}</p>
                </div>
                <div>
                    <form method="POST" action="?/addToCart">
                        <input type="hidden" name="sku" value={data.product.sku} />
                        <input type="hidden" name="title" value={data.product.title} />
                        <button aria-label="Add to cart">🛒</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
