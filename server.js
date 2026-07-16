import express from "express";
import { chromium } from "playwright";

const app = express();

const PORT = process.env.PORT || 3000;

let browser;

async function getBrowser() {
  if (browser) {
    return browser;
  }

  browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-web-security",
    ],
  });

  browser.on("disconnected", () => {
    browser = null;
  });

  return browser;
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "bfg-renderer",
  });
});

app.get("/render", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      error: "Missing url parameter",
    });
  }

  let page;

  try {

    const browser = await getBrowser();

    page = await browser.newPage({

      viewport: {
        width: 1440,
        height: 2000,
      },

      userAgent:
        "Mozilla/5.0 (compatible; BeachfrontGradoBot/1.0)",

    });

    await page.goto(url, {
  waitUntil: "domcontentloaded",
  timeout: 120000,
});

// React/Vite Zeit zum Rendern geben
await page.waitForTimeout(5000);

// Warten bis mindestens eine Überschrift vorhanden ist
await page.waitForSelector("h1", {
  timeout: 10000,
}).catch(() => {});

const html = await page.content();

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8",
    );

    res.send(html);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error:
        error instanceof Error
          ? error.message
          : String(error),

    });

  } finally {

    if (page) {

      await page.close();

    }

  }

});

app.listen(PORT, () => {

  console.log(
    `Renderer listening on ${PORT}`,
  );

});
