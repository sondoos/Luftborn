import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { readJson } from '../utils/jsonReader';
import path from 'path';

test.describe('eBay Search and Filter', () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let testData: { searchText: string; transmission: string };

  test.beforeAll(async () => {
    const dataPath = path.resolve(__dirname, '../test-data/ebaySearchData.json');
    testData = await readJson<{ searchText: string; transmission: string }>(dataPath);
  });

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
  });
//===================================================================================
  test('should load the home page', async () => {
    await homePage.openHomePage();
    await homePage.validateHomePageLoaded();
  });
//===================================================================================
  test('should search for a product', async () => {
    await homePage.openHomePage();
    await homePage.validateHomePageLoaded();
    await homePage.searchProduct(testData.searchText);
    await searchResultsPage.validateResultsPageLoaded();
  });
//===================================================================================
  test('should display search results', async () => {
    await homePage.openHomePage();
    await homePage.validateHomePageLoaded();
    await homePage.searchProduct(testData.searchText);
    await searchResultsPage.validateResultsPageLoaded();
    const resultsCount = await searchResultsPage.getResultsCount();
    console.log(`Number of search results: ${resultsCount}`);
    expect(resultsCount).toBeGreaterThan(7);
  });
//===================================================================================
  test('should apply Manual transmission filter', async () => {
    await homePage.openHomePage();
    await homePage.validateHomePageLoaded();
    await homePage.searchProduct(testData.searchText);
    await searchResultsPage.validateResultsPageLoaded();
    await searchResultsPage.applyManualTransmissionFilter();
    await searchResultsPage.validateManualFilterApplied();
  });
});
