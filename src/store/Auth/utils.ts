import { User } from "./types";

export const createUser = ({ email }: { email: string }): User => ({ email });

export const isUserAuthenticated = (
  user: User | null,
  token: string | null
): boolean => Boolean(user && token && token.length);
