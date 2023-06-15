import Notify from 'notiflix';
import { gallery, btnLoadMore, searchForm } from './js/refs.js';
import ApiService from './js/apiService.js';
import { renderPhotoCard } from './js/photoCard.js';

const imageApiService = new ApiService();

searchForm.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onBtnLoadMore);

async function onSearch(event) 
{
    try 
    {
        event.preventDefault();
        cleanGallery();

        const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

        if (!searchQuery) 
        {
            Notify.Notify.warning('Please type something to search.');
            isHiddenBtnLoadMore();
            return;
        }

        imageApiService.query = searchQuery;
        imageApiService.page = 1;
        imageApiService.hits = 0;

        event.currentTarget.reset();
        const data = await imageApiService.fetchImage();
        if (data.hits.length == 0) 
        {
            Notify.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            isHiddenBtnLoadMore();
            return;
        }

        renderPhotoCard(data);
        visibleBtnLoadMore();
        btnLoadMore.disabled = false;

        Notify.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } 
    catch (error) 
    {
        console.log('error', error);
    }
}

function cleanGallery() 
{
    gallery.innerHTML = '';
}

function visibleBtnLoadMore() 
{
    btnLoadMore.classList.remove('is-hidden');
    btnLoadMore.classList.add('visible');
}

function isHiddenBtnLoadMore() 
{
    btnLoadMore.classList.add('is-hidden');
    btnLoadMore.classList.remove('visible');
}

async function onBtnLoadMore() 
{
    try 
    {
        const data = await imageApiService.fetchImage();
        if (data.hits.length == 0) 
        {
            Notify.Notify.info("We're sorry, but you've reached the end of search results.");
            btnLoadMore.disabled = true;
            return;
        }
        if (imageApiService.hits > imageApiService.totalHits) 
        {
            Notify.Notify.info("We're sorry, but you've reached the end of search results.");
            btnLoadMore.disabled = true;
            return;
        }
        renderPhotoCard(data);
        pageScrolling();

        imageApiService.hits += 40;
    } 
    catch (error) 
    {
        console.log('error', error);
    }
}

function pageScrolling() 
{
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}
