import { expect, test } from '@playwright/test';

test('loads essential content without critical browser errors or horizontal overflow', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /炭の香りと/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /今夜は/ })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test('mobile navigation opens and can be closed', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only interaction');
  await page.goto('/');
  await page.getByRole('button', { name: 'メニューを開く' }).click();
  const dialog = page.getByRole('dialog', { name: 'モバイルメニュー' });
  const closeButton = dialog.getByRole('button', { name: 'メニューを閉じる' });
  await expect(dialog).toBeVisible();
  await expect(closeButton).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: /WEB予約/ })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: 'メニューを開く' })).toBeFocused();
});

test('desktop keeps the concept and menu composition at 1440px', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop-only layout assertion');
  await page.goto('/');

  await expect(page.getByTestId('hero-ctas').locator('svg')).toHaveCount(0);

  const conceptImage = await page.getByTestId('concept-image').boundingBox();
  const conceptCopy = await page.getByTestId('concept-copy').boundingBox();
  expect(conceptImage).not.toBeNull();
  expect(conceptCopy).not.toBeNull();
  expect(conceptImage?.x).toBeLessThan(conceptCopy?.x ?? 0);

  const cards = await Promise.all(
    [0, 1, 2, 3, 4].map((index) => page.getByTestId(`menu-card-${index}`).boundingBox()),
  );
  const [first, second, third, wagyu, tai] = cards;
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(third).not.toBeNull();
  expect(wagyu).not.toBeNull();
  expect(tai).not.toBeNull();
  expect(first?.x).toBeCloseTo(48, 0);
  expect(first?.y).toBeCloseTo(second?.y ?? 0, 0);
  expect(second?.y).toBeCloseTo(third?.y ?? 0, 0);
  expect(first?.x).toBeLessThan(second?.x ?? 0);
  expect(second?.x).toBeLessThan(third?.x ?? 0);
  expect(tai?.y).toBeGreaterThan(first?.y ?? 0);
  expect(tai?.width).toBeGreaterThan((wagyu?.width ?? 0) * 1.8);
  expect(wagyu?.height).toBeCloseTo(tai?.height ?? 0, 0);

  const accessMap = page.getByTestId('access-map');
  const mapBox = await accessMap.boundingBox();
  expect(mapBox).not.toBeNull();
  expect(mapBox?.width).toBeGreaterThan(500);
  expect((mapBox?.width ?? 0) / (mapBox?.height ?? 1)).toBeCloseTo(4 / 3, 1);
  await expect(accessMap).toHaveCSS('background-color', 'rgb(212, 207, 197)');
  await expect(accessMap.getByText('東京駅')).toBeVisible();
  await expect(accessMap.getByText('炭と酒 余白')).toBeVisible();
  await expect(page.getByRole('link', { name: /Googleマップで見る/ })).toHaveAttribute(
    'href',
    'https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%A7%85',
  );
});
