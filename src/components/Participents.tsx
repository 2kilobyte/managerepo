'use client';

import { Team } from '@/lib/shareInterface';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { LuUser } from 'react-icons/lu';
import { MdLocalPhone } from 'react-icons/md';
import { TbBrandDiscord } from 'react-icons/tb';
import toast from 'react-hot-toast';

interface ParticipentsProps {
  teams: Team[];
}

const Participents: React.FC<ParticipentsProps> = ({ teams }) => {
  const [teamList, setTeamList] = useState<Team[]>(teams);

  const handleApprove = async (teamId: string, tournamentId: string) => {
    const toastId = toast.loading('Approving team...');
    try {
      const res = await fetch(`/api/tournaments/teams/accept?teamId=${teamId}&tournamentId=${tournamentId}`, {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to approve team');
      }

      toast.success('Team approved successfully!', { id: toastId });

      // update UI state instantly
      setTeamList((prev) =>
        prev.map((t) => (t._id === teamId ? { ...t, isApproved: true } : t))
      );
    } catch (err: any) {
      toast.error(err.message || 'Error approving team', { id: toastId });
    }
  };

  const handleDecline = async (teamId: string) => {
    const toastId = toast.loading('Removing team from approve list...');
    try {
      const res = await fetch(`/api/tournaments/teams/decline?teamId=${teamId}`, {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to decline team');
      }

      toast.success('Team removed from approved list!', { id: toastId });

      // update UI state instantly
      setTeamList((prev) =>
        prev.map((t) => (t._id === teamId ? { ...t, isApproved: false } : t))
      );
    } catch (err: any) {
      toast.error(err.message || 'Error declining team', { id: toastId });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {teamList.map((team) => (
        <div
          key={team._id}
          className="relative bg-gray-800 p-4 rounded-lg mt-20 min-h-25"
        >
          <Image
            src={team.teamLogo}
            alt={team.teamName}
            width={100}
            height={100}
            className="bg-gray-800 aspect-square object-cover rounded -top-18 absolute"
          />
          <div className="ml-22 bg-gray-700 p-2 rounded w-25 -mt-13 text-center rounded-tr-4xl text-orange-300 font-bold">
            {team.teamShortName}
          </div>
          <div
            style={team.isApproved ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
            className="absolute right-2 px-2 py-1 rounded"
          >
            {team.isApproved ? 'Approved' : 'Not Approved'}
          </div>

          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white text-4xl font-bold mt-8 ">
              {team.teamName}
            </h2>
            <Link
              href={`tel:${team.mobileNumber}`}
              className="text-gray-500 hover:text-gray-400 transition-all text-lg font-bold mt-8 flex items-center"
            >
              <MdLocalPhone className="mr-2" /> {team.mobileNumber}
            </Link>
          </div>

          <div className="grid mt-6">
            {team.players.map((player, idx) => (
              <div
                className="rounded-lg text-2xl flex flex-row items-center relative"
                key={idx}
              >
                <div className="grid grid-cols-3 gap-3 w-full mb-4">
                  <div className="flex flex-row items-center bg-gray-900 rounded-lg">
                    <div className="p-2 bg-gray-700 rounded-lg mr-2">
                      <IoGameControllerOutline />
                    </div>{' '}
                    {player.ign}
                  </div>
                  <div className="flex flex-row items-center bg-gray-900 rounded-lg">
                    <div className="p-2 bg-gray-700 rounded-lg mr-2">
                      <LuUser />
                    </div>{' '}
                    {player.fullName}
                  </div>
                  <div className="flex flex-row items-center bg-gray-900 rounded-lg">
                    <div className="p-2 bg-gray-700 rounded-lg mr-2">
                      <TbBrandDiscord />
                    </div>{' '}
                    <div className="overflow-hidden text-ellipsis">
                      {player.discordName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Approve / Decline Buttons */}
          {!team.isApproved ? (
            <button
              onClick={() => handleApprove(team._id, team.tournamentId)}
              className="px-5 py-2 bg-green-700 rounded-3xl cursor-pointer"
            >
              Approve Team
            </button>
          ) : (
            <button
              onClick={() => handleDecline(team._id)}
              className="px-5 py-2 bg-red-500 rounded-3xl cursor-pointer"
            >
              Remove From Approve List
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Participents;
