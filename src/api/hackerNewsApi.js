const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

// Function to fetch top stories, jobs, or polls
export const fetchPosts = async (type = 'topstories', limit = 10, start = 0) => {
    const response = await fetch(`${BASE_URL}/${type}.json`);
    const data = await response.json();
    return data.slice(start, start + limit); // Paginate posts
};

// Function to fetch individual item (story, job, poll, or comment)
export const fetchItem = async (id) => {
    const response = await fetch(`${BASE_URL}/item/${id}.json`);
    return await response.json();
};

// Function to fetch comments for a post
export const fetchComments = async (commentIds) => {
    const comments = await Promise.all(commentIds.map(fetchItem));
    return comments;
};
