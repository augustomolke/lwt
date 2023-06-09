import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adapter } from '../../auth/[...nextauth]/route';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest, res: any) => {
  const { password, ...userWithoutPassword } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await adapter.createUser({
    ...userWithoutPassword,
    hashedPassword,
  });
  return NextResponse.json({ user }, { status: 200 });
};
