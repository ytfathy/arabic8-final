import fs from 'fs';
import { extractSlice } from './pdf_extractor.js';

async function extractUnit1() {
  console.log('Extracting Reading Lesson 1: حرب أكتوبر (p15-21)...');
  const r1Prompt = `
حلل الصفحات من 15 إلى 21 من كتاب اللغة العربية للصف الثاني الإعدادي واستخرج بدقة متناهية:
1. نص الدرس كاملاً بكل فقراته وعناوينه كما ورد في الكتاب دون اختصار.
2. معاني الكلمات والمفردات مع المفرد/الجمع والمضاد كما وردت في الكتاب وفي سياق الدرس.
3. شرح الدرس والأفكار الرئيسة والدروس المستفادة.
4. جميع أسئلة الدرس وتدريبات الكتاب المطبوعة (الفهم، المفردات، الاختيار من متعدد، الصح والخطأ، الأسئلة المقالية) مع إجابات نموذجية دقيقة لكل سؤال.
أعد الناتج بتنسيق JSON نظيف وصالح فقط وفق الهيكل التالي:
{
  "id": "reading-october",
  "title": "العبور إلى المستقبل (حرب أكتوبر)",
  "category": "reading",
  "unit": "الوحدة الأولى: انتمائي قوتي",
  "pageRange": "15 - 21",
  "originalText": "النص الكامل المقسم لفقرات...",
  "paragraphs": [
    { "order": 1, "heading": "عنوان الفقرة إن وجد", "content": "نص الفقرة الكامل..." }
  ],
  "mainIdea": "الفكرة العامة للدرس",
  "lessonsLearned": ["فائدة 1", "فائدة 2"],
  "vocabulary": [
    { "word": "الكلمة", "meaning": "المعنى", "antonym": "المضاد إن وجد", "singularOrPlural": "المفرد/الجمع إن وجد", "context": "في السياق" }
  ],
  "questions": [
    {
      "id": "q1",
      "type": "mcq | true_false | open",
      "question": "نص السؤال كما هو في الكتاب",
      "options": ["أ", "ب", "ج", "د"],
      "correctAnswer": "الإجابة النموذجية",
      "explanation": "شرح توضيحي للإجابة"
    }
  ]
}
`;
  const r1Text = await extractSlice(15, 21, r1Prompt);
  fs.writeFileSync('src/data/raw_u1_r1.json', r1Text);
  console.log('Saved raw_u1_r1.json!');
}

extractUnit1().catch(console.error);
