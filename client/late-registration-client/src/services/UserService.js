const USER_API_URL = 'https://late-registration-server.herokuapp.com/user/';

export const UserService = {
    findAllUsers: () => {
        return fetch(USER_API_URL + 'getAllUsers')
            .then(function (response) {
                return response.json();
            });
    }
// };
//
//     createCourse(course, callback) {
//         return fetch(USER_API_URL, {
//             method: 'POST',
//             body: JSON.stringify(course),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(function (response) {
//             return response.json();
//         }).then(callback);
//     }
//
//     /**
//      * Deletes a course by ID
//      * @param courseId the course to delete
//      * @param callback
//      * @returns {Promise<Response>}
//      */
//     deleteCourse(courseId, callback) {
//         return fetch(COURSE_API_URL + '/' + courseId, {
//             method: 'DELETE'
//         }).then(function (response) {
//             if (response.ok) {
//                 return response.text().then(callback);
//             }
//             return response.json().then(errorCallback);
//         });
//     }
//
//     /**
//      * Updates a course
//      * @param course the course to update (includes the ID)
//      * @param callback
//      * @returns {Promise<Response>}
//      */
//     updateCourse(course, callback) {
//         return fetch(COURSE_API_URL, {
//             method: 'PUT',
//             body: JSON.stringify(course),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(function (response) {
//                 let responseJson = response.json();
//                 if (response.ok) {
//                     return responseJson.then(callback);
//                 }
//                 return responseJson.then(errorCallback);
//             }
//         );
//     }
}