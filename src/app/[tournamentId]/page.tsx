'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import BasicInfo from '@/components/BasicInfo';
import TabsSection from '@/components/tabsSection';
import StickyButton from '@/components/StickyButton';

const TournamentDetails = () => {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tournamentId) return;

    const fetchTournament = async () => {
      try {
        const res = await fetch(`/api/tournaments/details?tournamentId=${tournamentId}`);
        if (!res.ok) throw new Error('Failed to fetch tournament');
        const data = await res.json();
        setTournament(data.tournament);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [tournamentId]);

  console.log('tournamentId:', tournamentId);
  



  return (
    <div>
      <Header />
      {
        !tournament && loading && <p className="text-white p-4 text-center">Loading tournament details...</p>
      }{
        tournament && !loading &&
      <div className="container mx-auto">
        <BasicInfo tournament={tournament} />
        <TabsSection />
        <StickyButton
          title="Add Team"
          link={`/${tournamentId}/add-team`}
          classNames="bg-[#D18800] p-4 absolute right-2 bottom-2"
        />
        <StickyButton
          title="Add Match"
          link={`/${tournamentId}/add-match`}
          classNames="bg-[#463e3e] p-4 absolute right-40 bottom-2"
        />
        <StickyButton
          title="Back"
          link="/"
          classNames="bg-[#463e3e] p-4 absolute left-2 bottom-2"
        />
      </div>
      }
      {
        !tournament && !loading && <p className="text-white p-4 text-center">Tournament not found.</p>
      }
    </div>
  );
};

export default TournamentDetails;
