import { JSDOM } from 'jsdom';  // important library to use dom for scraping
import fs from 'fs/promises';

let page = 0;
let books = {}

for (page = 1; page <= 25; page++) { // looping through each page of the website

const web = await fetch(`https://books.toscrape.com/catalogue/page-${page}.html`)
  const webData = await web.text(); // converting the page to text 

  const body = new JSDOM(webData);
  const doc = body.window.document

  // now start initialzing the Scraping
  let container = doc.querySelector('ol.row') 
  let booksContainer = container.querySelectorAll('li') 

  for(let book of booksContainer) { // looping through each book in the page to assign its info each book by loop
      let imageContainer = book.querySelector('.image_container');
      let URL = imageContainer.querySelector('a').getAttribute('href');
      let imageURL = imageContainer.querySelector('a img').getAttribute('src');

      let rating = book.querySelector('.star-rating').classList[1];

      let bookTitle = book.querySelector('h3 a').getAttribute('title');
      let bookPrice =  book.querySelector('.product_price .price_color').innerHTML
      let bookAvail = book.querySelector('.product_price p:nth-child(2)').textContent.trim()
      books[bookTitle] = {
        title: bookTitle,
        price: bookPrice,
        rating, // or rating: rating,
        availability: bookAvail,
        img: imageURL,
        url: URL 
      }
      console.log(books)
  }
}
await fs.writeFile('./outputs.json',JSON.stringify(books,'\n', 4));
