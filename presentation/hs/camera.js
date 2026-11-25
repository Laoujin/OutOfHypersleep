const HS = window.HS
const KEY = 'hypersleep-camera'

let stream = null
let streamDevice = null

const deviceId = () => { try { return localStorage.getItem(KEY) } catch { return null } }

const open = async (id) => {
  if (stream && streamDevice === id) return stream
  stream?.getTracks().forEach(t => t.stop())
  const video = { width: { ideal: 1920 }, height: { ideal: 1080 }, ...(id ? { deviceId: { exact: id } } : {}) }
  stream = await navigator.mediaDevices.getUserMedia({ video, audio: false })
  streamDevice = id
  return stream
}

HS.camera = {
  // null when there is no camera or permission was refused: callers show the placeholder crowd
  async stream() {
    try { return await open(deviceId()) } catch { return null }
  },

  async attach(video) {
    const s = await HS.camera.stream()
    if (!s || !video.isConnected) return false
    video.srcObject = s
    return true
  },

  async openTest() {
    document.querySelector('.cam-test')?.remove()
    const box = document.createElement('div')
    box.className = 'cam-test'
    box.innerHTML = `<div class="cam-panel">
        <div class="cam-head"><b>Crowd camera</b><span>shown in the finale · Esc closes</span></div>
        <select></select>
        <video autoplay playsinline muted></video>
        <div class="cam-info"></div>
      </div>`
    document.body.appendChild(box)
    const select = box.querySelector('select'), video = box.querySelector('video'), info = box.querySelector('.cam-info')
    const close = () => { box.remove(); removeEventListener('keydown', onKey, true) }
    const onKey = e => { if (e.key === 'Escape') { e.stopPropagation(); close() } }
    addEventListener('keydown', onKey, true)
    box.addEventListener('click', e => { if (e.target === box) close() })

    const show = async id => {
      try {
        video.srcObject = await open(id)
        const s = video.srcObject.getVideoTracks()[0].getSettings()
        info.textContent = `${s.width}×${s.height}`
      } catch (e) { info.textContent = `No picture: ${e.message}` }
    }
    // device labels stay empty until camera permission is granted, so ask before listing
    await show(deviceId())
    const cams = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput')
    const current = deviceId() ?? streamDevice
    select.innerHTML = cams.map((d, i) => `<option value="${d.deviceId}"${d.deviceId === current ? ' selected' : ''}>${d.label || `Camera ${i + 1}`}</option>`).join('')
    select.onchange = () => {
      try { localStorage.setItem(KEY, select.value) } catch {}
      show(select.value)
    }
  },
}
