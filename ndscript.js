const express = require('express');
const fetch = require('node-fetch'); // ✅ this fixes the error

const app = express();
const PORT = 3000;

const FLOW_ID = '2217407035397561';
const API_URL = `https://apiv2.wacto.ai/v1/whatsapp-flows/${FLOW_ID}/flow-json`;
const TOKEN = 'Bearer U2FsdGVkX1/RPEPgzrzS1zinsVzqgt4PH/UObKI4TFg4Bkn/XqCZznsLBmEB/nCJOUbQDmAr7K8fsFxLSq9PsRc6OsuK4fhVtJV30ZwSEmUtU7zIr62POd64MBBkN2LI0SChOieXFQ43NKb6+pSYXr1qWMd4o4Nn9kGXHSKEoJTJkh361mve0LaseZHups95nK4SDx5d3K8wa6gw3WS5SYzZELSQh1LHoYtrm7YHSIFtqB5oudik2FK4CjeRvwYCMZmRRO/3WQzLWtqLF4Ag9JsQ/ebGNX3Uur/WcKtDsYUMqMorjS0quJpog7TxaLInhebGslUtEAUce4CxXFAcbMBSvkRqHXW0qFq6UW5/Hmrt7r1fGMt1oxTNmSH0g8O3ekQnJZBH5p6CQ/19Yp0e8IZUkOSXshC/G1QXm5NHilWObvmtYrHLNscC6E72BCb2FjI6VnJ0jcuUyxa1sULw3E9ikkcdfuQaDVXCghrQK6atuug3Xo/AUWzV3cOfWvtspE3jBtaCSf+USy6gC0ZwDlAH7myFGGMJzjAHfobYqTXk0RZIRBFHSP6FIcp7u6RSWwBMs5LKi4nfR3pjtxDnYV/MXoDAKKucltWydYtt6sOooPpt9r+E9b1kZDNZBiMMywHdCW6jA8eSJWCJJPsu5yw70eYujyIxqgvgi1BBQVniBKS+6SPQuFM00Gny3PGWgrE4NSITziA94nvZ3cJTj8jsu+PEfGpnkWF04VTaMxAEPeXclZrKoGgo0WZHEKNSDiHIkuSJ5Aq5KMVeffqC8PF2UJVIc49e4bXy41lfFNLz0Yh68AebaEl5PNu5ClAiTiUONKHMkFWV9SZKHPpuRSkuFIqeYlrCnaJvUTdpmgGBm8IpOvwPXE02wGgXlutJDqGJhaGdfVQfy6j3nNLVL+NGvDYOcppg/zFR6dv40DCwwvGZOcV6Rdy4m58vkSS0sQb1ZPeSNIxcshiUdVcs2VFR7dlr3h8Vekeur33ghYr9L/MRIwBs96vnh/DKLYS2JM/SMPZZRlweYxn8cFZ4b1JV+WlyUJngoHeTI4C8t0S4VmXgrvhhSl07XQRctsWsV0srzB7SH/Ia87DWE8ALZ4cta3d50oqpHq9yG44EaePbhCGYFARMyeDUOlu+F8dM'; // Replace with your actual token

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
  