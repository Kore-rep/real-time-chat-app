import PocketBase, {
  Admin,
  ListResult,
  Record,
  RecordSubscription,
  UnsubscribeFunc,
} from 'pocketbase';
import { environment } from '../environments/environment';
import { Message, PocketbaseResponse, User } from './pocketbaseTypes';
const pb = new PocketBase(environment.pocketbaseUrl);

export async function pbLogin(
  username: string,
  password: string
): Promise<PocketbaseResponse> {
  if (pb.authStore.isValid) {
    return { code: 409 };
  }
  try {
    await pb.collection('users').authWithPassword(username, password);
    return { code: 200 };
  } catch (error) {
    console.log(error);
    return { code: 400 };
  }
}

export async function pbRegister(
  username: string,
  password: string,
  passwordConfirm: string,
  email: string
): Promise<PocketbaseResponse> {
  const data = {
    username,
    password,
    passwordConfirm,
    email,
  };
  try {
    await pb.collection('users').create(data);
    return { code: 204 };
  } catch (error) {
    console.log(error);
    return { code: 400 };
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

export function pbGetCurrentUser(): Record | Admin | null {
  return pb.authStore.model;
}

export async function pbGetUser(userId: string): Promise<User> {
  return await pb.collection('users').getOne<User>(userId);
}

export async function pbGetRecentMessages(): Promise<ListResult<Message>> {
  const messageResponse = await pb
    .collection('messages')
    .getList<Message>(1, 50, {
      sort: '-created',
      expand: 'user',
    });
  return messageResponse;
}

export async function pbSendMessage(text: string) {
  const data = {
    text,
    user: pb.authStore.model?.id,
  };
  await pb.collection('messages').create(data);
}

export async function pbSubscribe(
  collection: string,
  callback: (data: RecordSubscription<Message>) => void
): Promise<UnsubscribeFunc> {
  return await pb.collection('messages').subscribe('*', callback);
}
