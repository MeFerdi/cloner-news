import { fetchPosts, fetchItem } from '../api/hackerNewsApi.js';
import { createPostElement } from './Post.js';

const postListElement = document.getElementById('post-list');

// Load different post types: stories, jobs, polls
export const loadPosts = async (type = 'topstories', limit = 10, start = 0) => {
    const posts = await fetchPosts(type, limit, start);
    posts.forEach(async (postId) => {
        const post = await fetchItem(postId);
        if (post) {
            const postElement = createPostElement(post);
            postListElement.appendChild(postElement);
        }
    });
};
