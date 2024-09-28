import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new error("The user is not authenticated");
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("the error in the logout api");
}
export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error("the error in the logout api");
  return { data, error };
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error("the error in the logout api");
  if (!avatar) return data;
  const fileName = `avatar-${data.user.id}-${Math.random}`;
  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (avatarError) throw new Error("the error in the logout api");
  const { data: updatedUser, error: error2 } = await supabase.auth.user({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error("the error in the logout api");
  return updatedUser;
}
