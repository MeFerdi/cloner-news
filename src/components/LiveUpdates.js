import { fetchPosts } from '../api/hackerNewsApi.js';

const liveUpdatesElement = document.getElementById('live-updates');

export const checkForUpdates = async (type = 'newstories') => {
    let lastPostId = null;

    setInterval(async () => {
        const posts = await fetchPosts(type, 1); // Fetch the newest post
        if (posts[0] !== lastPostId) {
            lastPostId = posts[0];
            liveUpdatesElement.innerText = 'New content available! Refresh to see the latest.';
        }
    }, 5000); // Poll every 5 seconds
};
