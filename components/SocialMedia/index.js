const SocialMedia = {
  props: ['content'],
  data() {
    return {
      networks: this.content.networks
    }
  }
}

export default SocialMedia
