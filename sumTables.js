const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 67; seed <= 76; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Visiting: ${url}`);

    await page.goto(url);

    // Wait for tables to load (important for dynamic content)
    await page.waitForSelector("table");

    // Extract all numbers from tables
    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);

    totalSum += pageSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL SUM:", totalSum);
  console.log("=================================");

  await browser.close();
})();