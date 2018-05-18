class DownloadService {
  downloadJson (data, filename) {
    data = JSON.stringify(data, null, 2)
    this.download(data, filename, 'text/json')
  }
  download (data, filename, type) {
    if (!data) {
      console.error('No data')
      return
    }
    if (!filename) {
      filename = 'data'
    }
    let blob = new Blob([data], {
      type: type
    })

    // FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      var e = document.createEvent('MouseEvents')
      var a = document.createElement('a')

      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = [type, a.download, a.href].join(':')
      e.initEvent('click', true, false, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  }
}

export default new DownloadService()
