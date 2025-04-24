import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;
  exp: number;
  email: string;
  name: string;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function isExpired(payload: JwtPayload): boolean {
  return Date.now() >= payload.exp * 1000;
}
