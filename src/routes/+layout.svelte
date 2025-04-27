

<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="manifest" href="/manifest.json">
	<meta name="theme-color" content="#2563eb">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<link rel="apple-touch-icon" href="/icon-192.png" />
</svelte:head>

{@render children()}
