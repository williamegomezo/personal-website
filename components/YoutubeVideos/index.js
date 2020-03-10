import axios from 'axios'
import moment from 'moment'

const VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_KEY = process.env.YOUTUBE_KEY || ''
const CHANNEL_ID = process.env.CHANNEL_ID || ''

const YoutubeVideos = {
  props: ['content'],
  data() {
    return {
      videos: []
    }
  },
  methods: {
    fetchVideos() {
      axios
        .get(VIDEOS_URL, {
          params: {
            part: 'snippet',
            key: YOUTUBE_KEY,
            type: 'video',
            channelId: CHANNEL_ID
          }
        })
        .then(this.mapVideos)
    },
    mapVideos(youtubeResponse) {
      this.videos = youtubeResponse.data.items.map(({ snippet }) => ({
        published: moment(snippet.publishedAt).format('llll'),
        title: snippet.title,
        description: snippet.description,
        image: {
          sm: snippet.thumbnails.default.url,
          md: snippet.thumbnails.medium.url,
          lg: snippet.thumbnails.high.url
        }
      }))
    }
  },
  mounted() {
    this.fetchVideos()
  }
}

export default YoutubeVideos
