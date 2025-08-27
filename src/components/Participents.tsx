'use client';

import { Team } from '@/lib/shareInterface';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { LuUser } from 'react-icons/lu';
import { MdLocalPhone } from 'react-icons/md';
import { TbBrandDiscord } from 'react-icons/tb';



interface ParticipentsProps {
  teams: Team[];
}

const Participents: React.FC<ParticipentsProps> = ({ teams }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {teams.map((team) => (
        <div key={team._id} className='relative bg-gray-800 p-4 rounded-lg mt-20 min-h-25'>
            <Image src={team.teamLogo} alt={team.teamName} width={100} height={100} className='bg-gray-800 aspect-square object-cover rounded -top-18 absolute' />
            <div className='ml-22 bg-gray-700 p-2 rounded w-25 -mt-13 text-center rounded-tr-4xl text-orange-300 font-bold'>
                {team.teamShortName}
            </div>
            <div className='flex flex-row justify-between items-center'>
                <h2 className='text-white text-4xl font-bold mt-8 '>{team.teamName}</h2>
                <Link href={`tel:${team.mobileNumber}`} className='text-gray-500 hover:text-gray-400 transition-all text-lg font-bold mt-8 flex items-center'><MdLocalPhone  className='mr-2'/> {team.mobileNumber}</Link>
            </div>
            <div className='grid mt-6'>
                {
                    team.players.map((player, idx) => (
                        <div className='rounded-lg text-2xl flex flex-row items-center relative' key={idx}>
                            <div className='grid grid-cols-3 gap-3 w-full mb-4'>
                                <div className='flex flex-row items-center bg-gray-900 rounded-lg'><div className='p-2 bg-gray-700 rounded-lg mr-2'><IoGameControllerOutline /></div> {player.ign}</div>
                                <div className='flex flex-row items-center bg-gray-900 rounded-lg'><div className='p-2 bg-gray-700 rounded-lg mr-2'><LuUser  /></div> {player.fullName}</div>
                                <div className='flex flex-row items-center bg-gray-900 rounded-lg'><div className='p-2 bg-gray-700 rounded-lg mr-2'><TbBrandDiscord  /></div> <div className='overflow-hidden text-ellipsis'>{player.discordName}</div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
      ))}
    </div>
  );
};

export default Participents;
