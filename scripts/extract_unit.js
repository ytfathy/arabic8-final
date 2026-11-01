import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

export async function sliceAndExtract(name, pageStart, pageEnd, prompt) {
  console.log(`Processing [${name}] PDF pages ${pageStart} to ${pageEnd}...`);
  const srcBytes = fs.readFileSync('public/assets/aistudio/Arabic_language_prep2_t1_e981afd9.pdf');
  const srcDoc = await PDFDocument.load(srcBytes);
  
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
  
  for (let attempt = 1; attempt <= 3; attempt++) {
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
      console.log(`Attempt ${attempt} failed: ${e.message}`);
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
  throw new Error(`Failed to extract ${name}`);
}

async function run() {
  const res = await sliceAndExtract('P15_18', 15, 18, 'ما هو عنوان الدرس وما هي أول فقرتين وأرقام الصفحات المطبوعة في الأسفل؟');
  console.log('Result:\n', res);
}

run().catch(console.error);
