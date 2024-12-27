import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // path to your chrome or chromium executable
  headless: true,
  defaultViewport: null,
});
const page = await browser.newPage();
await page.goto("https://www.w3schools.com/jsref/jsref_obj_array.asp", {
  timeout: 0,
});
console.log("Searching for the method ... ");
const urlMethods = "https://www.w3schools.com/jsref/";
const requestedMethod = process.argv[2] || "jsref_map.asp";
let matches = await page.$$eval(
  "div#main.w3-col.l10.m12>div.w3-stretch>table.ws-table-all.notranslate>tbody>tr>td>a",
  (elements) => elements.map((x) => x.getAttribute("href"))
);
const queryFounder = matches.findIndex(
  (element) => element === requestedMethod
);
await page.goto(urlMethods + matches[queryFounder], { timeout: 0 });
const syntax = await page.$eval(
  "div#main.w3-col.l10.m12 div.w3-code.w3-border.notranslate div",
  (element) => element.innerText
);
const examples = await page.$$eval(
  "div#main.w3-col.l10.m12>div.w3-example>div.w3-code.notranslate.jsHigh",
  (elements) => elements.map((el) => el.innerText).join("\n")
);
const parameters = await page.$$eval(
  "div#main.w3-col.l10.m12>table.ws-table-all.notranslate>tbody>tr",
  (params) => params.map((el) => el.innerText).join("\n\n")
);
console.log(
  `Syntax is :\n ${syntax}\n\n Parameters are :${parameters} \n\n Examples are:\n ${examples}`
);
await browser.close();
