// tests/translator.spec.js
import { test, expect } from '@playwright/test';

const URL = 'https://www.swifttranslator.com/';
const INPUT_NAME = 'Input Your Singlish Text Here.';

// ✅ Helper: type singlish and check expected sinhala appears somewhere on the page
async function assertContainsSinhala(page, singlish, expectedSinhala) {
  const input = page.getByRole('textbox', { name: INPUT_NAME });
  await input.fill(singlish);

  // wait until expected sinhala appears (auto-conversion)
  await expect(page.locator('body')).toContainText(expectedSinhala, { timeout: 8000 });
}

// ✅ Helper: negative case (should NOT match the “correct” intended output)
async function assertNotContainsSinhala(page, singlish, correctSinhala) {
  const input = page.getByRole('textbox', { name: INPUT_NAME });
  await input.fill(singlish);

  // give UI a moment to update, then confirm it doesn't contain the correct output
  await page.waitForTimeout(300);
  await expect(page.locator('body')).not.toContainText(correctSinhala);
}

test.describe('SwiftTranslator (Singlish → Sinhala) - ITPM Assignment 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
  });

  // ✅ 24 Positive Functional Test Cases
  const positiveCases = [
    { id: 'Pos_Fun_0001', input: 'mama pansal yanavaa', expected: 'මම පන්සල් යනවා' },
    { id: 'Pos_Fun_0002', input: 'oya innavadha', expected: 'ඔය ඉන්නවද' },
    { id: 'Pos_Fun_0003', input: 'vamata haerenna', expected: 'වමට හැරෙන්න' },
    { id: 'Pos_Fun_0004', input: 'api nagareta enavaa', expected: 'අපි නගරෙට එනවා' },
    { id: 'Pos_Fun_0005', input: 'mata interview ekak thiyenavaa', expected: 'මට interview එකක් තියෙනවා' },
    { id: 'Pos_Fun_0006', input: 'mama ehema karanne naehae', expected: 'මම එහෙම කරන්නේ නැහැ' },
    { id: 'Pos_Fun_0007', input: 'mama 25/02/2026 gedhara inne', expected: 'මම 25/02/2026 ගෙදර ඉන්නේ' },
    { id: 'Pos_Fun_0008', input: 'oyaage NIC number eka kiyanna mata', expected: 'ඔයාගෙ NIC number එක කියන්න මට' },
    {
      id: 'Pos_Fun_0009',
      input: 'mama gedhara yanavaa, passe api chithrapatayak balanavaa',
      expected: 'මම ගෙදර යනවා, පස්සෙ අපි චිත්‍රපටයක් බලනවා',
    },
    {
      id: 'Pos_Fun_0010',
      input: 'karuNaakaralaa mata podi udhavvak karanna puLuvandha oyaata?',
      expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද ඔයාට?',
    },
    { id: 'Pos_Fun_0011', input: 'iiLaGa sathiyee trip ekak plan karanavaa', expected: 'ඊළඟ සතියේ trip එකක් plan කරනවා' },
    { id: 'Pos_Fun_0012', input: 'mata 2kg parippu ganna oonee', expected: 'මට 2kg පරිප්පු ගන්න ඕනේ' },
    { id: 'Pos_Fun_0013', input: 'eeyi, othanin palayan.', expected: 'ඒයි, ඔතනින් පලයන්.' },
    { id: 'Pos_Fun_0014', input: 'api  vaeve  oru  padhinavaa', expected: 'අපි  වැවෙ  ඔරු  පදිනවා' },
    { id: 'Pos_Fun_0015', input: 'othanin ivath venna("avavaadhayayi!")', expected: 'ඔතනින් ඉවත් වෙන්න("අවවාදයයි!")' },
    { id: 'Pos_Fun_0016', input: 'mata badaginii', expected: 'මට බඩගිනී' },
    { id: 'Pos_Fun_0017', input: 'het hamuvemu', expected: 'හෙට හමුවෙමු' },
    { id: 'Pos_Fun_0018', input: 'hari hari!, api 5.00pm vedhdhi othana.', expected: 'හරි හරි!, අපි 5.00pm වෙද්දි ඔතන.' },
    { id: 'Pos_Fun_0019', input: 'havasata traffic thiyena nisaa kalin enna', expected: 'හවසට traffic තියෙන නිසා කලින් එන්න' },
    {
      id: 'Pos_Fun_0020',
      input: 'magee NIC saha ID number dheka register karaganna oonee',
      expected: 'මගේ NIC සහ ID number දෙක register කරගන්න ඕනේ',
    },
    {
      id: 'Pos_Fun_0021',
      input: 'api 2026-05-21 7.30 AM Colombo yanna hadhannee',
      expected: 'අපි 2026-05-21 7.30 AM Colombo යන්න හදන්නේ',
    },
    {
      id: 'Pos_Fun_0022',
      input: 'Documents tika email karalaa manager ta evanna oonee ehema karoth work eka hariyata complete venavaa',
      expected: 'Documents ටික email කරලා manager ට එවන්න ඕනේ එහෙම කරොත් work එක හරියට complete වෙනවා',
    },
    { id: 'Pos_Fun_0023', input: 'ela machan! api passe hamuvemu', expected: 'එල මචන්! අපි පස්සෙ හමුවෙමු' },
    {
      id: 'Pos_Fun_0024',
      input:
        'adha udhaesana 6.30 AM mata aeharunaa. passe mama thee bona gaman phone eka check karalaa messages baluwa. 8.00 wenkota mama office yanna one, namuth traffic nisaa late venna puluvan. e nisaa mama driver ta call karAlaa kiyala, 9.00 AM enna kiyala schedule eka adjust karaa. lunch eken pASse maQQ documents tIka ready karalaa email ekak yavanna oone.',
      expected: 'අද උදැසන 6.30 AM',
    },
  ];

  for (const tc of positiveCases) {
    test(`${tc.id} - ${tc.input.slice(0, 45)}${tc.input.length > 45 ? '…' : ''}`, async ({ page }) => {
      await assertContainsSinhala(page, tc.input, tc.expected);
    });
  }

  // ❌ 10 Negative Functional Test Cases
  // We assert that the system does NOT produce the “correct intended” Sinhala output.
  const negativeCases = [
    { id: 'Neg_Fun_0001', input: 'adhanivaadudhavasak', correct: 'අද නිවාඩු දවසක්' },
    { id: 'Neg_Fun_0002', input: 'mm bth knw mm', correct: 'මම බත් කනවා මම' },
    { id: 'Neg_Fun_0003', input: 'today mama office go karala meeting attend kalaa', correct: 'අද මම office ගිහින් meeting attend කළා' },
    { id: 'Neg_Fun_0004', input: 'ma ma ge dha ra ya na vaa', correct: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0005', input: 'hariii hariii lassanaiiii', correct: 'හරි හරි ලස්සනයි' },
    { id: 'Neg_Fun_0006', input: 'mama gaava Rs@# 5000 thiyeyi!!!', correct: 'මම ගාව Rs. 5000 තියෙයි!!!' },
    { id: 'Neg_Fun_0007', input: 'api\npaa\ndam\nkaranva', correct: 'අපි පාඩම් කරනවා' },
    { id: 'Neg_Fun_0008', input: 'hetta vaeddee karramu', correct: 'හෙට වැඩේ කරමු' },
    { id: 'Neg_Fun_0009', input: 'aDha paaTha KaraNava', correct: 'අද පාඩම් කරනවා' },
    { id: 'Neg_Fun_0010', input: 'elaaa machannn', correct: 'එල මචං' },
  ];

  for (const tc of negativeCases) {
    test(`${tc.id} (negative) - ${tc.input.replace(/\n/g, '\\n')}`, async ({ page }) => {
      await assertNotContainsSinhala(page, tc.input, tc.correct);
    });
  }

  // 🖥️ 1 UI Test Case (Real-time output updates while typing)
  test('Pos_UI_0001 - Output updates in real-time while typing', async ({ page }) => {
    const input = page.getByRole('textbox', { name: INPUT_NAME });
    await input.fill('');
    await input.type('mama');
    await expect(page.locator('body')).toContainText('මම', { timeout: 8000 });
  });
});
