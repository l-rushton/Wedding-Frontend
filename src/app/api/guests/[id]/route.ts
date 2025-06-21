import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
  }

  try {
    // First, try to find a guest by ID
    const guestData = await prisma.guest.findUnique({
      where: { id: id },
      include: {
        address: true,
        menuChoices: true
      }
    });

    if (guestData) {
      // If guest found, return guest data with address info
      return NextResponse.json({
        type: 'guest',
        guest: guestData,
        address: guestData.address
      });
    }

    // If guest not found, try to find an address by ID
    const addressData = await prisma.address.findUnique({
      where: { id: id },
      include: {
        guests: {
          include: {
            menuChoices: true
          }
        }
      }
    });
    
    if (addressData) {
      // If address found, return address data with all guests
      return NextResponse.json({
        type: 'address',
        address: addressData,
        guests: addressData.guests
      });
    }

    // If neither guest nor address found
    return NextResponse.json({ message: 'Invitation not found' }, { status: 404 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 