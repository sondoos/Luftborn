import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  private resultsContainer: Locator;
  private resultItems: Locator;
  private transmissionFilter: Locator;
  private manualOption: Locator;
  private appliedFilter: Locator;
  private transmissionSection:Locator;
  private manualCount :Locator;
  private filterResultsCount: Locator;
  
  constructor(page: Page) {
    super(page);
    // Results container
    this.resultsContainer = page.locator('ul.srp-results');
    // Each result item
   // this.resultItems = page.locator('ul.srp-results > li');
    this.resultItems  = page.locator('ul.srp-results > li.s-card');
    // Transmission filter button (left sidebar)
    this.transmissionFilter = page.locator('div.x-refine__item__title-container button').filter({ hasText: 'Transmission' })
    // Manual option (checkbox or radio)
    this.manualOption = page.getByRole('link', { name: /^Manual/ });
    this.transmissionSection = page.locator('button').filter({ hasText: 'Transmission' })
    // Applied filter chip/label
    this.appliedFilter = page.locator("//li[contains(@class,'srp-multi-aspect__item--applied')]//*[contains(text(),'Manual')]");
    this.manualCount = page.locator('//*[@id="x-refine__group_3__0"]/ul/li[1]/div/a/div/div/div/span[3]');
    this.filterResultsCount = page.locator('//h1[contains(@class,"srp-controls__count-heading")]/span[@class="BOLD"][1]');
  }

  //=====================================================================

  async validateResultsPageLoaded(): Promise<void> {
    await this.waitForElement(this.resultsContainer);
    await expect(this.resultsContainer).toBeVisible();
  }

  async getResultsCount(): Promise<number> {
    return await this.resultItems.count();
  }

  async applyManualTransmissionFilter(): Promise<void> {
 /*   await this.scrollIntoView(this.transmissionFilter);
    const expanded = await this.transmissionSection.getAttribute('aria-expanded');
    if (expanded !== 'true') {
      await this.transmissionSection.click();
    }*/
    await this.waitForElement(this.manualOption);
    await this.click(this.manualOption);
    // Wait for filter to apply
    await this.waitForElement(this.appliedFilter);
  }

  async validateManualFilterApplied(){
    await expect(this.page).toHaveURL(/Transmission=Manual/i);
    const count = await this.manualCount.textContent();
    console.log(`Manual transmission count: ${count}`);
    const resultsCountText = await this.filterResultsCount.textContent();
    console.log(`Filtered results count: ${resultsCountText}`);
    
    // Parse the counts
    const manualCountNum = parseInt(count?.replace(/[()]/g, '') || '0');
    const filteredCountNum = parseInt(resultsCountText?.replace(/\D/g, '') || '0');
    
    // Assert they are equal
    expect(manualCountNum).toBe(filteredCountNum);
  }
}
