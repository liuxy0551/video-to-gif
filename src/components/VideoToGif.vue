<template>
  <div></div>
</template>

<script>
import gifshot from 'gifshot'

export default {
  name: 'VideoToGif',
  props: {

  },
  data () {
    return {

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
    createGIF () {
      let options = {
        video: ['http://media.liuxianyu.cn/node-n.mp4'],
        // video: ['http://anniversary-test.oss-cn-hangzhou.aliyuncs.com/video/node-n.mp4'],
        gifWidth: 840,
        gifHeight: 500,
        numFrames: 5
        // numFrames: 90
      }
      gifshot.createGIF(options, obj => {
        let image = obj.image
        let animatedImage = document.createElement('img')
        animatedImage.src = image
        document.body.appendChild(animatedImage)
      })
    }
  },
  mounted () {
    // this.existingVideoGIFSupported()
    this.createGIF()

    if (!this.isSupported) {
      alert('当前浏览器不支持后续操作，请更换浏览器后再试！')
    }
  }
}
</script>
