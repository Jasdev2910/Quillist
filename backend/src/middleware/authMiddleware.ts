// middleware/authMiddleware.ts
import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const jwt = c.req.header("Authorization") || "";
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    c.status(500);
    return c.json({ error: "Server error during authentication middleware" });
  }
};
