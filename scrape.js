import zlib from 'zlib';
import https from 'https';

https.get('https://paritybitsecurity.com/', (response) => {
  const chunks = [];
  response.on('data', (chunk) => chunks.push(chunk));
  response.on('end', () => {
    const buffer = Buffer.concat(chunks);
    const encoding = response.headers['content-encoding'];
    let text = '';
    if (encoding === 'gzip') {
      text = zlib.gunzipSync(buffer).toString('utf-8');
    } else if (encoding === 'br') {
      text = zlib.brotliDecompressSync(buffer).toString('utf-8');    
    } else {
      text = buffer.toString('utf-8');
    }
    const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyText = bodyMatch ? bodyMatch[1] : text;
    console.log(bodyText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  });
}).on('error', (e) => {
  console.error(e);
});
