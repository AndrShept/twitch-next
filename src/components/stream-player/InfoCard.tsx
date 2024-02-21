'use client';

import { Separator } from '@/components/ui/separator';
import { Edit, Pencil } from 'lucide-react';
import Image from 'next/image';

import { InfoModal } from './InfoModal';

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
}

export const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4 ">
      <div className="rounded-xl bg-secondary/60 my-4">
        <div className="flex justify-between items-center gap-x-2.5 lg:p-8 p-4 ">
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize text-yellow-400">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="lg:p-8 p-4 space-y-4">
          <div>
            <h3 className="text-sm  mb-2">Name</h3>
            <p className="text-sm font-semibold text-muted-foreground">
              {name}
            </p>
          </div>
          <div>
            <h3 className="text-sm  mb-2">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={name}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
