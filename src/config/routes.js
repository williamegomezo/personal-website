import pagesContent from 'content/pages/index.yaml'
import * as Pages from 'pages'

const routes = pagesContent.map(page => {
  console.log(page.content)
  return {
    path: page.path,
    component: Pages[page.component],
    meta: {
      title: page.title
    },
    props: { content: page.content }
  }
})

export default routes
