import { Team, Tournament } from '@/lib/shareInterface';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import DownloadKeys from './DownloadKeys';
import GenerateObserverZip from './GenerateObserverZip';

interface BasicInfoProps {
  tournament: Tournament;
  teams: Team[]
  onDiscordSetup: () => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ tournament, teams, onDiscordSetup }) => {



  return (
    <div className="space-y-6 mt-4 mb-4">
      <div className="bg-[#24272c] rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div> <Image priority src={tournament.tournamentImage} width={100} height={100} alt='Logo' className='w-[100px] h-[100px] rounded' /> </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className='flex flex-row'>
                  
                  <h2 className="text-3xl font-bold text-white tracking-wide">
                    {tournament.tournamentName}
                  </h2>
                </div>
                <div className="flex items-center space-x-3">
                  <Link title='Back' className='px-4 py-1 bg-gray-600 rounded text-white mr-4 text-3xl' href="/"> <IoIosArrowRoundBack /> </Link>
                  <Link href={`/${tournament._id}/add-match`} className=" bg-amber-600 rounded-3xl text-white px-4 py-2 !rounded-button whitespace-nowrap hover:bg-primary/90 transition-colors">
                    Add Match
                  </Link>
                  <DownloadKeys data={tournament.teamCodes} />
                  <GenerateObserverZip teams={teams}  />
                  <button onClick={onDiscordSetup} className='px-6 py-2 bg-blue-900 rounded-3xl cursor-pointer'>Setup Discord</button>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-8 mt-6">
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    START DATE
                  </div>
                  <div className="text-white font-medium">
                    {new Date(tournament.startingDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    END DATEAC
                  </div>
                  <div className="text-white font-medium">
                    {new Date(tournament.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    TIER
                  </div>
                  <div className="text-white font-medium">
                    {tournament.tier}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    REGION
                  </div>
                  <div className="text-white font-medium">
                    {tournament.region}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    PRIZE POOL
                  </div>
                  <div className="text-white font-medium">
                    {tournament.prize}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default BasicInfo;
