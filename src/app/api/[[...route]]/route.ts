import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api/v1");

// not found route
app.notFound((c) => {
  return c.json({
    message: "This route does not exist",
  });
});

const auth = new Hono()
auth.get('/', (c) => c.text('List Books')) 
app.route('/auth', auth);

export const GET = handle(app);
export const POST = handle(app);
