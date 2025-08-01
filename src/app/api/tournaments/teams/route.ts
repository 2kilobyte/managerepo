import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // MongoDB connection helper

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { teamName, player1, player2, player3, player4, leader, tournamentId } = body;

        // Basic validation
        if (!teamName || !player1 || !leader || !tournamentId) {
        return NextResponse.json(
            { error: 'Team name, Player1, and Leader are required.' },
            { status: 400 }
        );
        }

        const client = await clientPromise;
        const db = client.db('bd71'); // Replace with your DB name

        const existingTeamCount = await db.collection('teams').countDocuments({
            tournamentId,
        });
        


        // Insert team
        const result = await db.collection('teams').insertOne({
            tournamentId, // Assuming no tournament association at creation
            teamGameId: existingTeamCount + 1, // Incremental team ID
            teamName,
            players: [
                { ign: player1, isLeader: leader === player1 },
                player2 ? { ign: player2, isLeader: leader === player2 } : null,
                player3 ? { ign: player3, isLeader: leader === player3 } : null,
                player4 ? { ign: player4, isLeader: leader === player4 } : null,
            ].filter(Boolean), // Removes null entries
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: 'Team added successfully', insertedId: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding team:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('bd71'); // Replace with your DB name
        const teams = await db.collection('teams').find().toArray();

        return NextResponse.json({ teams }, { status: 200 });
    } catch (error) {
        console.error('Error fetching teams:', error);
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
    }
}