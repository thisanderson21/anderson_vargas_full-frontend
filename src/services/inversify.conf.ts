import 'reflect-metadata';
import { Container } from 'inversify';

import { SpotifyRepository } from './repositories/spotify.repository';
import { SpotifyRepositoryService } from './repositories/spotify.repository.service';
import { TYPES } from './types';

const repositoryContainer = new Container();

repositoryContainer.bind<SpotifyRepository>(TYPES.SPOTIFY_REPOSITORY).to(SpotifyRepositoryService);

export {repositoryContainer};
