<template>
  <transition :name="`vux-popup-animate-${position}`">
    <div v-show="show && !initialShow" :style="styles" class="vux-popup-dialog" :class="[`vux-popup-${position}`, show ? 'vux-popup-show' : '']">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Popup from './popup'

export default {
  name: 'popup',
  props: {
    value: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: 'auto'
    },
    showMask: {
      type: Boolean,
      default: true
    },
    isTransparent: Boolean,
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom'
    },
    maxHeight: String
  },
  mounted () {
    this.$overflowScrollingList = document.querySelectorAll('.vux-fix-safari-overflow-scrolling')
    this.$nextTick(() => {
      const _this = this
      this.popup = new Popup({
        showMask: _this.showMask,
        container: _this.$el,
        hideOnBlur: _this.hideOnBlur,
        onOpen () {
          _this.fixSafariOverflowScrolling('auto')
          _this.show = true
        },
        onClose () {
          _this.show = false
          if (window.__$vuxPopups && Object.keys(window.__$vuxPopups).length > 1) return
          if (document.querySelector('.vux-popup-dialog.vux-popup-mask-disabled')) return
          setTimeout(() => {
            _this.fixSafariOverflowScrolling('touch')
          }, 300)
        }
      })
      if (this.value) {
        this.popup.show()
      }
      this.initialShow = false
    })
  },
  methods: {
    /**
    * https://github.com/airyland/vux/issues/311
    * https://benfrain.com/z-index-stacking-contexts-experimental-css-and-ios-safari/
    */
    fixSafariOverflowScrolling (type) {
      if (!this.$overflowScrollingList.length) return
      // if (!/iphone/i.demo(navigator.userAgent)) return
      for (let i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type
      }
    }
  },
  data () {
    return {
      initialShow: true,
      hasFirstShow: false,
      show: this.value
    }
  },
  computed: {
    styles () {
      const styles = {}
      if (!this.position || this.position === 'bottom' || this.position === 'top') {
        styles.height = this.height
      } else {
        styles.width = this.width
      }

      if (this.maxHeight) {
        styles['max-height'] = this.maxHeight
      }

      this.isTransparent && (styles['background'] = 'transparent')
      return styles
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.popup && this.popup.show()
        this.$emit('on-show')
        this.fixSafariOverflowScrolling('auto')
        if (!this.hasFirstShow) {
          this.$emit('on-first-show')
          this.hasFirstShow = true
        }
      } else {
        this.$emit('on-hide')
        this.show = false
        this.popup.hide(false)
        setTimeout(() => {
          if (!document.querySelector('.vux-popup-dialog.vux-popup-show')) {
            this.fixSafariOverflowScrolling('touch')
          }
        }, 200)
      }
    }
  },
  beforeDestroy () {
    this.popup.destroy()
    this.fixSafariOverflowScrolling('touch')
  }
}
</script>

<style lang="less">
@import '~@/assets/styles/variable.less';

.vux-popup-dialog {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: @popup-background-color;
  z-index: 501;
  transition-property: transform;
  transition-duration: 300ms;
  max-height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.vux-popup-dialog.vux-popup-left {
  width: auto;
  height: 100%;
  top: 0;
  right: auto;
  bottom: auto;
  left: 0;
}
.vux-popup-dialog.vux-popup-right {
  width: auto;
  height: 100%;
  top: 0;
  right: 0;
  bottom: auto;
  left: auto;
}
.vux-popup-dialog.vux-popup-top {
  width: 100%;
  top: 0;
  right: auto;
  bottom: auto;
  left: 0;
}
.vux-popup-mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  tap-highlight-color: rgba(0,0,0,0);
  z-index: -1;
  transition: opacity 400ms;
}
.vux-popup-mask.vux-popup-show {
  opacity: 1;
}

.vux-popup-animate-bottom-enter, .vux-popup-animate-bottom-leave-active {
  transform: translate3d(0, 100%, 0);
}

.vux-popup-animate-left-enter, .vux-popup-animate-left-leave-active {
  transform: translate3d(-100%, 0, 0);
}

.vux-popup-animate-right-enter, .vux-popup-animate-right-leave-active {
  transform: translate3d(100%, 0, 0);
}

.vux-popup-animate-top-enter, .vux-popup-animate-top-leave-active {
  transform: translate3d(0, -100%, 0);
}
</style>
