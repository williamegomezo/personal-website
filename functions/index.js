const axios = require('axios');

exports.triggerGithubAction = async (req, res) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.REPO_OWNER;
  const REPO_NAME = process.env.REPO_NAME;

  // Extraer el título del post si viene de Hashnode para un nombre personalizado
  const postTitle = req.body.data?.publication?.post?.title;
  const runMessage = postTitle 
    ? `Blog Post: ${postTitle}` 
    : 'New blog post in Hashnode';

  try {
    await axios.post(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`,
      { 
        event_type: 'new_blog_post',
        client_payload: {
          run_name: runMessage
        }
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Firebase-Cloud-Function'
        },
      }
    );
    console.log(`GitHub Action triggered: ${runMessage}`);
    res.status(200).send('GitHub Action Triggered');
  } catch (error) {
    console.error('Error triggering GitHub Action:', error.response ? error.response.data : error.message);
    res.status(500).send('Error triggering GitHub');
  }
};
