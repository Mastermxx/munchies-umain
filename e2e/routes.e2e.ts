import { expect, test } from '@playwright/test';

test('home route loads and lists restaurants', async ({ page }) => {
	await page.goto('/');

	const list = page.getByTestId('restaurant-list');
	await expect(list).toBeVisible();
	await expect(list.locator('[data-testid^="restaurant-card-"]').first()).toBeVisible();
});

test('navigating from a restaurant card opens its detail route', async ({ page }) => {
	await page.goto('/');

	const firstCard = page.locator('[data-testid^="restaurant-card-"]').first();
	const restaurantId = await firstCard
		.getAttribute('data-testid')
		.then((id) => id?.replace('restaurant-card-', ''));

	await firstCard.getByRole('link').click();

	await expect(page).toHaveURL(new RegExp(`/restaurant/${restaurantId}$`));
	await expect(page.getByTestId(`restaurant-page-${restaurantId}`)).toBeVisible();
});

test('back link on the detail route returns to the home route', async ({ page }) => {
	await page.goto('/');
	await page.locator('[data-testid^="restaurant-card-"]').first().getByRole('link').click();

	await page.getByRole('link', { name: 'Back to restaurants' }).click();

	await expect(page).toHaveURL(/\/$/);
	await expect(page.getByTestId('restaurant-list')).toBeVisible();
});

test('an unknown restaurant id returns a 404', async ({ page }) => {
	const response = await page.goto('/restaurant/does-not-exist');

	expect(response?.status()).toBe(404);
});
