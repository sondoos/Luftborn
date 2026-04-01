# Luftborn

Playwright test automation project for eBay search and filter functionality.

## Overview

This repository contains automated tests for validating eBay's product search and filtering features using Playwright. The project implements the Page Object Model pattern for maintainability and scalability.

## Project Structure

```
pages/
  ├── BasePage.ts              # Base class for all pages
  ├── HomePage.ts              # eBay home page
  └── SearchResultsPage.ts     # Search results page
tests/
  └── ebaySearch.test.ts       # Main test suite
test-data/
  └── ebaySearchData.json      # Test data
utils/
  └── jsonReader.ts            # Utility for reading JSON
```

## Features

- ✅ Homepage loading validation
- ✅ Product search functionality
- ✅ Search results display
- ✅ Filter application (Manual transmission)
- ✅ Page Object Model implementation
- ✅ JSON test data management

## README

A comprehensive README file is also included in the repository with the setup steps and execution instructions.

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests

Execute all tests:
```bash
npm test
```

Or use Playwright CLI:
```bash
npx playwright test
```

View test report:
```bash
npx playwright show-report
```

## Test Results

All 8 tests passing ✅
- Chromium browser
- Execution time: ~1.2m