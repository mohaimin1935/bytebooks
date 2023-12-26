import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/connect";

export const POST = async (request) => {
  const body = await request.json();
  const { name, email, password } = body;

  console.log(body);

  if (!name || !email || !password) {
    return new NextResponse("All fields are required.", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role: "reader",
    },
  });

  return NextResponse.json(user);
};
