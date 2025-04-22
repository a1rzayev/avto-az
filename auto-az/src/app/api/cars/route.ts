import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const cars = await prisma.car.findMany();
  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { brand, model, year, price, imageUrl } = await req.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const car = await prisma.car.create({
    data: {
      brand,
      model,
      year,
      price,
      imageUrl,
      ownerId: user.id,
    },
  });

  return NextResponse.json(car);
}
