import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('console', (msg) => {
	if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', (err) => {
	errors.push('PAGEERROR: ' + err.message + '\n' + err.stack);
});

await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' });

// Hold Alt and move mouse rapidly over many elements, including edges/gaps
await page.keyboard.down('Alt');
const box = await page.viewportSize();
for (let i = 0; i < 60; i++) {
	const x = Math.floor(Math.random() * box.width);
	const y = Math.floor(Math.random() * box.height);
	await page.mouse.move(x, y, { steps: 3 });
}
// move outside the document bounds (into browser chrome area) to make target weird
await page.mouse.move(0, 0);
await page.mouse.move(-5, -5);
await page.keyboard.up('Alt');

// touch a file to trigger HMR while mouse hovers an element
const filePath = process.argv[2];
if (filePath) {
	const content = fs.readFileSync(filePath, 'utf8');
	fs.writeFileSync(filePath, content + '\n');
	await page.mouse.move(100, 100, { steps: 2 });
	await page.waitForTimeout(500);
	fs.writeFileSync(filePath, content);
	await page.waitForTimeout(1000);
}

await page.waitForTimeout(1000);
console.log('ERRORS:', JSON.stringify(errors, null, 2));
await browser.close();
