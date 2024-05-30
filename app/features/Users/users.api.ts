import { z } from "zod";
import { db } from "~/db";
import bcrypt from "bcryptjs";

export const schema = z.object({
  name: z.string().min(1, { message: "Please provide your name" }).trim(),
  email: z
    .string()
    .min(1, { message: "Please provide your email" })
    .email({ message: "Please provide a valid email" })
    .trim(),
  password: z.string().min(1, ({ message: "Please provide a valid password" })).trim(),
  city: z.string().min(1, { message: "Please provide your city" }).trim(),
  state: z.string().min(1, { message: "Please provide your state" }).trim(),
});

type UserInput = z.infer<typeof schema>;

function sleep(ms: number){
  return new Promise((resolve) => setTimeout(resolve,ms))
}

export async function getUsers() {
  return sleep(3000).then(() => db.user.findMany());
}

export async function saveUser(user: UserInput) {
  const password = await bcrypt.hash(user.password, 10)
  return db.user.create({ data: { ...user, password } });
}