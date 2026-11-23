<script setup>
const stars = Array.from({ length: 160 }, (_, i) => {
  const r = (n) => { const x = Math.sin(i * 9301 + n * 49297) * 233280; return x - Math.floor(x) }
  return `${Math.floor(r(1) * 1600)}px ${Math.floor(r(2) * 900)}px rgba(220,235,255,${(r(3) * 0.7 + 0.15).toFixed(2)})`
}).join(',')
</script>

<template>
  <div class="hs-root">
    <div class="hs-stars" :style="{ boxShadow: stars }" />
    <slot />
  </div>
</template>
