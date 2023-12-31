import { gallery, btnLoadMore } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderPhotoCard(data) 
{
    const results = data.hits;
    const stringTag = results.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        }) => {return `<div class="photo-card"> <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item"><b>Likes</b> ${likes}</p>
                    <p class="info-item"><b>Views</b> ${views}</p>
                    <p class="info-item"><b>Comments</b> ${comments}</p>
                    <p class="info-item"><b>Downloads</b> ${downloads}</p>
                </div>
            </a>
        </div>`;
    }).join('');

    gallery.insertAdjacentHTML('beforeend', stringTag);

    new SimpleLightbox('.photo-card a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
}
