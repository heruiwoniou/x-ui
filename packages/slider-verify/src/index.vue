<template>
  <div
    :style="{
      width: Number.isInteger(width) ? `${width}px` : width,
      height: `${height}px`,
    }"
    :class="['x-slider-verify', { 'x-slider-verify--success': success }]"
  >
    <div
      :class="[
        'x-slider-verify__placeholder',
        {
          'x-slider-verify__placeholder--success': success,
        },
      ]"
      :style="{ zIndex: success ? 3 : 0 }"
    >
      {{ success ? "验证成功！" : placeholder }}
    </div>
    <div
      class="x-slider-verify__process"
      :style="{
        width: x + 'px',
        opacity: max === 0 ? 0 : x / (max - height),
      }"
    >
      <div class="x-slider-verify__process__background"></div>
    </div>
    <div
      class="x-slider-verify__bar"
      :style="{
        left: x + 'px',
        width: `${height}px`,
        height: `${height}px`,
      }"
      @mousedown="handleMouseDown"
    >
      <svg
        t="1666678782531"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2602"
        :width="`${height}px`"
        :height="`${height}px`"
      >
        <path
          d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
          p-id="2603"
        ></path>
        <path
          d="M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
          p-id="2604"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
const doc_startselect = document.onstartselect;
export default {
  props: {
    placeholder: {
      type: String,
      default: "请向右滑动验证",
    },
    width: {
      type: [Number, String],
      default: "100%",
    },
    height: {
      type: Number,
      default: 35,
    },
  },
  name: "x-slider-verify",
  data() {
    return {
      x: 0,
      max: 0,
      success: false,
    };
  },
  methods: {
    handleMouseDown(e) {
      if (this.success) return;
      const max = (this.max = this.$el.offsetWidth - this.height);
      const sx = e.clientX;
      document.onstartselect = () => {
        return false;
      };
      const handleMouseMove = (e) => {
        const dx = e.clientX - sx;
        if (max > dx) {
          this.x = dx;
        } else {
          this.success = true;
          removeListener();
          this.$emit("success");
          this.x = max;
        }
      };
      const handleMouseUp = () => {
        removeListener();
        document.startselect = doc_startselect;
        if (!this.success) {
          this.x = 0;
        }
      };

      const removeListener = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
  },
};
</script>
<style lang="less">
@defaultColor: #ccc;
@successColor: #67c23a;

.x-slider-verify {
  user-select: none;
  position: relative;
  background: fade(@defaultColor, 80%);
  border: 1px solid @defaultColor;

  &--success {
    border-color: @successColor;
    background: fade(@successColor, 80%);
  }
  &__placeholder {
    position: absolute;
    z-index: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
  }
  &--success {
    color: white;
    z-index: 3;
    font-weight: bold;
  }
  &__process {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    bottom: 0;
    &__background {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: @successColor;
    }
  }
  &__bar {
    position: absolute;
    z-index: 2;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: e-resize;
    svg {
      transform: scale(0.7);
    }
  }
}
</style>
