<template>
  <div class="uploader-box">
    <input type="file" @change="chooseFiles" :accept="accept" />
  </div>
</template>

<script>
// import compressImage from '../utils/compressImage'

export default {
  props: {
    accept: {
      type: String,
      default: 'video/*' // https://www.w3cschool.cn/htmltags/att-input-accept.html
    },
    // 最大可选择多少MB的视频文件
    maxSize: {
      default: 15
    }
  },
  data() {
    return {}
  },
  computed: {
    fileMaxSize() {
      return this.maxSize * 1024 * 1024
    }
  },
  methods: {
    chooseFiles(e) {
      let file = e.target.files[0]
      if (file.size > this.fileMaxSize) {
        return alert('文件过大')
      }

      console.log(file)
      let fd = new FormData()
      fd.append('attach', file)
      console.log(fd)
    }
  }
}
</script>
