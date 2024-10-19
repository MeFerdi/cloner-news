import { debounce } from './utils/debounce.js';
import { loadPosts } from './components/postList.js';

window.addEventListener('scroll', debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadPosts('topstories', 10, document.querySelectorAll('.post').length);
    }
}, 300));
