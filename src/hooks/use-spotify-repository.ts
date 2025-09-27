import { SpotifyRepository } from '@/services/repositories/spotify.repository';
import { TYPES } from '@/services/types';
import { useRepositoryIoc } from '@/services/context';

const useSpotifyRepository = (): SpotifyRepository => {
  const { container } = useRepositoryIoc();

  return container.get(TYPES.SPOTIFY_REPOSITORY);
};

export default useSpotifyRepository;
