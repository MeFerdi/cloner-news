import { loadPosts } from './components/PostList.js';
import { checkForUpdates } from './components/LiveUpdates.js';

document.addEventListener('DOMContentLoaded', () => {
    // Load top stories by default
    loadPosts('topstories');

    // Load other types of posts
    document.getElementById('load-stories').addEventListener('click', () => loadPosts('topstories'));
    document.getElementById('load-jobs').addEventListener('click', () => loadPosts('jobstories'));
    document.getElementById('load-polls').addEventListener('click', () => loadPosts('pollstories'));

    // Start live update polling
    checkForUpdates();
});
