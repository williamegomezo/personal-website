import axios from 'axios'

const GITHUB_API = 'https://api.github.com/repos/williamegomezo'
const REPO_TALKS = process.env.REPO_TALKS || ''

const Talks = {
  props: ['content'],
  data() {
    return {
      talks: []
    }
  },
  methods: {
    fetchTalks() {
      axios.get(`${GITHUB_API}/${REPO_TALKS}/contents/`).then(this.mapTalks)
    },
    mapTalks(githubResponse) {
      this.talks = githubResponse.data
        .filter((talk) => talk.type === 'dir')
        .map((talk) => ({
          title: talk.name,
          link: talk.html_url
        }))
    }
  },
  mounted() {
    this.fetchTalks()
  }
}

export default Talks
