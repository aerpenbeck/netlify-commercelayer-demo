<script lang="ts">
    import type { ProductType } from "./data";
    export let data: { summaries: ProductType[]};
</script>
<nav>
    <a href="/">home</a>
    <a href="/products">products</a>
</nav>
<h1 class="text-3xl font-bold">
    Browse our fancy Products!
</h1>
<ul>
{#each data.summaries as { sku, title}}
<li><a href="/products/{sku}">{title}</a>"</li>
{/each}
</ul>