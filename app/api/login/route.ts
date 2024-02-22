import { userLoginSchema } from "@/app/utils/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validation = await userLoginSchema.safeParseAsync(data);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Incorrect email or password." },
      { status: 400 }
    );
  }

  const { email, password } = data;

  const user = await prisma.appUser.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Incorrect email or password." },
      { status: 400 }
    );
  }

  const isVaildPassword = await bcrypt.compare(password, user.password);

  if (!isVaildPassword) {
    return NextResponse.json(
      { error: "Incorrect email or password." },
      { status: 400 }
    );
  }

  const token = JWT.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!
  );

  const response = NextResponse.json({ message: "Logged In." });

  response.cookies.set("helpdesk-access-token", token, {
    maxAge: 24 * 60 * 60,
  });

  return response;
}
