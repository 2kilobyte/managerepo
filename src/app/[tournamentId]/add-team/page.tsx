"use client";
import AddTeamForm from '@/components/AddTeamForm';
import Header from '@/components/Header';
import StickyButton from '@/components/StickyButton';
import { useParams } from 'next/navigation';

export default function AddTeamPage() {
    const { tournamentId } = useParams()
    return (
        <div className="bg-[#18191D] text-white min-h-screen">
        <Header />
        <div className="container mx-auto p-4">
            <AddTeamForm />
            <div className='w-full flex justify-center items-center mt-8'>
                <StickyButton title='Back' link={`/${tournamentId}`} classNames='bg-[#463e3e] p-4 text-center rounded' />
            </div>
        </div>
        </div>
    );
}
