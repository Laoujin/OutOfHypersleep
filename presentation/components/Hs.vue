<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'
import HS from '../hs/hub.js'

const props = defineProps({ id: { type: String, required: true } })
const { $clicks } = useSlideContext()
const isActive = useIsSlideActive()
HS.bindNav(useNav())

const host = ref(null)
const def = HS.byId[props.id]
let el = null

function applyStep() {
  if (!el) return
  const active = isActive.value
  const st = Math.min($clicks.value, (def.steps || 1) - 1)
  for (let k = 1; k < 12; k++) el.classList.toggle('s' + k, k <= st)
  if (def.step) def.step(el, st, HS.ctx(active, mount))
}

function mount() {
  if (!host.value) return
  const active = isActive.value
  if (active && def.enter) { def.enter(HS.ctx(true, mount)); HS.save() }
  const c = HS.ctx(active, mount)
  host.value.innerHTML = ''
  el = document.createElement('section')
  el.className = `slide seq-${def.seq.split(':')[0]} ${def.cls || ''}`
  el.innerHTML = def.html(c)
  host.value.appendChild(el)
  el.addEventListener('mousedown', (e) => { if (e.target.closest('button')) e.preventDefault() })
  el.addEventListener('click', (e) => { const t = e.target.closest('button, label'); if (t) setTimeout(() => document.activeElement?.blur?.(), 0) })
  if (active && def.init) def.init(el, c)
  applyStep()
}

let off = null
onMounted(() => {
  mount()
  off = HS.onRefresh(() => { if (isActive.value) mount() })
})
onBeforeUnmount(() => off && off())
watch(isActive, (a) => { if (a) mount() })
watch($clicks, applyStep)
</script>

<template>
  <div ref="host" class="hs-host" />
</template>
