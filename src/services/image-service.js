
class ImageService {
  constructor () {
    this.images = [
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
    ]
  }

  getAll () {
    return this.images
  }

  getIndexById (id) {
    for (let i = 0; i < this.images.length; i++) {
      const item = this.images[i]
      if (item.id === id) {
        return i
      }
    }
  }
}

export default new ImageService()
