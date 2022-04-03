import { getListingById, updateListing } from '../api/data.js';
import { html } from '../lib.js';

const editTemplate = (listing, onSubmit) => html`
    <section id="edit-listing">
        <div class="container">
    
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value=${listing.brand}>
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value=${listing.model}>
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${listing.description}>
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${listing.year}>
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${listing.imageUrl}>
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${listing.price}>
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const listing = await getListingById(id);

    ctx.render(editTemplate(listing, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const year = Number(formData.get('year').trim());
        const imageUrl = formData.get('imageUrl').trim();
        const price = Number(formData.get('price').trim());

        if (!brand || !model || !description || !year || !imageUrl || !price) {
            return alert('All fields are required!');
        }

        if (price < 0) {
            return alert('The price must be a positive number!');
        }

        if (year < 0) {
            return alert('The year must be a positive number!');
        }

        const updatedListing = {
            brand,
            model,
            description,
            year,
            imageUrl,
            price,
        };

        await updateListing(id, updatedListing);
        e.target.reset();
        ctx.page.redirect('/details/' + id);
    }
}