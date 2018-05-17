<template>
  <div class="m-home row">
    <div class="col-6  p-2">
      <img src="/static/images/img1.jpg"  class="img-fluid">
    </div>
    <div class="col-6 p-4">
      <div class="p-2">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radios" id="radios1" value="option1" checked>
          <label class="form-check-label" for="radios1">
            At least 2 Actions can be annotated in the image
          </label>
        </div>
        <p></p>
        <div class="border p-2">
          <div>
            <span>Action1</span>
            <input type="text" placeholder="label" class="input-label" value="holding">
            <input type="number" placeholder="x1" value="20" class="input-cordinate">
            <input type="number" placeholder="y1" value="30" class="input-cordinate">
            <input type="number" placeholder="x2" value="40" class="input-cordinate">
            <input type="number" placeholder="y2" value="42" class="input-cordinate">
            <button type="button" class="close btn-rm-action" aria-label="Close">
              <span aria-hidden="true" class="text-danger">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <div class="p-2">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radios" id="radios2" value="option2">
          <label class="form-check-label" for="radios2">
            Actions cannot be annotated in the image
          </label>
        </div>
        <p></p>
        <div class="border p-2">
          <div class="row">
            <div class="col-2">
              <span>Reason</span>
            </div>
            <div class="col-10">
              <div class="form-check">
                <input  v-model="reason" class="form-check-input" type="radio" name="radiosReason" id="radiosReason1" value="Too crowed" checked>
                <label class="form-check-label" for="radiosReason2">
                  Too crowed
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
                      <input id="inputOther" type="text" class="form-control" :disabled="reason != 'other'">
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2">
        <button type="button" class="btn btn-secondary float-right">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      reason: ''
    }
  }
}
</script>

<style scoped>
#inputOther {
  height: 30px;
}
.input-cordinate {
  width: 40px;
}
.input-label {
  width: 140px;
  margin-left: 20px;
  margin-right: 20px;
}
.btn-rm-action {
  margin-right: 30px;
  font-size: 1.8em;

}
</style>
