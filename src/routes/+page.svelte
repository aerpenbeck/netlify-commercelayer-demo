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
                            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            aria-current="page">Home</a
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

<h1 class="text-3xl font-bold underline">Welcome to SvelteKit with Commerce Layer on Netlify!</h1>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
