import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";

export const creatorOnlyFailed = async () => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  } else if (session.user.role !== "creator") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } else {
    return null;
  }
};

export const readerOnlyFailed = async () => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  } else {
    return null;
  }
};

export const adminOnlyFailed = async () => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  } else if (session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } else {
    return null;
  }
};
