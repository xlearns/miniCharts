# 知识储备

## 获取屏幕分辨率缩放比DPI【0.25-5】
- `window.devicePixelRatio` 默认为1

## canvas跟随父类大小
```js
  const DPI = window.devicePixelRatio || 1;

  let canvas = document.querySelector(el);
  let width = canvas.parentNode.clientWidth;
  let height = canvas.parentNode.clientHeight;
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  canvas.width = width*DPI
  canvas.height = height*DPI
  return canvas
```

## 点、线API
- moveTo
- LineTo

# canvas绘制箭头

# canvas绘制多边形函数

# canvas绘制坐标系

## bar

## line

## pie

## 散点图

## 雷达图

## 关系图 

## canvas图片

## canvas动画

## 点击
- canvas API没有提供监听每个元素的机制，这就需要一些处理。处理的思路是：监听事件的作用坐标（如点击时候的坐标），判断在哪个绘制元素的范围中，如果在某个元素中，这个元素就监听该事件。3