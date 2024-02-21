import { newUserSchema } from "@/app/utils/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validation = await newUserSchema.safeParseAsync(data);

  if (!validation.success)
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });

  const { name, email, password } = data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user)
    return NextResponse.json(
      { error: "User already registered." },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "User Successfully created." });
}
