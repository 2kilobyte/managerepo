import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // MongoDB connection helper

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { liveUrl } = body;

    // Basic validation
    if (!liveUrl) {
      return NextResponse.json(
        { error: 'No live url found' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('bd71'); // Your DB name

    // Insert match data
    const result = await db.collection('lives').insertOne({
      liveUrl,
      isEnded: false, // Assuming a new live is not ended
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Live added successfully', insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding lives:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}



export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('bd71');

    // Find the most recent live stream where isEnded is false
    const live = await db
      .collection('lives')
      .findOne({ isEnded: false }, { sort: { createdAt: -1 } });

    if (!live) {
      // No live stream found or all ended
      return NextResponse.json({ url: null }, { status: 200 });
    }

    return NextResponse.json({ url: live.liveUrl }, { status: 200 });
  } catch (error) {
    console.error('Error fetching live stream:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}



