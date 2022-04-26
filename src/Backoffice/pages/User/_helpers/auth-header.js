export function authHeader() {
    // return authorization header with jwt token
    const token = localStorage.getItem('token');
    if (token) {
        return {
            'Authorization' : 'Bearer '+token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',

    };
    } else {
        return {};
    }
}
