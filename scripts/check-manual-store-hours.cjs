const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/store-status.js'), 'utf8');
const loader = fs.readFileSync(path.join(root, 'js/contact-loader.js'), 'utf8');
const asset = loader.match(/script\.src = '([^']+store-status-[a-f0-9]{8}\.js)'/)[1];
assert.equal(fs.readFileSync(path.join(root, asset), 'utf8'), source);
assert.ok(asset.endsWith(`-${crypto.createHash('sha256').update(source).digest('hex').slice(0, 8)}.js`));

// Dubai opening boundaries, independently specified in minutes after midnight.
const schedule = [[630, 1410], [660, 1380], [660, 1380], [660, 1380], [660, 1380], [630, 1380], [630, 1410]];
let cases = 0;
for (const locale of ['en', 'ar']) {
  for (let day = 0; day < 7; day++) {
    const [open, close] = schedule[day];
    for (const [minute, expected] of [[open - 1, false], [open, true], [close - 1, true], [close, false]]) {
      const instant = Date.UTC(2026, 10, 15 + day, 0, minute - 240);
      class FixedDate extends Date {
        constructor(...args) { super(...(args.length ? args : [instant])); }
      }
      const status = { innerHTML: '' };
      const hours = { innerHTML: '' };
      const callbacks = {};
      const intervals = [];
      let networkCalls = 0;
      const loading = minute === open;
      const context = vm.createContext({
        Date: FixedDate,
        document: {
          readyState: loading ? 'loading' : 'complete',
          documentElement: { getAttribute: () => locale },
          getElementById: () => status,
          querySelector: () => hours,
          addEventListener: (name, callback) => { callbacks[name] = callback; },
        },
        window: { location: { pathname: locale === 'ar' ? '/ar/' : '/' } },
        fetch: () => { networkCalls++; throw new Error('Manual hours must not use the network'); },
        setInterval: (callback, delay) => { intervals.push({ callback, delay }); },
      });
      vm.runInContext(source, context);
      if (loading) callbacks.DOMContentLoaded();
      assert.equal(networkCalls, 0);
      assert.equal(status.innerHTML.includes('class="open-status"'), expected, `${locale} day ${day} minute ${minute}`);
      assert.ok(status.innerHTML.includes(locale === 'ar' ? (expected ? 'مفتوح الآن' : 'مغلق الآن') : (expected ? 'Open Now' : 'Closed')));
      assert.equal((hours.innerHTML.match(/class="hours-item/g) || []).length, 7);
      assert.equal((hours.innerHTML.match(/hours-today/g) || []).length, 1);
      assert.equal(intervals.length, 1);
      assert.equal(intervals[0].delay, 60000);
      intervals[0].callback();
      assert.equal(networkCalls, 0);
      cases++;
    }
  }
}
console.log(`Manual store hours passed: ${cases} English/Arabic Dubai boundary cases, DOM readiness, minute refresh, asset parity and zero network requests.`);
