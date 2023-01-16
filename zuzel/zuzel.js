
console.log("qweqwe");
let canvas1 = document.getElementById("canvas1")
let ctx1 = canvas1.getContext("2d")

ctx1.beginPath()
ctx1.arc(256, 256, 256, Math.PI * 1.5, Math.PI / 2, true)

ctx1.lineWidth = 4;
ctx1.strokeStyle = "#369";
ctx1.stroke();
