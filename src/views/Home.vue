<template>
  <div>
    <uploader v-if="false" />

    <div class="content-box">
      <div class="title">视频转 GIF</div>

      <div class="form-box">
        <div class="flex-row">
          <div class="label">视频链接：</div>
          <input class="w440" type="text" v-model="options.video" placeholder="请输入视频链接" maxlength="200" />
        </div>
        <div class="flex-row">
          <div class="label">视频时长：</div>
          <input class="w140" type="text" v-model="options.numFrames" placeholder="视频时长，单位：s" maxlength="3" />
        </div>
        <div class="flex-row">
          <div class="flex-row">
            <div class="label">宽度：</div>
            <input class="w140" type="text" v-model="options.gifWidth" placeholder="宽度，如：800" maxlength="4" />
          </div>
          <div class="flex-row l35">
            <div class="label">高度：</div>
            <input class="w140" type="text" v-model="options.gifHeight" placeholder="高度，如：600" maxlength="4" />
          </div>
        </div>
      </div>

      <div class="btn-box">
        <button @click="reset">重 置</button>
        <button :disabled="doneDisabled" @click="done">确 认</button>
        <button @click="download">下 载</button>
      </div>

      <video-to-gif :options="optionsDone" ref="gifRef" />
    </div>
  </div>
</template>

<script>
import VideoToGif from '@/components/VideoToGif'
import Uploader from '@/components/Uploader'

export default {
  name: 'Home',
  data() {
    return {
      options: {
        video: 'http://media.liuxianyu.cn/node-n.mp4',
        // vodep: 'http://anniversary-test.oss-cn-hangzhou.aliyuncs.com/video/node-n.mp4',
        gifWidth: 840,
        gifHeight: 500,
        numFrames: 1
      },
      optionsTemp: null,
      optionsDone: null,
      loading: null
    }
  },
  computed: {
    doneDisabled() {
      if (!this.options.video) {
        return true
      }
      if (!this.options.gifWidth) {
        return true
      }
      if (!this.options.gifHeight) {
        return true
      }
      if (!this.options.numFrames) {
        return true
      }
      return false
    }
  },
  methods: {
    // 重置按钮
    reset() {
      this.options = Object.assign({}, this.optionsTemp)
      this.$refs['gifRef'].url = ''
    },
    // 确认按钮
    done() {
      this.loading = this.$loading({
        lock: true,
        text: '转换中，请稍等...',
        customClass: 'loading-icon',
        background: 'rgba(0, 0, 0, 0.6)'
      })
      let { video, gifWidth, gifHeight, numFrames } = this.options
      if (!video) {
        return alert('请输入视频链接')
      }
      if (!gifWidth) {
        return alert('请输入 GIF 宽度')
      }
      if (!gifHeight) {
        return alert('请输入 GIF 高度')
      }
      if (!numFrames) {
        return alert('请输入视频时长')
      }

      this.optionsDone = Object.assign({}, this.options, { video: [this.options.video], numFrames: this.options.numFrames * 10 })
      this.$refs['gifRef'].createGIF(this.optionsDone, this.loading)
    },
    // 下载按钮
    download() {
      alert('敬请期待')
    }
  },
  mounted() {
    this.optionsTemp = { ...this.options }
  },
  components: { VideoToGif, Uploader }
}
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 30px;
    font-weight: 700;
    padding: 40px 0;
  }

  .form-box {
    .flex-row {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .label {
        width: 80px;
        text-align: left;
      }
      input {
        font-size: 16px;
        padding: 8px 10px;
      }
      .w440 {
        width: 440px;
      }
      .w140 {
        width: 140px;
      }
      .l35 {
        margin-left: 35px;
      }
    }
  }

  .btn-box {
    width: 340px;
    display: flex;
    justify-content: space-between;
    button {
      padding: 5px 30px;
    }
  }
}
</style>

<style lang="scss">
  .loading-icon {
    .el-loading-spinner i {
      color: #fff;
      font-size: 30px;
      padding-bottom: 5px;
    }
    .path {
      stroke: #fff;
    }
    .el-loading-text {
      color: #fff;
      font-size: 24px;
      padding-top: 10px;
    }
  }
</style>
