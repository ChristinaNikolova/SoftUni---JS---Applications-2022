import { createLike, deleteEventById, getEventById, getEventLikesCount, getUserEventLike } from '../api/data.js';
import { html, nothing} from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (event, likes, isCreator, isUser, isAlreadyLiked, onDelete, onLike) => html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${event.title}</h1>
                <div>
                    <img src=${event.imageUrl} />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${event.description}</p>
                <h4>Date: ${event.date}</h4>
                <h4>Author: ${event.author}</h4>
                <div class="buttons">
                    
                    ${isCreator
                        ? html`
                                <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                                <a class="btn-edit" href="/edit/${event._id}">Edit</a>`
                        : nothing
                    }

                    ${isUser && !isCreator && !isAlreadyLiked
                        ? html`<a @click=${onLike} class="btn-like" href="#">Like</a>`
                        : nothing
                    }
                    
                </div>
                <p class="likes">Likes: ${likes}</p>
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const event = await getEventById(id);

    const user = getUserData();
    const isUser = user;
    const isCreator = isUser && user.id === event._ownerId;

    const likes = await getEventLikesCount(id);
    let isAlreadyLiked = false;

    if(isUser) {
        isAlreadyLiked = await getUserEventLike(id, user.id);
    }

    ctx.render(detailsTemplate(event, likes, isCreator, isUser, isAlreadyLiked, onDelete, onLike));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this event?');

        if(confirmation) {
            await deleteEventById(id);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike() {
        const like = {
            theaterId: id,
        };

        await createLike(like);
    }
}