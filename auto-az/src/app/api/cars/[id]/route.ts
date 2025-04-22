import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const car = await prisma.car.findUnique({ where: { id: params.id } });
  if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(car);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { brand, model, year, price, imageUrl } = await req.json();
  const car = await prisma.car.update({
    where: { id: params.id },
    data: { brand, model, year, price, imageUrl },
  });

  return NextResponse.json(car);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.car.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Deleted' });
}
