// Tests of delivery/standards/screen-checks.mjs, the module every app runs as .standards/lib/screen-checks.mjs (#1169).
// Hangul in the samples is written as \u escapes: this repository holds no Hangul characters.
import assert from 'node:assert/strict';
import { test } from 'vitest';
import { checkKoreanScreenText, checkMinFontSize, koreanScreenTextFindings, MIN_FONT_PX, smallTextFindings } from '../../delivery/standards/screen-checks.mjs';

const src = (file, text) => [{ file, text }];
// Hello, explanation, save, date, ga, na (each a short Hangul word)
const ANNYEONG = '안녕';
const ANNYEONGHASEYO = '안녕하세요';
const SEOLMYEONG = '설명';
const JUSEOK = '주석';
const SAVE = '저장';
const DATE = '날짜';
const GA = '가';
const NA = '나';

test('the floor is 12px', () => {
  assert.equal(MIN_FONT_PX, 12);
});

test('text under 12px is reported, 12px and larger passes', () => {
  assert.deepEqual(checkMinFontSize(src('frontend/src/a.tsx', '<p className="text-xs text-[12px] text-[0.75rem] text-[13px]" style={{ fontSize: 12 }}>')), []);
  assert.deepEqual(checkMinFontSize(src('frontend/src/a.tsx', '<p className="text-[10px]" />')), [
    'frontend/src: text under 12px (docs/design-tokens.md). 1 found: frontend/src/a.tsx:1 text-[10px]',
  ]);
  const svg = checkMinFontSize(src('frontend/src/heatmap.tsx', '<text fontSize="10" /><text fontSize={11} /><div style={{ fontSize: 11 }} /><div style={{ fontSize: "0.7rem" }} />'));
  assert.match(svg[0], /4 found/);
  assert.match(checkMinFontSize(src('frontend/src/index.css', '.a {\n font-size: 11px;\n}'))[0], /index\.css:2 font-size: 11px/);
  assert.deepEqual(checkMinFontSize(src('frontend/src/a.test.tsx', 'text-[10px]')), []);
  assert.deepEqual(smallTextFindings('a.tsx', 'x'), []);
});

test('Korean screen text fails; comments, tests and marked lines pass', () => {
  assert.deepEqual(checkKoreanScreenText(src('frontend/src/a.tsx', `export const A = () => <p>Hello</p>; // ${ANNYEONG}\n/* ${SEOLMYEONG}\n more */\nconst url = "https://x.test"; // ${JUSEOK}`)), []);
  assert.match(checkKoreanScreenText(src('frontend/src/a.tsx', `<p>\n  ${ANNYEONGHASEYO}\n</p>`))[0], /1 found: frontend\/src\/a\.tsx:2/);
  assert.match(checkKoreanScreenText(src('frontend/src/a.ts', `const label = '${SAVE}';`))[0], /Korean screen text/);
  assert.deepEqual(checkKoreanScreenText(src('frontend/src/a.test.tsx', `expect(x).toBe('${ANNYEONG}');`)), []);
  assert.deepEqual(checkKoreanScreenText(src('frontend/src/a.ts', `// korean-ok: matches Korean CSV headers\nconst date = ['${DATE}'];`)), []);
  assert.deepEqual(checkKoreanScreenText(src('frontend/src/a.ts', `const date = ['${DATE}']; // korean-ok: CSV header`)), []);
  assert.deepEqual(checkKoreanScreenText(src('frontend/src/a.ts', `// korean-ok-file: parses Korean input\nconst a = '${GA}';\nconst b = '${NA}';`)), []);
  assert.deepEqual(checkKoreanScreenText(src('frontend/src/style.css', `.a { content: "${GA}"; }`)), []);
  assert.deepEqual(koreanScreenTextFindings('frontend/src/a.stories.tsx', `<p>${SAVE}</p>`), []);
});
