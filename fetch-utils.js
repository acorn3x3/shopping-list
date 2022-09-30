const SUPABASE_URL = 'https://rhjybmkxbulsbeekbtld.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoanlibWt4YnVsc2JlZWtidGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM4ODE1NjgsImV4cCI6MTk3OTQ1NzU2OH0.epJjgyE-2zaELp_M_FBHKpIEg5t6xfAG2Dgfit60obI';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createGrocery(grocery) {
    const response = await client.from('grocerys').insert(grocery).single();

    return response;
}

export async function getGrocerys() {
    return await client.from('grocerys').select('*');
}
export async function completeGrocery(id) {
    return await client.from('grocerys').update({ complete: true }).eq('id', id).single();
}

export async function deleteAllGrocerys() {
    const user = getUser();
    return await client.from('grocerys').delete().eq('user_id', user.id);
}
