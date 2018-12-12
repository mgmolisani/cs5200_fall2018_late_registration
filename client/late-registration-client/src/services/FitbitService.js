export const FitbitService = {
    findLifetimeStats: (fbToken, fbUserId) => {
        return fetch(`https://api.fitbit.com/1/user/${fbUserId}/activities.json`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${fbToken}`
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            const {distance, steps} = data.lifetime.total;
            return {
                distance,
                steps
            }
        })
    }
};