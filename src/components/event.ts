
interface Mouse{
    x:number,
    y:number
}

let  mouse:Mouse
const captureMouse = function(element:any){
  var mouse = {x: 0, y: 0, event: null},
  body_scrollLeft = document.body.scrollLeft,
  element_scrollLeft = document.documentElement.scrollLeft,
  body_scrollTop = document.body.scrollTop,
  element_scrollTop = document.documentElement.scrollTop,
  offsetLeft = element.offsetLeft,
  offsetTop = element.offsetTop;

element.addEventListener('mousemove', function (event:any) {
var x, y;

if (event.pageX || event.pageY) {
  x = event.pageX;
  y = event.pageY;
} else {
  x = event.clientX + body_scrollLeft + element_scrollLeft;
  y = event.clientY + body_scrollTop + element_scrollTop;
}
x -= offsetLeft;
y -= offsetTop;

mouse.x = x;
mouse.y = y;
mouse.event = event;
}, false);

return mouse;
}
const mousedown = function(){
  console.log(mouse.x,mouse.y)
}
const mousemove = function(){
  
}


export const CanvasEvent = function (el:any){
  mouse = captureMouse(el)
  el.addEventListener('mousedown',mousedown)
  el.addEventListener('mousemove',mousemove)
}


export default CanvasEvent