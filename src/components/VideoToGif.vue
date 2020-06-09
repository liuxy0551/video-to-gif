<template>
  <div class="video-to-gif">
    <img :src="url" alt="">
  </div>
</template>

<script>
import gifshot from 'gifshot'

export default {
  name: 'VideoToGif',
  props: {
    options: {
      type: Object
    }
  },
  data () {
    return {
      url: ''
    }
  },
  computed: {
    // 当前浏览器是否支持 gifshot 动画的 GIF 选项
    isSupported () {
      return gifshot.isSupported()
    }
  },
  methods: {
    // 检测浏览器当前支持的视频文件扩展名
    existingVideoGIFSupported () {
      let extensions = ['mp4', 'ogsg', 'ogv', 'webm', 'mov']
      for (let i of extensions) {
        let bool = gifshot.isExistingVideoGIFSupported([i])
        console.log(i, bool)
      }
    },
    // 创建 GIF
    createGIF (options) {
      let start = new Date()
      gifshot.createGIF(options, obj => {
        if (!obj.error) {
          let url = obj.image
          this.url = url
          console.log((new Date() - start) / 1000)
        }
      })
    }
  },
  mounted () {
    // this.existingVideoGIFSupported()

    if (!this.isSupported) {
      alert('当前浏览器不支持后续操作，请更换浏览器后再试！')
    }
  }
}
</script>

<style lang="scss" scoped>
.video-to-gif {
  max-width: 1000px;
  max-height: 800px;
  padding-top: 20px;
}
</style>
