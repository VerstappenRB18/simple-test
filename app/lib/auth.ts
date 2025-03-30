import { jwtVerify } from "jose";

export async function verifyJWT(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("Invalid or expired token:", err);
    return null;
  }
}
