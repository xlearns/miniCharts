import {
  DPI,
  S10,
  S5,
  initCanvas,
  getYSpace
} from './utils.js';
import Event from "./event";

class myChart{
  canvas: any;
  ctx: any;
  type: string;
  bgColor: string;
  yLength: number;
  ySpace: number;
  topPadding: number;
  leftPadding: number;
  rightPadding: number;
  bottomPadding: number;
  yEqual: number;
  labels: any;
  xLength: number;
  axisColor: string;
  xRorate: number;
  xRotate: number;
  yRorate: number;
  yRotate: number;
  showGrid: boolean;
  gridColor: string;
  datasets: any;
  constructor(el:any,options={} as any){
     this.canvas = initCanvas(el)
     Event(this.canvas)
     this.ctx = this.canvas.getContext('2d');
     this.type = 'bar';
     this.gridColor = '#eee';                // 网格颜色
     this.bgColor = options.bgColor?options.bgColor:'#fff'
     this.showGrid = true; 
     this.topPadding = 60 * DPI;             // 图表上边距
     this.leftPadding = 50 * DPI;            // 图表左边距
     this.rightPadding = 10 * DPI;           // 图表右边距
     this.bottomPadding = 50 * DPI;          // 图表下边距
     this.yEqual = 5;                        // y轴分成5等分
     this.yLength = 0;                       // y轴坐标点之间的真实长度
     this.xLength = 0;                       // x轴坐标点之间的真实长度
     this.ySpace = 0;                        // y轴坐标点之间显示的间距
     this.xRorate = 0;                       // x轴坐标点文本旋转角度
     this.yRorate = 0;                       // y轴坐标点文本旋转角度
     this.xRotate = 0;                       // x轴坐标点文本旋转角度
     this.yRotate = 0;                       // y轴坐标点文本旋转角度
     this.axisColor = '#666';                // 坐标轴颜色
     this.init(options)
  }
  init(options:any){
    //配置项
    //用Object.assign特性做初始化太棒了。具备覆盖和修改第一个{}
    Object.assign(this, options);

    if (!options.labels || !options.labels.length) {
      throw new Error('缺少主要参数labels');
    }
    if (!options.datasets || !options.datasets.length) {
      throw new Error('缺少主要参数datasets');
    }

    //画背景
    this.drawBackground();
    if(this.type=='bar'|| this.type === 'line'){
       this.renderBarChart();
    }
  }
  //绘制图表背景
  drawBackground(){
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // this.drawTitle();
  }
  // 绘制柱形图
  renderBarChart(){
        this.yLength = Math.floor((this.canvas.height - this.topPadding - this.bottomPadding - S10) / this.yEqual);
        this.xLength = Math.floor((this.canvas.width - this.leftPadding - this.rightPadding - S10) / this.labels.length);
        this.ySpace = getYSpace(this.datasets, this.yEqual);
        this.drawXAxis();
        this.drawYAxis();
        this.drawBarContent();
  }

  //
  drawValue(){

  }
  //绘制内容
  drawBarContent() {
    let ctx = this.ctx;
    let length = this.datasets.length;
    ctx.beginPath();
    for (let i = 0; i < length; i++) {
      //图例
      //内容
      const item = this.datasets[i].data;
      for (let j = 0; j < item.length; j++) {
        if (j > this.labels.length - 1) {
          // 兼容数据比labels多，多的部分不显示
          continue;
        }
        let space = this.xLength / (length + 1);
        let ratio = this.yLength / this.ySpace;
        let left = this.leftPadding + this.xLength * j + space * (i + 1 / 2);
        let right = left + space;
        let bottom = this.canvas.height - this.bottomPadding;
        let top = bottom - item[j] * ratio;
        if (this.type === 'bar') {
          ctx.fillRect(
              left,
              top,
              right - left,
              bottom - top
          );
          // this.drawValue(item[j], left + space / 2, top - S5);
      } 
      }
    }

  }
  drawYPoint(){
    let ctx = this.ctx;
        ctx.font = 12 * DPI + 'px Microsoft YaHei';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.beginPath();
        for (let i = 0; i < this.yEqual; i++) {
            let x = this.leftPadding;
            let y = this.canvas.height - this.bottomPadding - this.yLength * (i + 1) + 0.5;
            if (this.showGrid) {
                // 绘制网格线
                ctx.strokeStyle = this.gridColor;
                ctx.moveTo(x, y);
                ctx.lineTo(this.canvas.width - this.rightPadding - S10, y);
            } else {
                ctx.strokeStyle = this.axisColor;
                ctx.moveTo(x - S5, y);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.save();
            ctx.fillStyle = this.axisColor;
            // 文本旋转
            ctx.translate(x - S10, y);
            if (this.yRorate) ctx.rotate(-this.yRorate * Math.PI / 180);
            else ctx.rotate(-this.yRotate * Math.PI / 180);
            ctx.fillText(this.ySpace * (i + 1), 0, 0);
            ctx.restore();
        }
  }
  // 绘制X轴坐标点
  drawXPoint() {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.font = 12 * DPI + 'px Microsoft YaHei';
    ctx.textAlign = (this.xRorate || this.xRotate) ? 'right' : 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = this.axisColor;
    for (let i = 0; i < this.labels.length; i++) {
        let text = this.labels[i];
        let x = this.leftPadding + this.xLength * (i + 1) + 0.5;
        let y = this.canvas.height - this.bottomPadding;
        if (this.showGrid) {
            // 绘制网格线
            ctx.strokeStyle = this.gridColor;
            ctx.moveTo(x, y);
            ctx.lineTo(x, this.topPadding + S10);
        } else {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - S5);
        }
        ctx.stroke();
        ctx.save();
        // 允许文本旋转
        ctx.translate(x - this.xLength / 2, y + S5);
        if (this.xRorate) ctx.rotate(-this.xRorate * Math.PI / 180);
        else ctx.rotate(-this.xRotate * Math.PI / 180);
        ctx.fillText(text, 0, 0);
        ctx.restore();
    }
}
  // 绘制X轴
  drawXAxis() {
    let ctx = this.ctx;
    let y = this.canvas.height - this.bottomPadding + 0.5;
    // x轴坐标点
    ctx.beginPath();
    ctx.strokeStyle = this.axisColor;
    ctx.moveTo(this.leftPadding, y);
    ctx.lineTo(this.canvas.width - this.rightPadding, y);
    ctx.stroke();
    this.drawXPoint();
  }
  // 绘制Y轴
  drawYAxis() {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.strokeStyle = this.axisColor;
    ctx.moveTo(this.leftPadding - 0.5, this.canvas.height - this.bottomPadding + 0.5);
    ctx.lineTo(this.leftPadding - 0.5, this.topPadding + 0.5);
    ctx.stroke();
    this.drawYPoint();
  }
}
export default myChart