$(canvas).on('mousedown', function (e) {
  last_mousex = parseInt(e.clientX - canvasx)
  last_mousey = parseInt(e.clientY - canvasy)
  mousedown = true
})

//Mouseup
$(canvas).on('mouseup', function (e) {
  mousedown = false
})

//Mousemove
$(canvas).on('mousemove', function (e) {
  mousex = parseInt(e.clientX - canvasx)
  mousey = parseInt(e.clientY - canvasy)
  if (mousedown) {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
    this.context.beginPath()
    var width = mousex - last_mousex
    var height = mousey - last_mousey
    this.context.rect(last_mousex, last_mousey, width, height)
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 10
    this.context.stroke()
  }
})
