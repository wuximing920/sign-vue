<template>
  <div ref="canvasHW" id="canvasDiv" :class="!flag ? 'rotate-scrren' : ''">
    <div class="sign-text" v-if="flag">请签名</div>
    <div class="can-div">
      <div class="can_vans">
        <div class="van_inner">
          <canvas
            id="can_vans"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            ref="canvasF"
            @mousedown="mouseDown"
            @mousemove="mouseMove"
            @mouseup="mouseUp"
          ></canvas>
        </div>
      </div>
    </div>

    <div class="btn-div">
      <div class="clear-btn" @click="overwrite">清除</div>
      <div class="submit-btn" @click="generate">提交并预览</div>
    </div>
    <img :src="ImgSrc" alt="" />
  </div>
</template>
<script>
// import { Dialog } from "vant";
export default {
  name: "Sign",
  props: {
    lineWidth: {
      type: Number,
      default: 4,
    },
    lineColor: {
      type: String,
      default: "#000000",
    },
    bgColor: {
      type: String,
      default: "",
    },
    isCrop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      flag: true,
      ImgSrc: "",
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      color: "#000",
      linewidth: 3,
      isDraw: false, //签名标记
      resultImg: "",
      hasDrew: false,
    };
  },
  mounted() {
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.renderResize,
      false
    );
    let canvas = this.$refs.canvasF;
    canvas.style.background = "#FAFAFA";
    this.canvasTxt = canvas.getContext("2d");
    this.renderResize();

    // 在画板以外松开鼠标后冻结画笔
    document.onmouseup = () => {
      this.isDraw = false;
    };
  },
  methods: {
    // changeStatus(){

    // },
    renderResize() {
      var orientation = window.orientation;
      setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (orientation == 90 || orientation == -90) {
          //横屏
          this.rotateScreen(w, h);
        } else {
          this.initCanvas(w, h);
        }
      }, 50);
      if (orientation == 90 || orientation == -90) {
        //横屏
        this.flag = false;
      } else {
        this.flag = true;
      }
    },

    initCanvas(width) {
      let canvas = this.$refs.canvasF;
      canvas.height = 310;
      canvas.width = width - 75;
    },
    rotateScreen(width, height) {
      let canvas = this.$refs.canvasF;
      canvas.height = height - 114;
      canvas.width = width - 130;
    },
    mouseDown(ev) {
      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      let obj = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
      /*this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath(); //开始作画
      this.points.push(obj); //记录点*/
      this.drawStart(obj);
      this.isDown = true;
    },
    touchStart(ev) {
      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (ev.touches.length == 1) {
        const ele = ev.targetTouches[0];
        this.isDraw = true; //签名标记
        let obj = {
          x: ele.clientX - ele.target.offsetLeft,
          y: ele.clientY - ele.target.offsetTop,
        };
        this.drawStart(obj);
        /*this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath(); //开始作画
        this.points.push(obj); //记录点*/
      }
    },
    mouseMove(ev) {
      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.drawMove(obj);
        /*this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点*/
      }
    },
    touchMove(ev) {
      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (ev.touches.length == 1) {
        const ele = ev.targetTouches[0];
        let obj = {
          x: ele.clientX - ele.target.offsetLeft,
          y: ele.clientY - ele.target.offsetTop,
        };
        this.drawMove(obj);
        /*this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点*/
      }
    },
    mouseUp(ev) {
      ev = ev || event;
      // ev.preventDefault();
      let obj = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
      this.drawEnd(obj);
      /*this.canvasTxt.closePath(); //收笔
      this.points.push(obj); //记录点
      this.points.push({ x: -1, y: -1 });
      this.isDown = false;*/
    },
    touchEnd(ev) {
      ev = ev || event;
      // ev.preventDefault();
      if (ev.touches.length == 1) {
        const ele = ev.targetTouches[0];
        let obj = {
          x: ele.clientX - ele.target.offsetLeft,
          y: ele.clientY - ele.target.offsetTop,
        };
        this.drawEnd(obj);
        /*this.canvasTxt.closePath(); //收笔
        this.points.push(obj); //记录点
        this.points.push({ x: -1, y: -1 }); //记录点*/
      }
    },
    // 绘制
    drawStart(obj) {
      this.hasDrew = true;
      this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.lineCap = "round";
      this.canvasTxt.lineJoin = "round";
      this.canvasTxt.lineWidth = this.lineWidth;
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.points.push(obj);
    },
    drawMove(obj) {
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.strokeStyle = this.lineColor;
      this.canvasTxt.lineWidth = this.lineWidth;
      this.canvasTxt.lineCap = "round";
      this.canvasTxt.lineJoin = "round";
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.startY = obj.y;
      this.startX = obj.x;
      this.points.push(obj);
    },
    drawEnd(obj) {
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.lineCap = "round";
      this.canvasTxt.lineJoin = "round";
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.points.push(obj);
      this.points.push({ x: -1, y: -1 });
    },
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
      this.isDraw = false; //签名标记
      this.hasDrew = false;
    },
    getCropArea(imgData) {
      var topX = this.$refs.canvasF.width;
      var btmX = 0;
      var topY = this.$refs.canvasF.height;
      var btnY = 0;
      for (var i = 0; i < this.$refs.canvasF.width; i++) {
        for (var j = 0; j < this.$refs.canvasF.height; j++) {
          var pos = (i + this.$refs.canvasF.width * j) * 4;
          if (
            imgData[pos] > 0 ||
            imgData[pos + 1] > 0 ||
            imgData[pos + 2] ||
            imgData[pos + 3] > 0
          ) {
            btnY = Math.max(j, btnY);
            btmX = Math.max(i, btmX);
            topY = Math.min(j, topY);
            topX = Math.min(i, topX);
          }
        }
      }
      topX++;
      btmX++;
      topY++;
      btnY++;
      const data = [topX, topY, btmX, btnY];
      return data;
    },
    // 操作
    generate() {
      const pm = new Promise((resolve, reject) => {
        if (!this.hasDrew) {
          reject(`Warning: Not Signned!`);
          return;
        }
        var resImgData = this.canvasTxt.getImageData(
          0,
          0,
          this.$refs.canvasF.width,
          this.$refs.canvasF.height
        );
        this.canvasTxt.globalCompositeOperation = "destination-over";
        this.canvasTxt.fillStyle = "#fff";
        this.canvasTxt.fillRect(
          0,
          0,
          this.$refs.canvasF.width,
          this.$refs.canvasF.height
        );
        this.resultImg = this.$refs.canvasF.toDataURL();
        var resultImg = this.resultImg;
        this.canvasTxt.clearRect(
          0,
          0,
          this.$refs.canvasF.width,
          this.$refs.canvasF.height
        );
        this.canvasTxt.putImageData(resImgData, 0, 0);
        this.canvasTxt.globalCompositeOperation = "source-over";
        if (this.isCrop) {
          const crop_area = this.getCropArea(resImgData.data);
          var crop_canvas = document.createElement("canvas");
          const crop_ctx = crop_canvas.getContext("2d");
          crop_canvas.width = crop_area[2] - crop_area[0];
          crop_canvas.height = crop_area[3] - crop_area[1];
          const crop_imgData = this.canvasTxt.getImageData(...crop_area);
          crop_ctx.globalCompositeOperation = "destination-over";
          crop_ctx.putImageData(crop_imgData, 0, 0);
          crop_ctx.fillStyle = "#fff";
          crop_ctx.fillRect(0, 0, crop_canvas.width, crop_canvas.height);
          resultImg = crop_canvas.toDataURL();
          crop_canvas = null;
        }
        resolve(resultImg);
      });
      return pm.then((res) => {
        this.ImgSrc = res;
        console.log(this.ImgSrc);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#canvasDiv {
  // height: 100%;
  &.rotate-scrren {
    padding: 21px 36px 55px;
  }
  padding: 10px;
  .btn-div {
    div {
      cursor: pointer;
      display: inline-block;
      font-size: 12px;
      padding: 4px 8px;
    }
    .clear-btn {
      margin-right: 5px;

      background: #eaebec;
      color: #001b29;
    }
    .back-btn {
      margin-right: 5px;

      background: #eaebec;
      color: #001b29;
    }
    .submit-btn {
      background: #02a84d;
      color: #ffffff;
    }
  }
  .sign-text {
    text-align: left;
    font-size: 12px;
    font-weight: 700;
    margin-top: 65px;
    padding-left: 15px;
  }
  .can-div {
    padding: 20px 15px;
    .can_vans {
      border: 1px solid #797979;
      border-radius: 7px;
      padding: 2px;
      .van_inner {
        border: dashed 1px #7f7f7f;
        border-radius: 7px;
        background: #fafafa;
        #can_vans {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
