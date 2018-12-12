const POST_API_URL = (process.env.HOST ? 'https://late-registration-server.herokuapp.com' : 'http://localhost:5000') + '/post';

export const PostService = {
    createPost: post => {
        return fetch(POST_API_URL + '/createPost', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    },
    deletePost: postId => {
        return fetch(POST_API_URL + '/deletePostById/' + postId, {
            method: 'DELETE'
        });
    }
};