// Run after opening a locally served homepage in an isolated Playwright CLI session:
// playwright-cli run-code --filename scripts/check-whatsapp-channel.js
async (page) => {
  const origin = page.url().match(/^https?:\/\/[^/]+/)[0];
  const channel = 'https://whatsapp.com/channel/0029VbDKyOU6hENr1ktFAq1a';
  const results = [];
  for (const language of ['en', 'ar']) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => sessionStorage.removeItem('pzm_whatsapp_channel_popup_dismissed'));
      const url = origin + (language === 'ar' ? '/ar/' : '/');
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const dialog = page.locator('#pzm-whatsapp-channel-popup.is-open');
      await dialog.waitFor({ state: 'visible', timeout: 8000 });
      if (await dialog.count() !== 1) throw new Error('Expected exactly one channel popup');
      if (await dialog.getAttribute('role') !== 'dialog' || await dialog.getAttribute('aria-modal') !== 'true') {
        throw new Error('Missing dialog accessibility attributes');
      }
      if (await dialog.locator('[data-whatsapp-channel-link]').getAttribute('href') !== channel) {
        throw new Error('Incorrect popup channel destination');
      }
      const permanent = page.locator('.retail-extra [data-whatsapp-channel-link]');
      if (await permanent.count() !== 1 || await permanent.getAttribute('href') !== channel) {
        throw new Error('Missing permanent channel link');
      }
      const title = await dialog.locator('h2').textContent();
      if (language === 'ar' ? !/[\u0600-\u06ff]/.test(title) : !title.includes('WhatsApp')) {
        throw new Error('Popup language does not match page');
      }
      const fits = await dialog.evaluate(element => {
        const rect = element.querySelector('.pzm-channel-popup-card').getBoundingClientRect();
        return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight;
      });
      if (!fits) throw new Error('Popup extends outside the viewport');
      await page.screenshot({ path: `output/playwright/channel-${language}-${width}.png` });
      const close = dialog.locator('.pzm-channel-popup-close');
      await close.focus();
      await page.keyboard.press('Shift+Tab');
      if (!await dialog.locator('.pzm-channel-popup-later').evaluate(element => element === document.activeElement)) {
        throw new Error('Keyboard focus escapes the popup');
      }
      if (width === 390) await dialog.locator('.pzm-channel-popup-later').click();
      else await page.keyboard.press('Escape');
      await page.locator('#pzm-whatsapp-channel-popup').waitFor({ state: 'detached' });
      if (!await page.evaluate(() => sessionStorage.getItem('pzm_whatsapp_channel_popup_dismissed') === 'true' && document.body.style.overflow !== 'hidden')) {
        throw new Error('Dismissal state or scrolling was not restored');
      }
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
      if (await page.locator('#pzm-whatsapp-channel-popup').count()) throw new Error('Popup repeated after dismissal');
      results.push({ language, width, popupVisible: true, channelCorrect: true, dismissalRespected: true });
    }
  }
  return results;
}
