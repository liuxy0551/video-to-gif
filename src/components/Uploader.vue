<template>
  <van-uploader v-model='files' :multiple='multiple' :accept='accept' :after-read='uploadFile' @delete='delFile'
                 @click-preview='previewing = true' @close-preview='previewing = false'
                 :max-count='maxCount' ref='uploaderRef' />
</template>

<script>
import compressImage from '../utils/compressImage'
export default {
  props: {
    value: {
      type: [String, Array]
    },
    multiple: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    maxCount: {
      type: Number,
      default: 3
    },
    accept: {
      default: 'image/*'
    },
    maxSize: {
      default: 10 * 1024 * 1024
    }
  },
  data () {
    return {
      files: [],
      previewing: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        this.$emit('input', nv)
      }
    }
  },
  watch: {
    currentValue: {
      handler (nv) {
        if (nv) {
          let urls = Array.isArray(nv) ? nv : [nv]
          urls.forEach(url => {
            let exist = false
            this.files.forEach(f => {
              if (f.url === url) {
                exist = true
              }
            })
            if (!exist) {
              this.files.push({ url })
            }
          })
        }
      },
      immediate: true
    },
    files: {
      handler (nv) {
        let values = nv.map(f => f.url)
        if (this.multiple) {
          this.currentValue = values
        } else {
          this.currentValue = values.length ? values[0] : ''
        }
      },
      deep: true
    }
  },
  methods: {
    // 关闭全屏的图片预览
    closeImagePreview () {
      this.$refs['uploaderRef'].closeImagePreview()
    },
    // 上传文件
    async uploadFile (e) {
      try {
        let files = Array.isArray(e) ? e : [e]
        this.$emit('update:loading', true)

        // 有文件超过限制大小则全部停止上传
        for (let i of files) {
          if (i.file.size > this.maxSize) {
            this.$toast(`单个文件大小不能超过${this.maxSize / 1024 / 1024}M哦`)
            this.files = []
            return
          }
        }
        // 一次性上传多张图片
        for (let idx = 0; idx < files.length; idx++) {
          let f = files[idx]
          if (f.file.size <= this.maxSize) {
            let fd = new FormData()

            let compressFile = await compressImage(f.file)
            fd.append('attach', compressFile, compressFile.name)
            // fd.append('attach', f.file)

            await this.uploadImg(fd, f)
          } else {
            this.$toast(`单个文件大小不能超过${this.maxSize / 1024 / 1024}M哦`)
            // this.files.pop()
            this.files = []
          }
        }
      } catch (e) {
        throw e
      } finally {
        this.$emit('update:loading', false)
      }
    },
    // 一次一张上传图片
    uploadImg (fd, file) {
      let toast = this.$toast.loading({ message: '上传中...', forbidClick: true, duration: 0 })
      return new Promise(resolve => {
        this.api.uploadFile(fd).then(res => {
          if (res.data.code === 200) {
            this.$set(file, 'url', res.data.data[0])
            toast.clear()
            this.$toast('上传成功')
            resolve()
          }
        }).catch(err => {
          console.error(err)
          toast.clear()
        })
      })
    },
    // 删除文件
    delFile (e) {
      this.$emit('delFile', e)
    }
  }
}
</script>
