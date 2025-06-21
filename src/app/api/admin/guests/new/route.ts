import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Add new guest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, addressId } = body;

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    let finalAddressId = addressId;

    // If address is provided but no addressId, try to find or create the address
    if (address && !addressId) {
      const existingAddress = await prisma.address.findFirst({
        where: { address: address }
      });

      if (existingAddress) {
        finalAddressId = existingAddress.id;
      } else {
        const newAddress = await prisma.address.create({
          data: { address }
        });
        finalAddressId = newAddress.id;
      }
    }

    const newGuest = await prisma.guest.create({
      data: {
        name,
        addressId: finalAddressId || null,
      },
      include: {
        address: true,
        menuChoices: true,
      },
    });

    return NextResponse.json(newGuest);
  } catch (error) {
    console.error('Error creating guest:', error);
    return NextResponse.json({ message: 'Failed to create guest' }, { status: 500 });
  }
} 