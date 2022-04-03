import { getUserBooks } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const myBooksTemplate = (books) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        
        ${books.length === 0
            ? html`<p class="no-books">No books in database!</p>`
            : booksCard(books)
        }

    </section>
`;

const booksCard = (books) => html`
    <ul class="my-books-list">
        ${books.map(bookCard)}
    </ul>
`;

const bookCard = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
`;

export async function myBooksPage(ctx) {
    const userId = getUserData().id;
    const books = await getUserBooks(userId);
    
    ctx.render(myBooksTemplate(books));
}