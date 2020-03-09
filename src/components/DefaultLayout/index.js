import Layout from './layout'

const Component = {
  name: 'DefaultLayout',
  created () {
    this.$parent.$emit('update:layout', Layout)
  },
  render () {
    return this.$slots.default[0]
  }
}

export default Component
