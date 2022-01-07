const SUPABASE_URL = 'https://laxlqaehgwqnlnrttlvt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTUxMzc2NCwiZXhwIjoxOTU3MDg5NzY0fQ._ipEy4K7axpPMDdLJa5n5DXX7YJ3OrJWgexg5CRtn30';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function getList() {
    const response = await client
        .from('shopping_list')
        .select();
    
    return checkError(response);
}

export async function buyItem(id) {
    const response = await client
        .from('shopping_list')
        .update({ bought: true })
        .match({ id: id });

    return checkError(response);
}

export async function createItem(item, quantity) {
    const response = await client
        .from('shopping_list')
        .insert([{
            item,
            quantity,
        }]);
    return checkError(response);
}

export async function deleteList() {
    const response = await client
        .from('shopping_list')
        .delete();

    return checkError(response);
}




export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
