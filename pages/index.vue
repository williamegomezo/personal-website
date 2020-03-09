<template>
  <main>
    <component
      :is="component.default.type"
      v-for="component in content.components"
      :key="component.default.type"
      :content="component.default.content"
    ></component>
  </main>
</template>

<script>
import * as components from '@/components'

export default {
  components: {
    ...components
  },
  data() {
    const { content } = this.$route.matched[0].props
    return {
      content
    }
  },
  head() {
    return {
      title: this.$route.matched[0].props.title,
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Sen:100,300,400,500,700,900'
        }
      ]
    }
  }
}
</script>

<style></style>
