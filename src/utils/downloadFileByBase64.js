function dataURLtoBlob(dataUrl) {
  let arr = dataUrl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

function downloadFile(url, name = 'file') {
  let a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', name)
  a.setAttribute('target', '_blank')
  let clickEvent = document.createEvent('MouseEvents')
  clickEvent.initEvent('click', true, true)
  a.dispatchEvent(clickEvent)
}

export default function downloadFileByBase64(base64, name) {
  let myBlob = dataURLtoBlob(base64)
  let myUrl = URL.createObjectURL(myBlob)
  downloadFile(myUrl, name)
}
