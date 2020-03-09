const boxHeigth = 150
const boxMargin = 50
const cardSeparation = 100

const BioTimeline = {
  props: ['content'],
  data() {
    return {
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
        top: `${index * cardSeparation}px`
      }
    }
  },
  computed: {
    bioHeight() {
      return {
        height: `${(this.cards.length - 1) * cardSeparation +
          boxHeigth +
          2 * boxMargin}px`
      }
    },
    bioSizes() {
      return {
        '--box-height': `${boxHeigth}px`,
        '--margin-box': `${boxMargin}px`,
        '--card-separation': `${cardSeparation}`
      }
    }
  }
}

export default BioTimeline
