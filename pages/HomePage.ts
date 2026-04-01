import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private searchInput: Locator;
  private searchButton: Locator;
  public logo: Locator;

  constructor(page: Page) {
    super(page);
    // Use role and placeholder for search input
    this.searchInput =page.getByRole('combobox', { name: 'Search for anything' })
    //  Use id locator for search button
    this.searchButton = page.locator('#gh-search-btn');
    // Use unique class for logo (strict mode safe)
    this.logo = page.locator('a').filter({ hasText: 'eBay Home' });
  }

  async openHomePage(): Promise<void> {
    await this.page.goto('/');
  }

  async searchProduct(product: string): Promise<void> {
    await this.fill(this.searchInput, product);
    await this.click(this.searchButton);
  }

  async validateHomePageLoaded(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }
}
