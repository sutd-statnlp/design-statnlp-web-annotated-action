<template>
  <div class="m-home row">
    <div class="col-6  p-2">
      <canvas id="m-canvas" width="540" height="320"></canvas>
    </div>
    <div class="col-6 ">
      <form v-on:submit.prevent="submitAction">
      <div class="p-2">
        <div class="form-check">
          <input v-model="radioOption" class="form-check-input" type="radio" name="radios" id="radios1" value="action" checked >
          <label class="form-check-label" for="radios1">
            At least 2 Actions can be annotated in the image, start by drawing bounding box on the image
          </label>
        </div>
        <p></p>
        <div class="border p-2" :class="radioOption == 'action' ? '' : 'disabledDiv'">
          <div class="pt-1" v-if="mousedown">
            <span>Action{{actions.length + 1}}</span>
            <input type="text" placeholder="label" class="input-label" value="holding" v-model="currentAction.label">
            <input type="number" placeholder="x1" value="20" class="input-cordinate" v-model="currentAction.x1">
            <input type="number" placeholder="y1" value="30" class="input-cordinate" v-model="currentAction.y1">
            <input type="number" placeholder="x2" value="40" class="input-cordinate" v-model="currentAction.x2">
            <input type="number" placeholder="y2" value="42" class="input-cordinate" v-model="currentAction.y2">
            <button type="button" class="close btn-rm-action" aria-label="Close" @click="removeAction(index)">
              <span aria-hidden="true" class="text-danger">&times;</span>
            </button>
          </div>
          <div class="pt-1" v-for="(item, index) in actions" :key="index">
            <span>Action{{actions.length - index}}</span>
            <input type="text" placeholder="label" class="input-label" value="holding" v-model="item.label">
            <input type="number" placeholder="x1" value="20" class="input-cordinate" v-model="item.x1">
            <input type="number" placeholder="y1" value="30" class="input-cordinate" v-model="item.y1">
            <input type="number" placeholder="x2" value="40" class="input-cordinate" v-model="item.x2">
            <input type="number" placeholder="y2" value="42" class="input-cordinate" v-model="item.y2">
            <button type="button" class="close btn-rm-action" aria-label="Close" @click="removeAction(index)">
              <span aria-hidden="true" class="text-danger">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <div class="p-2">
        <div class="form-check">
          <input v-model="radioOption" class="form-check-input" type="radio" name="radios" id="radios2" value="reason">
          <label class="form-check-label" for="radios2">
            Actions cannot be annotated in the image
          </label>
        </div>
        <p></p>
        <div class="border p-2" :class="radioOption == 'reason' ? '' : 'disabledDiv'">
          <div class="row">
            <div class="col-2">
              <span>Reason</span>
            </div>
            <div class="col-10">
              <div class="form-check">
                <input  v-model="reason" class="form-check-input" type="radio" name="radiosReason" id="radiosReason1" value="Too crowded" checked>
                <label class="form-check-label" for="radiosReason2">
                  Too crowded
                </label>
              </div>
              <div class="form-check">
                <input  v-model="reason" class="form-check-input" type="radio" name="radiosReason" id="radiosReason2" value="No action/mutilple actions happening">
                <label class="form-check-label" for="radiosReason2">
                  No action/mutilple actions happening
                </label>
              </div>
              <div class="form-check">
                <div class="row">
                  <div class="col-2">
                    <input v-model="reason" class="form-check-input" type="radio" name="radiosReason" value="other" id="radiosReason2">
                    <label class="form-check-label" for="radiosReason2">
                      Other
                    </label>
                  </div>
                  <div class="col-6">
                      <input id="inputOther" v-model="reasonOther" type="text" class="form-control" :disabled="reason != 'other'">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2">
        <button type="submit" class="btn btn-secondary float-right">Submit</button>
        <button type="button" class="btn btn-secondary" @click="saveJson">Save JSON</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import DownloadService from '@/services/download-service'

export default {
  name: 'HomePage',
  data () {
    return {
      images: [
        {
          id: '1',
          name: 'img1.jpg',
          w: 3648,
          h: 2736,
          actions: [],
          reason: ''
        },
        {
          id: '2',
          name: 'img2.jpg',
          w: 4608,
          h: 3456,
          actions: [],
          reason: ''
        }
      ],
      currentImageIndex: 0,
      canvas: null,
      context: null,
      imageObj: new Image(),
      actions: [],
      currentAction: {
        label: '',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      mousedown: false,
      radioOption: 'action',
      reason: 'Too crowded',
      reasonOther: ''
    }
  },
  mounted () {
    this.canvas = document.getElementById('m-canvas')
    this.context = this.canvas.getContext('2d')
    this.draw(0, 0, 0, 0, true)

    let coordinates = [
      {
        x: 20,
        y: 30,
        w: 40,
        h: 42
      }
    ]
    this.drawByCoordinateIndex(coordinates, 0)
    this.context.clearRect(0, 0, 400, 300)

    let canvasx = $(this.canvas).offset().left
    let canvasy = $(this.canvas).offset().top
    let lastMouseX = 0
    let lastMouseY = 0
    let mousex = 0
    let mousey = 0
    this.mousedown = false

    // Mousedown
    $(this.canvas).on('mousedown', function (e) {
      if (this.radioOption !== 'action') {
        return
      }
      lastMouseX = parseInt(e.clientX - canvasx)
      lastMouseY = parseInt(e.clientY - canvasy)
      this.mousedown = true
    }.bind(this))

    // Mouseup
    $(this.canvas).on('mouseup', function (e) {
      if (this.radioOption !== 'action') {
        return
      }
      this.mousedown = false
      this.actions.unshift(this.currentAction)
      this.currentAction = {
        label: '',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      }
    }.bind(this))

    // Mousemove
    $(this.canvas).on('mousemove', function (e) {
      if (this.radioOption !== 'action') {
        return
      }
      mousex = parseInt(e.clientX - canvasx)
      mousey = parseInt(e.clientY - canvasy)
      if (this.mousedown) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.beginPath()
        var width = mousex - lastMouseX
        var height = mousey - lastMouseY
        this.draw(lastMouseX, lastMouseY, width, height)
        this.currentAction = {
          label: '',
          x1: lastMouseX,
          y1: lastMouseY,
          x2: mousex,
          y2: mousey
        }
      }
    }.bind(this))
  },
  methods: {
    drawByCoordinateIndex (coordinates, index) {
      let object = coordinates[index]
      let x = object.x / 2
      let y = object.y / 2
      let w = object.w / 2
      let h = object.h / 2
      this.draw(x, y, w, h)
    },
    draw (x, y, w, h, isImageChanged) {
      if (isImageChanged) {
        let image = this.images[this.currentImageIndex]
        this.imageObj.src = './static/images/' + image.name
        this.context.canvas.width = image.w / 16 * 1.6
        this.context.canvas.height = image.h / 16 * 1.6
        this.imageObj.onload = function () {
          this.context.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height)
        }.bind(this)
      }
      this.context.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height)
      this.context.rect(x, y, w, h)
      this.context.strokeStyle = '#41F748'
      this.context.setLineDash([6])
      this.context.lineWidth = 5
      this.context.stroke()
    },
    removeAction (index) {
      this.actions.splice(index, 1)
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height)
    },
    submitAction () {
      if (this.currentImageIndex >= this.images.length - 1 || this.actions.length < 2) {
        return
      }
      this.saveData()
      this.currentImageIndex++
      this.actions = []
      this.draw(0, 0, 0, 0, true)
    },
    saveData () {
      if (this.radioOption === 'action') {
        this.images[this.currentImageIndex].actions = this.actions
      } else {
        this.images[this.currentImageIndex].reason = this.reason === 'other' ? this.reasonOther : this.reason
      }
    },
    saveJson () {
      this.saveData()
      DownloadService.downloadJson(this.images, 'images.json')
    }
  }
}
</script>

<style scoped>
#inputOther {
  height: 30px;
}
.input-cordinate {
  width: 50px;
}
.input-label {
  width: 140px;
  margin-left: 20px;
  margin-right: 20px;
}
.btn-rm-action {
  margin-right: 20px;
  font-size: 1.8em;

}
.disabledDiv {
    pointer-events: none;
    opacity: 0.4;
    background-color: #CBCBCB;
}
</style>
