<template>
  <div class="m-guide-header row p-2">
    <div class="col p-2">
      <h4>
        <strong>Annotate actions</strong>
      </h4>
      <span>
        In this HIT you will annotate <strong>actions</strong> of this image.
      </span>
      <ul>
        <li>Draw a rectangle around the entire region the action is happening including all its related objects.</li>
        <li>Press the mouse button. hold the button while you are moving the mouse and release it to ﬁnish. Name the action.</li>
        <li>Repeat until you mark all actions which are clearly visible in the image.</li>
        <li>Remove an annotation if you did a mistake.</li>
        <li>If an image cannot be annotated, provide the reason and move to the next HIT.</li>
      </ul>
      <span>Please read the <a href="#" class="text-primary">guidelines</a> carefully before you start annotation. Your submission will not be accepted it it doesn't follow the guidelines.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuideHeader',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .m-guide-header .col {
    border: 4px solid #666666;
  }
</style>
