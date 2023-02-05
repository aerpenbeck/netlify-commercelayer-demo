<script lang="ts">
    import type { ProductType } from '$lib/types'
    export let data: { product: ProductType }
</script>

<nav>
    <a href="/">home</a>
    <a href="/products">products</a>
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
            </div>
        </div>
    </div>
</div>
