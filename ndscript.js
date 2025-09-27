const express = require('express');
const fetch = require('node-fetch'); // ✅ this fixes the error
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

const chatname = 'chatbot';
const API_URL = `https://apiv2.wacto.ai/v1/chatbots/${chatname}/`;
const TOKEN = 'Bearer U2FsdGVkX1/EJGYti1Wjmx78bUTRMbXBqKxtBvozDVtS7zwwqE51KJPS9hF0i65Lbl8vERphaf/ymMSOY+cBhRB5aguEtxDSyQ4Kw/KwJnUCHwEOrp6elgJjkznNi2q9i5pKBNvILsnJib80SRrlbq3IE7IYg41rm7PzPxhMc8uRe3Foex/kmtkgkYHSYUiX3isP0fLPXj0l7Mjb2Ebdbanl3JJZpQIYPVWnlwNFFlls+5MYJaibcx3XClfHm6Tf0e4dCzhcr6mQ3X6YFg8RV+bR0f1tJL7miiOKIhW5EVVbPFLk4Cs78cm/wBf5e8hX8oapLbVoj/oJNVJk75R7xGvHB2y8+o2pWTJFH1Uwch9P1jIyT2LxuCsM81dUZoJp8dAQcbtmKNzNITM7m8bgXK07OY/X248BGbMs64PAobhGjpVVYnjvhW1RApB3qh2g+0Nkfo6iZ3hPUUqZFjlbyJBDShKJVnn/HsC7XyqwvHwAO7lxkxtwXU4lChDVyr++a2U5rCQsLT4VUNVopjWXUYvYvYqJS1LpwdPSp2sllHWMrIpQABmbD8k8+qae6W90Vn8qV3UUcjv5sjF3zJXhyXdOOjyOkWwSi40rV2Z6VGMNWlHL0XZ9uBnAwoRMjT8FTfikN1AHXestkMInEphgWVucfNkB1PcCeQ0fUgNdWNyRaXoqM+j6Z4agRhOBvTvnq6zbDxwF7ggoclbMiDUrd1+EYg75z1cIPCwAlnO24z6QwREyw5WiBIkYytLRg1l+Pgrzf7Gf/TxE9qeZB3gLTJEJp3gO3ComiIkcoOhoTfc5oMHmH/ywoFIAzkD5fNwv6zZ8TtR3Y9Y3OKyprIyXyNPEYLPE+LeXnBe1KhsnctHN4s8P+9Jo2wWXNZ4YGSPz0DcqTNKLgeCA5Z/qXnaNv8d2nfUh93+vOsaE2nbdvXI='; // Replace with your actual token

app.get('/get-flow', async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', response.status, errorText);
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
  