<template>
  <div>
    <uploader v-if="false" />

    <div class="content-box">
      <div class="title">视频转换成 GIF</div>

      <div class="form-box">
        <div class="flex-row">
          <div class="label">视频链接：</div>
          <el-input class="w440" type="text" v-model="options.video" placeholder="请输入以https开头的视频链接" clearable maxlength="200" />
        </div>
        <div class="flex-row">
          <div class="label">GIF 时长：</div>
          <el-input class="w110" type="number" v-model="options.numFrames" placeholder="视频时长，单位：s" />
          <div class="tip" v-if="options.numFrames">建议20秒内，等待时间取决于电脑性能，预计等待{{ 3 * options.numFrames }}秒</div>
        </div>
        <div class="flex-row">
          <div class="flex-row">
            <div class="label">宽度：</div>
            <el-input class="w110" type="text" v-model="options.gifWidth" placeholder="宽度，如：800" maxlength="4" />
          </div>
          <div class="flex-row l35">
            <div class="label">高度：</div>
            <el-input class="w110" type="text" v-model="options.gifHeight" placeholder="高度，如：600" maxlength="4" />
          </div>
        </div>
      </div>

      <div class="btn-box">
        <button @click="reset">重 置</button>
        <button :disabled="doneDisabled" @click="done">转 换</button>
        <button @click="download" v-if="base64">下 载</button>
      </div>

      <video-to-gif :options="optionsDone" @save="save" ref="gifRef" />
    </div>
  </div>
</template>

<script>
import VideoToGif from '@/components/VideoToGif'
import Uploader from '@/components/Uploader'
import downloadFileByBase64 from '@/utils/downloadFileByBase64'

export default {
  name: 'Home',
  data() {
    return {
      options: {
        video: 'https://liuxianyu.cn//assets/demo.mp4',
        gifWidth: 540,
        gifHeight: 430,
        numFrames: 4
      },
      optionsTemp: null,
      optionsDone: null,
      loading: null,
      base64: null
    }
  },
  watch: {
    'options.video': {
      handler(nv, ov) {
        localStorage.setItem('video', nv)
      }
    },
    'options.gifWidth': {
      handler(nv, ov) {
        localStorage.setItem('gifWidth', nv)
      }
    },
    'options.gifHeight': {
      handler(nv, ov) {
        localStorage.setItem('gifHeight', nv)
      }
    },
    'options.numFrames': {
      handler(nv, ov) {
        if (nv < 0) {
          this.options.numFrames = '0'
        } else {
          this.options.numFrames = nv.slice(0, 3)
        }
        localStorage.setItem('numFrames', this.options.numFrames)
      }
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
    // 重置按钮 - 清除缓存
    reset() {
      this.options = Object.assign({}, this.optionsTemp)
      this.$refs['gifRef'].url = ''
      localStorage.clear()
    },
    // 确认按钮
    done() {
      this.loading = this.$loading({
        lock: true,
        text: '转换中，请稍等...',
        customClass: 'loading-icon',
        background: 'rgba(0, 0, 0, 0.6)'
      })
      this.optionsDone = Object.assign({}, this.options, { video: [this.options.video], numFrames: this.options.numFrames * 10 })
      this.$refs['gifRef'].createGIF(this.optionsDone, this.loading)
    },
    // 暂存 gif 的 base64
    save(base64, start) {
      this.base64 = base64

      // 文件大小
      var eqTagIndex = base64.indexOf('=')
      let file = eqTagIndex === -1 ? base64 : base64.substring(0, eqTagIndex)
      var strLen = file.length
      var fileSize = strLen - (strLen / 8) * 2
      this.$message.success(`生成的 GIF 文件大小：${ Math.round((fileSize / 1024 / 1024) * 100) / 100 }M`)

      // 耗时
      this.$notify({
        title: '成功',
        message: `耗时 ${ new Date() - start } ms`,
        type: 'success'
      })
      this.loading.close()
    },
    // 下载按钮
    download() {
      let list = this.options.video.split('/')
      downloadFileByBase64(this.base64, list[list.length - 1].split('.')[0])
    }
  },
  mounted() {
    this.optionsTemp = { ...this.options }

    let list = ['video', 'gifWidth', 'gifHeight', 'numFrames']
    for (let i of list) {
      localStorage.getItem(i) && (this.options[i] = localStorage.getItem(i))
    }
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
      .tip {
        font-size: 14px;
        opacity: 0.7;
        padding-left: 10px;
      }
      .w440 {
        width: 460px;
      }
      .w110 {
        width: 110px;
      }
      .l35 {
        margin-left: 35px;
      }
    }
  }

  .btn-box {
    width: 340px;
    margin-left: -40px;
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
