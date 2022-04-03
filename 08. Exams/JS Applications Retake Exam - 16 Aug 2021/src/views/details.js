import { createComment, deleteGameById, getGameById, getGameComments } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (game, comments, isCreator, isUser, onDelete, onComment) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">${game.summary}</p>
           
            <div class="details-comments">
                <h2>Comments:</h2>
                
                ${comments.length === 0
                    ? html`<p class="no-comment">No comments.</p>`
                    : commentsCard(comments)
                }
                
            </div>
            
            ${isCreator 
                ? html`
                    <div class="buttons">
                        <a href="/edit/${game._id}" class="button">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                    </div>`
                : nothing
            }
            
        </div>
    
        ${isUser && !isCreator
            ? html`
                <article class="create-comment">
                <label>Add new comment:</label>
                    <form @submit=${onComment} class="form">
                       <textarea name="comment" placeholder="Comment......"></textarea>
                       <input class="btn submit" type="submit" value="Add Comment">
                    </form>
                </article>`
            : nothing
        }
    
    </section>
`;

const commentsCard = (comments) => html`
    <ul>
        ${comments.map(commentCard)}              
    </ul>
`;

const commentCard = (comment) => html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const game = await getGameById(id);

    const user = getUserData();
    const isUser = user;
    const isCreator = isUser && user.id === game._ownerId;

    const comments = await getGameComments(id);

    ctx.render(detailsTemplate(game, comments, isCreator, isUser, onDelete, onComment));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this game?');

        if(confirmation) {
            await deleteGameById(id);
            ctx.page.redirect('/');
        }
    }

    async function onComment(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const comment = formData.get('comment').trim();

        if(!comment) {
            return alert('The field is required!');
        }

        const newComment = {
            gameId: id,
            comment,
        };

        await createComment(newComment);
        e.target.reset();
        ctx.page.redirect('/details/' + id);
    }
}