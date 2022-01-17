//屏幕分辨率 0.25 - 5
export const DPI = window.devicePixelRatio || 1;
export const S10 = 10 * DPI;
export const S5 = S10 / 2;

//初始化canvas
export const initCanvas = function(el:any){
  let canvas = document.querySelector(el);
  let width = canvas.parentNode.clientWidth;
  let height = canvas.parentNode.clientHeight;
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  canvas.width = width*DPI
  canvas.height = height*DPI
  return canvas
}

export const getYSpace = function(datasets:any, yEqual:any){
  let arr = datasets.map((item:any) => {
    return item.data.reduce((prev:any, current:any) => {
        return prev > current ? prev : current;
    });
  });
  let len = Math.ceil(Math.max(...arr) / yEqual);
  let pow = len.toString().length - 1;
  pow = pow > 2 ? 2 : pow;
  return Math.ceil(len / Math.pow(10, pow)) * Math.pow(10, pow);
}