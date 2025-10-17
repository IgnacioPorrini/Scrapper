import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const URL = "https://example.com";

async function scrape() {
  try {
    const { data: html } = await axios.get(URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(html);
    const resultados = [];

    $("h2").each((i, el) => {
      resultados.push($(el).text().trim());
    });

    fs.writeFileSync("datos.json", JSON.stringify(resultados, null, 2));
    console.log("✅ Scraping completado. Datos guardados en datos.json");
  } catch (error) {
    console.error("❌ Error en scraping:", error.message);
  }
}

scrape();
