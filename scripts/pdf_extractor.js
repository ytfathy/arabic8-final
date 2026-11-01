import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

let cachedSrcDoc = null;

export async function getSrcDoc() {
  if (!cachedSrcDoc) {
    console.log('Loading 102MB PDF once into memory...');
    const srcBytes = fs.readFileSync('public/assets/aistudio/Arabic_language_prep2_t1_e981afd9.pdf');
    cachedSrcDoc = await PDFDocument.load(srcBytes);
    console.log('PDF loaded into memory successfully!');
  }
  return cachedSrcDoc;
}

export async function slicePages(pageStart, pageEnd, outputPath) {
  const srcDoc = await getSrcDoc();
  const newDoc = await PDFDocument.create();
  const pageIndices = [];
  for (let p = pageStart - 1; p <= pageEnd - 1; p++) {
    if (p >= 0 && p < srcDoc.getPageCount()) {
      pageIndices.push(p);
    }
  }
  const copied = await newDoc.copyPages(srcDoc, pageIndices);
  for (const page of copied) newDoc.addPage(page);
  const pdfBytes = await newDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  return pdfBytes;
}

export async function callGeminiOnPdf(pdfBytes, prompt) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { mimeType: 'application/pdf', data: Buffer.from(pdfBytes).toString('base64') } },
              { text: prompt }
            ]
          }
        ]
      });
      return res.text;
    } catch (e) {
      console.log(`Gemini attempt ${attempt} error: ${e.message}`);
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
  throw new Error('Failed after 4 attempts');
}
