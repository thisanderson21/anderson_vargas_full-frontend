import { DetailArtist } from "@/components/features/detail-artist/DetailArtist";

interface ArtistPageProps {
  params: { id: string };
}

export default function ArtistPage({ params }: ArtistPageProps) {

  
  return (
    <DetailArtist id={params.id} />
  );
}
