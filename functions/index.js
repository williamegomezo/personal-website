const axios = require('axios');

exports.triggerGithubAction = async (req, res) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.REPO_OWNER;
  const REPO_NAME = process.env.REPO_NAME;
  const secret = process.env.HASHNODE_WEBHOOK_SECRET;
  const signature = req.headers['x-hashnode-signature'];

  // 1. Validar que la firma existe
  if (!signature) {
    return res.status(401).send('No signature provided');
  }

  // 2. Verificar la autenticidad (HMAC SHA256)
  // El formato de Hashnode suele ser t=timestamp,v1=hash
  const parts = signature.split(',');
  const timestamp = parts.find(p => p.startsWith('t=')).split('=')[1];
  const hashReceived = parts.find(p => p.startsWith('v1=')).split('=')[1];
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${JSON.stringify(req.body)}`)
    .digest('hex');

  if (hashReceived !== expectedSignature) {
    console.error('Invalid signature match');
    return res.status(403).send('Forbidden: Invalid signature');
  }

  // Extraer el título del post si viene de Hashnode para un nombre personalizado
  const postTitle = req.body.data?.publication?.post?.title;
  const runMessage = postTitle
    ? `Blog Post: ${postTitle}`
    : 'New blog post in Hashnode';

  try {
    await axios.post(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`,
      {
        event_type: 'hashnode_blog_action',
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
