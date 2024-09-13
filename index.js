// // console.log("Hello wrold!");
// // // const web = await fetch('https://ar.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B5:%D8%A5%D8%AD%D8%B5%D8%A7%D8%A1%D8%A7%D8%AA')
// // // console.log(await web.text())
// // // console.log('last line of the code')


// // let son = parse(`{
// //   "json": "Formammter",
// //   "here": "is just a test"
// //   ,"creates": {
// //     "fruit": "apple",
// //     "mainMeal": "checkin",
// //     "numOfGuests": 5
// //   }
// // }`)
// // console.log(son)

// function solution() {
// 	// Your code goes here
//   let x = {
//     "name": "alex",
//     "age": 29,
//     "role": "user",
//     "hobbies": "Swimming"
//   }
//   let y = json.parse(` {
//     "name": "alex",
//     "age": 29,
//     "role": "user",
//     "hobbies": "Swimming"
//   }`)
// 	return y;
//   }
/////////////////////////////////////////////////
// day 3
import { JSDOM } from 'jsdom';
import fs from 'fs/promises';

// const web = await fetch('https://ar.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B5:%D8%A5%D8%AD%D8%B5%D8%A7%D8%A1%D8%A7%D8%AA')
// const webData = await web.text();

// const body = new JSDOM(webData);
// const doc = body.window.document
// const table = []
// for(let x in table){
// let y = doc.querySelectorAll(`wikitable mw-statistics-table`)[x].innerHTML
// table.push(y);
// console.log(y)
// }
// console.log(table)
// let theTable = []
// theTable.push(doc.querySelector(`.wikitable .mw-statistics-articles`).textContent);
// theTable.push(doc.querySelector(`.wikitable .mw-statistics-pages`).textContent);
// theTable.push(doc.querySelector(`.wikitable .mw-statistics-files`).textContent);
// console.log(theTable)
 ////////////////////////////////////
//  let wikitable = doc.querySelector('.wikitable')

//  const readData = await fs.readFile('./output.json','utf8');
//  if (!readData) {
//   readData = '{}';  // Set to an empty object if file is empty
// }
//  console.log(readData); // Check the file content
 
// let data = {};

// let articles = wikitable.querySelector('.mw-statistics-articles .mw-statistics-numbers')
// data['Articles'] = articles.innerHTML;
// if(data['Articles'] != articles.innerHTML) {
//   console.log('Atricles chaned!')
//   data['Articles'] != articles.innerHTML;
// }
// let pages = wikitable.querySelector('.mw-statistics-pages .mw-statistics-numbers')
// data['pages'] = pages.innerHTML;
// if(data['pages'] != pages.innerHTML) {
//   console.log('pages chaned!')
//   data['pages'] != pages.innerHTML;
// }

// let files = wikitable.querySelector('.mw-statistics-files .mw-statistics-numbers')
// data['files'] = files.innerHTML;
// if(data['files'] != files.innerHTML) {
//   console.log('files chaned!')
//   data['files'] != files.innerHTML;
// }
// data = JSON.parse(readData)
// console.log(data)

// fs.writeFile('./output/json',JSON.stringify(data,'n',4));
/////////////////////////////////////////////////////////////////
// the test
// function solution() {
// 	// Your code goes here
//         const x = document.querySelector('p').nextSibling;
//   console.log(x)
// return x; 
// }
// solution(x)



// day 4
let page = 0;
let books = {}

for (page = 1; page <= 25; page++) {
  // Your code here
const web = await fetch(`https://books.toscrape.com/catalogue/page-${page}.html`)
  const webData = await web.text();

  const body = new JSDOM(webData);
  const doc = body.window.document
  //start new

  let container = doc.querySelector('ol.row') 
  let booksContainer = container.querySelectorAll('li') 

  for(let book of booksContainer) {
      let imageContainer = book.querySelector('.image_container');
      let URL = imageContainer.querySelector('a').getAttribute('href');
      let imageURL = imageContainer.querySelector('a img').getAttribute('src');

      let rating = book.querySelector('.star-rating').classList[1];

      let bookTitle = book.querySelector('h3 a').getAttribute('title');
      let bookPrice =  book.querySelector('.product_price .price_color').innerHTML
      let bookAvail = book.querySelector('.product_price p:nth-child(2)').textContent.trim()
      // let books = {}     this line posting it in web
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
/////
// let page = 0;
// let books = {}

// for (page = 1; page <= 25; page++) {
// const web = await fetch(`https://books.toscrape.com/catalogue/page-${page}.html`)
//   const webData = await web.text();

//   const body = new JSDOM(webData);
//   const doc = body.window.document
//   //start new

//   let container = doc.querySelector('ol.row') 
//   let booksContainer = container.querySelectorAll('li') 

//   for(let book of booksContainer) {
//       let imageContainer = book.querySelector('.image_container');
//       let URL = imageContainer.querySelector('a').getAttribute('href');
//       let imageURL = imageContainer.querySelector('a img').getAttribute('src');

//       let rating = book.querySelector('.star-rating').classList[1];

//       let bookTitle = book.querySelector('h3 a').getAttribute('title');
//       let bookPrice =  book.querySelector('.product_price .price_color').innerHTML
//       let bookAvail = book.querySelector('.product_price p:nth-child(2)').textContent.trim()
//       // let books = {}     this line posting it in web
//       books[bookTitle] = {
//         title: bookTitle,
//         price: bookPrice,
//         rating, // or rating: rating,
//         availability: bookAvail,
//         img: imageURL,
//         url: URL 
//       }
//       console.log(books)
//   }
// }
// await fs.writeFile('./outputs.json',JSON.stringify(books,'\n', 4));


// // let productMain = doc.querySelector('.product_main')
// // // let price = productMain.querySelector('.p:nth-child(3)')
// // let availability = productMain.querySelector('p:nth-child(3)').textContent.trim().replace('/[^In stock]| /g', '').trim()