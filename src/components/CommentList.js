import { fetchComments } from '../api/hackerNewsApi.js';

// Recursive function to load nested comments
export const loadComments = async (commentIds) => {
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comment-container');
    
    const comments = await fetchComments(commentIds);
    comments.forEach(comment => {
        if (comment) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            
            commentElement.innerHTML = `
                <p>${comment.text || '(No content)'}</p>
                <small>by ${comment.by || 'Unknown'} | ${new Date(comment.time * 1000).toLocaleString()}</small>
            `;

            commentsContainer.appendChild(commentElement);

            // If comment has replies, load them recursively
            if (comment.kids && comment.kids.length > 0) {
                const nestedComments = document.createElement('div');
                nestedComments.classList.add('nested-comments');
                commentsContainer.appendChild(nestedComments);

                const nestedToggle = document.createElement('button');
                nestedToggle.innerText = 'View Replies';
                nestedToggle.onclick = async () => {
                    if (nestedComments.innerHTML === '') {
                        const replies = await loadComments(comment.kids);
                        nestedComments.appendChild(replies);
                    }
                };
                commentElement.appendChild(nestedToggle);
            }
        }
    });

    return commentsContainer;
};
