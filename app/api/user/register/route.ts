import { NextResponse } from 'next/server';

export const GET = (req: Request, res: any) => {
  console.log(NextResponse);
  return NextResponse.redirect('http://localhost:3000/registrou');
};
