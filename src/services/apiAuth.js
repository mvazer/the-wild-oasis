import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, firstName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { firstName: firstName, avatar: "" } },
  });
  if (error) throw new Error(error.message);

  return { data, error };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ firstName, password, avatar }) {
  let userData;

  if (password) userData = {password};
  if (firstName) userData = { data: { firstName } };

  const { data, error } = await supabase.auth.updateUser(userData);
  if (error) throw new Error(error.message);
  if (!avatar) return { data, error };

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: data2, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return { data2, error2 };
}
