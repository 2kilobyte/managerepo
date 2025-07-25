import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db('bd71'); // Adjust database name as needed


        const { tournamentName, startingDate, endDate, tier, region, prize, totalMatch, tournamentType } = body;

        if ( !tournamentName || !startingDate || !endDate || !tier || !region || !prize || !totalMatch || !tournamentType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const result = await db.collection('tournaments').insertOne({
            tournamentName,
            tournamentType,
            startingDate: new Date(startingDate), 
            endDate: new Date(endDate),
            tier,
            region,
            prize,
            totalMatch,
            createdAt: new Date(),
        });

        return NextResponse.json({ 
            insertedId: result.insertedId, 
            message: 'Tournament created successfully' 
        }, { status: 201 });

    } catch (error) {
        console.error('Error Adding tournament:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('bd71'); // your database name
    const tournaments = await db.collection('tournaments').find().toArray();

    return NextResponse.json({ tournaments });
  } catch (error) {
    console.error('MongoDB GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}