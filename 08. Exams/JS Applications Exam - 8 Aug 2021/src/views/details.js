import { createLike, deleteBookById, getBookById, getBookLikesCount, getUserBookLike } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, likes, isCreator, isUser, isAlreadyLiked, onDelete, onLike) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                
                ${isCreator
                    ? html`
                            <a class="button" href="/edit/${book._id}">Edit</a>
                            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
                    : nothing
                }
    
                ${isUser && !isCreator && !isAlreadyLiked
                    ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
                    : nothing
                }
                
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const book = await getBookById(id);

    const user = getUserData();
    const isUser = user;
    const isCreator = isUser && user.id === book._ownerId;

    let likes = await getBookLikesCount(id);
    let isAlreadyLiked = false;

    if (isUser) {
        isAlreadyLiked = await getUserBookLike(id, user.id);
    }

    ctx.render(detailsTemplate(book, likes, isCreator, isUser, isAlreadyLiked, onDelete, onLike));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this book?');

        if(confirmation){
            await deleteBookById(id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        const like = {
            bookId: id,
        };

        await createLike(like);

        likes = await getBookLikesCount(id);
        isAlreadyLiked = await getUserBookLike(id, user.id);

        ctx.render(detailsTemplate(book, likes, isCreator, isUser, isAlreadyLiked, onDelete, onLike));
    }
}