const boxHeigth = { sm: 200, md: 150 }
const boxMargin = { sm: 20, md: 50 }
const cardSeparation = { sm: 250, md: 100 }
const ellipsisHeight = { sm: 50, md: 100 }

const BioTimeline = {
  props: ['content'],
  data() {
    return {
      mq: 'sm',
      cards: this.content.cards
    }
  },
  methods: {
    getCardOrientationClass(index) {
      return index % 2 === 0
        ? 'bio-timeline__card--left'
        : 'bio-timeline__card--right'
    },
    getCardOffset(index) {
      return {
        top: `${index * cardSeparation[this.mq]}px`
      }
    },
    setViewport(evt) {
      if (!evt) {
        evt = { matches: document.documentElement.clientWidth < 768 }
      }
      this.mq = evt.matches ? 'sm' : 'md'
    }
  },
  computed: {
    bioHeight() {
      return {
        height: `${(this.cards.length - 1) * cardSeparation[this.mq] +
          boxHeigth[this.mq] +
          2 * boxMargin[this.mq]}px`
      }
    },
    bioSizes() {
      return {
        '--box-height': `${boxHeigth[this.mq]}px`,
        '--margin-box': `${boxMargin[this.mq]}px`,
        '--ellipsis-height': `${ellipsisHeight[this.mq]}px`
      }
    }
  },
  mounted() {
    this.setViewport()
    const mql = window.matchMedia('(max-width: 768px)')
    mql.addListener(this.setViewport)
  }
}

export default BioTimeline
