import { createDonation, deletePetById, getDonationUserPet, getPetById, getPetTotalDonationCount } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (pet, sumDonation, isCreator, isUser, isAlreadyDonated, onDelete, onDonate) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${pet.image}>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age}</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: ${sumDonation}$</h4>
                </div>
                
                ${isUser
                    ? html`
                        <div class="actionBtn">
                            
                            ${isCreator
                                ? html`
                                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
                                : nothing
                            }
                            
                            ${!isCreator && !isAlreadyDonated
                                ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`
                                : nothing
                            }
                            
                        </div> `
                    : nothing
                }
                
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const pet = await getPetById(id);

    const user = getUserData();
    const isUser = user;
    const isCreator = isUser && user.id === pet._ownerId;

    let countDonations = await getPetTotalDonationCount(id);
    let sumDonation = 100 * countDonations;

    let isAlreadyDonated = false;

    if(isUser) {
        isAlreadyDonated = await getDonationUserPet(id, user.id);
    }

    ctx.render(detailsTemplate(pet, sumDonation, isCreator, isUser, isAlreadyDonated, onDelete, onDonate));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this pet?');

        if(confirmation) {
            await deletePetById(id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate() {
        const donation = {
            petId: id,
        };

        await createDonation(donation);

        countDonations = await getPetTotalDonationCount(id);
        sumDonation = 100 * countDonations;
        isAlreadyDonated = await getDonationUserPet(id, user.id);

        ctx.render(detailsTemplate(pet, sumDonation, isCreator, isUser, isAlreadyDonated, onDelete, onDonate));
    }
}