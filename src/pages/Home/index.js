import { DefaultLayout, Hero, MediumPosts } from 'components'
import template from './index.html'

const Component = {
  props: ['content'],
  template,
  components: {
    DefaultLayout,
    Hero,
    MediumPosts
  }
}

export default Component
