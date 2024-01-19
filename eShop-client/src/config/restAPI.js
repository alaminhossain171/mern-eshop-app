const baseURL='http://192.168.0.103:5000/api/v1';
const getAPIurl=(endpoint)=>baseURL+endpoint;
const login=getAPIurl('/users/login');
const productsAPI=getAPIurl('/products');
const signup=getAPIurl('/users/register');
const user=getAPIurl('/users');
const ordersApi=getAPIurl('/orders')
export{
    login,
    productsAPI,
    signup,
    user,
    ordersApi
}