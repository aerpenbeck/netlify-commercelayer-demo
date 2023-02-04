<script lang="ts">
	import type { ProductType } from "../data";
    export let data: { product: ProductType};
</script>
<nav>
    <a href="/">home</a>
    <a href="/products">products</a>
</nav>
<h1 class="text-2xl font-bold">
    {data.product.title}
</h1>
<div>{data.product.description}</div>