// api/generate-pdf.js
//
// Renders the exact HTML sent from the browser into a PDF using real headless
// Chromium (the same rendering engine as "Salvar como PDF" in Chrome).
// This replaces screenshot-based PDF generation, which can fail or render
// blank/black on some phones.
//
// SETUP (one time):
// 1. Copy this file to:  api/generate-pdf.js  in the kmp-forms repo
// 2. In the repo root, run:
//      npm install puppeteer-core @sparticuz/chromium
// 3. Commit and push. Vercel will deploy it automatically at:
//      https://kmp-forms.vercel.app/api/generate-pdf
// 4. If a request times out on Vercel's free (Hobby) plan, add a
//    vercel.json with a longer maxDuration (Hobby allows up to 60s):
//      {
//        "functions": {
//          "api/generate-pdf.js": { "maxDuration": 30 }
//        }
//      }

const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { html, filename } = req.body || {};
  if (!html) {
    res.status(400).json({ error: 'Missing "html" in request body' });
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 900, height: 1200 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 20000 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="' + (filename || 'documento.pdf') + '"'
    );
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error('generate-pdf error:', err);
    res.status(500).json({ error: 'PDF generation failed', details: String(err) });
  } finally {
    if (browser) await browser.close();
  }
};
