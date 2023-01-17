const express = require('express');
const qr = require('qr-image');
const app = express();

app.get('/qr', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  const fileName = 'qrcode.svg';
  const qr_svg = qr.image(url, { type: 'svg' });
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.type('svg');
  qr_svg.pipe(res);
});

app.listen(3000, () => {
  console.log('QR code generator API listening on port 3000!');
});
