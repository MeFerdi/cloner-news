import { loadComments } from './CommentList.js';

export const createPostElement = (post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    // Generate link if post has a URL
    const postLink = post.url ? `<a href="${post.url}" target="_blank" rel="noopener noreferrer">${post.title || '(Untitled)'}</a>` 
                              : post.title || '(Untitled)';

    let contentHTML = `
        <h2>${postLink}</h2>
        <small>by ${post.by || 'Unknown'} | ${new Date(post.time * 1000).toLocaleString()}</small>
    `;

    // Post-specific content
    if (post.type === 'story') {
        contentHTML += `<p>${post.text || ''}</p>`;
    } else if (post.type === 'job') {
        contentHTML += `<p>Job posting: ${post.text || ''}</p>`;
    } else if (post.type === 'poll') {
        contentHTML += `<p>Poll: ${post.text || ''}</p>`;
    }

    postElement.innerHTML = contentHTML;

    // Handle comments
    if (post.kids && post.kids.length > 0) {
        const commentSection = document.createElement('div');
        commentSection.classList.add('comments');
        postElement.appendChild(commentSection);

        const commentToggle = document.createElement('button');
        commentToggle.innerText = 'View Comments';
        commentToggle.onclick = async () => {
            if (commentSection.innerHTML === '') {
                const comments = await loadComments(post.kids);
                commentSection.appendChild(comments);
            }
        };
        postElement.appendChild(commentToggle);
    }

    return postElement;
};
