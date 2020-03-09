import moment from 'moment'
import { parseStringPromise } from 'xml2js'

import template from './index.html'
import './index.scss'

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const MEDIUM_URL = 'https://medium.com/feed/@williamegomezo'

const MediumPosts = {
  name: 'medium-posts',
  template,
  data () {
    return {
      mediumPosts: []
    }
  },
  methods: {
    getMediumStories () {
      const mediumPromise = new Promise((resolve, reject) => {
        fetch(`${PROXY}${MEDIUM_URL}`)
          .then(r => r.text())
          .then(response => {
            parseStringPromise(response)
              .then(result => {
                resolve(this.getStoriesFromMediumResponse(result))
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(() => console.log("Couldn't get medium posts"))
      })
      return mediumPromise
    },
    getStoriesFromMediumResponse (mediumResponse) {
      return mediumResponse.rss.channel[0].item.map(post => {
        return {
          title: post.title[0],
          link: post.link[0],
          categories: post.category,
          content: post['content:encoded'][0],
          updated: moment(post['atom:updated'][0]).format('llll'),
          published: moment(post.pubDate[0]).format('llll')
        }
      })
    }
  },
  mounted () {
    this.getMediumStories()
      .then((posts) => {
        this.mediumPosts = posts
      })
      .catch(console.log)
  }
}

export default MediumPosts
