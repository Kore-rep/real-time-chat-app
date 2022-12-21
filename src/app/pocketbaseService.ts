import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
export interface LoginResponse {
  code: number;
}

export interface RegisterResponse {
  code: number;
}

export async function pbLogin(username: string, password: string): Promise<LoginResponse> {
  if (pb.authStore.isValid) {
    return {code: 409};
  }
  try {
    await pb.collection('users').authWithPassword(username, password);
    return {code: 200};
  } catch (error) {
    console.log(error);
    return {code: 400};
  }
};

export async function pbRegister(username: string, password: string, passwordConfirm: string, email: string): Promise<RegisterResponse> {
  const data = {
    username,
    password,
    passwordConfirm,
    email,
  }
  try {
    await pb.collection('users').create(data);
    return {code: 204};
  } catch (error) {
    console.log(error);
    return {code: 400};
  }
}

export function pbLogOut() {
  if (pb.authStore.isValid) {
    pb.authStore.clear();
  }
}

export function pbIsLoggedIn(): Boolean {
  if (pb.authStore.isValid) {
    return true;
  }
  return false;
}

export function pbGetCurrentUser() {
  return pb.authStore.model;
}

