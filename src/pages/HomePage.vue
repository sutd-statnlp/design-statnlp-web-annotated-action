<template>
  <div class="m-home">
    <form v-on:submit.prevent="submitAction">
    <div class="row justify-content-center">
        <canvas id="m-canvas" width="540" height="320"></canvas>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
         <div class="p-2">
          <div class="form-check">
            <input v-model="radioOption" class="form-check-input" type="radio" name="radios" id="radios1" value="action" checked >
            <label class="form-check-label" for="radios1">
              At least 2 Actions can be annotated in the image (start by drawing bounding box on the image)
            </label>
          </div>
          <p></p>
          <div class="border p-2" :class="radioOption == 'action' ? '' : 'disabledDiv'">
            <div class="pt-1" v-if="mousedown">
              <span>Action{{actions.length + 1}}</span>
              <input type="text" placeholder="label" class="input-label" v-model="currentAction.label">
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
              <input type="text" placeholder="label" class="input-label m-input-label" v-model="item.label" required>
              <input type="number" placeholder="x1" min="0" class="input-cordinate" v-model="item.x1">
              <input type="number" placeholder="y1" min="0" class="input-cordinate" v-model="item.y1">
              <input type="number" placeholder="x2" min="0" class="input-cordinate" v-model="item.x2">
              <input type="number" placeholder="y2" min="0" class="input-cordinate" v-model="item.y2">
              <button type="button" class="close btn-rm-action" aria-label="Close" @click="removeAction(index)">
                <span aria-hidden="true" class="text-danger">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
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
                  <label class="form-check-label" for="radiosReason1">
                    Too crowded
                  </label>
                </div>
                <div class="form-check">
                  <input  v-model="reason" class="form-check-input" type="radio" name="radiosReason" id="radiosReason2" value="No action/mutilple actions happening">
                  <label class="form-check-label" for="radiosReason2">
                    Not sufficient enough actions happening for annotation
                  </label>
                </div>
                <div class="form-check">
                  <div class="row">
                    <div class="col-2">
                      <input v-model="reason" class="form-check-input" type="radio" name="radiosReason" value="other" id="radiosReason3">
                      <label class="form-check-label" for="radiosReason3">
                        Other
                      </label>
                    </div>
                    <div class="col-6">
                        <input id="inputOther" v-model="reasonOther" type="text" class="form-control" :disabled="reason != 'other'" :required="reason == 'other' ? true : false">
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
        <div class="p-2">
          <div v-if="error" class="alert alert-warning" role="alert">
            {{error}}
          </div>
        </div>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
import DownloadService from '@/services/download-service'

export default {
  name: 'HomePage',
  data () {
    return {
      resize: 6,
      images: [
        {
          id: '1',
          name: 'img1.jpg',
          w: 3648,
          h: 2736,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '2',
          name: 'img2.jpg',
          w: 4608,
          h: 3456,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '8',
          name: 'img8.jpg',
          w: 1024,
          h: 768,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '19',
          name: 'img19.jpg',
          w: 2700,
          h: 1801,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '22',
          name: 'img22.jpg',
          w: 1500,
          h: 1000,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '28',
          name: 'img28.jpg',
          w: 7360,
          h: 4912,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '31',
          name: 'img31.jpg',
          w: 1024,
          h: 768,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '39',
          name: 'img39.jpg',
          w: 2000,
          h: 1329,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '197',
          name: 'img197.jpg',
          w: 592,
          h: 394,
          hasActions: false,
          actions: [],
          reason: ''
        },
        {
          id: '217',
          name: 'img217.jpg',
          w: 1024,
          h: 819,
          hasActions: false,
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
      reasonOther: '',
      error: null
    }
  },
  mounted () {
    this.canvas = document.getElementById('m-canvas')
    this.context = this.canvas.getContext('2d')
    this.draw(0, 0, 0, 0, true)

    let coordinates = [
      {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }
    ]
    this.drawByCoordinateIndex(coordinates, 0)
    this.context.clearRect(0, 0, 400, 300)

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
      let rect = this.canvas.getBoundingClientRect()
      lastMouseX = parseInt(e.clientX - rect.left)
      lastMouseY = parseInt(e.clientY - rect.top)
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
      let rect = this.canvas.getBoundingClientRect()
      mousex = parseInt(e.clientX - rect.left)
      mousey = parseInt(e.clientY - rect.top)
      if (this.mousedown) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.beginPath()
        var width = mousex - lastMouseX
        var height = mousey - lastMouseY
        this.draw(lastMouseX, lastMouseY, width, height)
        this.currentAction = {
          label: '',
          x1: lastMouseX * this.resize,
          y1: lastMouseY * this.resize,
          x2: mousex * this.resize,
          y2: mousey * this.resize
        }
      }
    }.bind(this))
  },
  methods: {
    drawByCoordinateIndex (coordinates, index) {
      let object = coordinates[index]
      let x = object.x
      let y = object.y
      let w = object.w
      let h = object.h
      this.draw(x, y, w, h)
    },
    configCanvasResize (imageWidth) {
      if (imageWidth <= 1000) {
        this.resize = 1
      } else if (imageWidth <= 2000) {
        this.resize = 2
      } else if (imageWidth >= 6000) {
        this.resize = 10
      } else {
        this.resize = 6
      }
    },
    draw (x, y, w, h, isImageChanged) {
      if (isImageChanged) {
        let image = this.images[this.currentImageIndex]
        this.imageObj.src = './static/images/' + image.name
        this.configCanvasResize(image.w)
        this.context.canvas.width = image.w / this.resize
        this.context.canvas.height = image.h / this.resize
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
      if (this.radioOption === 'action' && this.actions.length < 2) {
        this.error = 'At least 2 actions !'
        return
      }
      if (this.currentImageIndex >= this.images.length - 1) {
        return
      }
      if (!this.validateCoordinates()) {
        this.error = 'Coordinates (0,0,0,0) is not an accepted !'
        return
      }
      this.saveData()
      this.currentImageIndex++
      this.loadDefault()
    },
    saveData () {
      if (this.radioOption === 'action') {
        this.images[this.currentImageIndex].actions = this.actions
        this.images[this.currentImageIndex].hasActions = true
      } else {
        this.images[this.currentImageIndex].reason = this.reason === 'other' ? this.reasonOther : this.reason
        this.images[this.currentImageIndex].hasActions = false
      }
    },
    saveJson () {
      this.saveData()
      DownloadService.downloadJson(this.images, 'images.json')
    },
    loadDefault () {
      this.error = null
      this.mousedown = false
      this.radioOption = 'action'
      this.reason = 'Too crowded'
      this.reasonOther = ''
      this.draw(0, 0, 0, 0, true)
      this.actions = []
    },
    validateCoordinates () {
      let result = true
      for (let index = 0; index < this.actions.length; index++) {
        const a = this.actions[index]
        if (a.x1 === 0 && a.y1 === 0 && a.x2 === 0 && a.y2 === 0) {
          result = false
          break
        }
      }
      return result
    }
  },
  watch: {
    radioOption (value) {
      if (value === 'action') {
        $('.m-input-label').attr('required', true)
      } else {
        $('.m-input-label').attr('required', false)
      }
    }
  }
}
</script>

<style scoped>
#inputOther {
  height: 30px;
}
.input-cordinate {
  width: 13.6%;
}
.input-label {
  width: 18%;
  margin-right: 10px;
}
.btn-rm-action {
  margin-right: 2px;
  font-size: 1.8em;

}
.disabledDiv {
    pointer-events: none;
    opacity: 0.4;
    background-color: #CBCBCB;
}
</style>
