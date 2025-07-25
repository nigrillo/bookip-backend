import axios from 'axios';
import * as cheerio from 'cheerio';

async function buscarISBN(isbn) {
  const url = `https://isbnsearch.org/isbn/${isbn}`;
  
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(data);
    const resultado = {};

    $('div.bookinfo').find('p').each((i, el) => {
      const texto = $(el).text().trim();
      if (texto.startsWith("ISBN-13:")) resultado.isbn13 = texto.replace("ISBN-13:", "").trim();
      if (texto.startsWith("ISBN-10:")) resultado.isbn10 = texto.replace("ISBN-10:", "").trim();
      if (texto.startsWith("Author:")) resultado.autor = texto.replace("Author:", "").trim();
      if (texto.startsWith("Title:")) resultado.titulo = texto.replace("Title:", "").trim();
      if (texto.startsWith("Publisher:")) resultado.editorial = texto.replace("Publisher:", "").trim();
    });

    return resultado;

  } catch (error) {
    console.error("Error al buscar ISBN:", error.message);
    return null;
  }
}

export default buscarISBN;
