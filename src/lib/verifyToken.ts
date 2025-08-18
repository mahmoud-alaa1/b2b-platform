import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifyToken(token?: string) {
  if (!token) return null;

  try {
    const decoded = await jwtVerify<IJwtPayload>(token, secret, {
      algorithms: ["HS256"],
    });
    return decoded;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
