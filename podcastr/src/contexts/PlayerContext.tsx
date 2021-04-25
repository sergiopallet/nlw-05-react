import { type } from 'node:os';
import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
  title: string;
  members: string
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (Episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (boolean) => void;
  playList:(list: Episode[], index: number) => void;
  playPrevious:() => void;
  playNext:() => void;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  toggleLoop: () => void;
  isShuffling: boolean;
  toggleShuffle: () => void;
  clearPlayerState: () => void;

}

export const PlayerContext = createContext({} as PlayerContextData);



type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsplaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsplaying(true)
  }

  function playList(list: Episode[], index:number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsplaying(true);
  }

  function togglePlay() {
    setIsplaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {

    if(isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() + episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    }
    else if(hasNext)
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
  }

  function playPrevious() {
    hasPrevious &&
    setCurrentEpisodeIndex(currentEpisodeIndex -1)
  }



  function setPlayingState(state: boolean) {
    setIsplaying(state)
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);

}
  return (
    <PlayerContext.Provider
      value={{
        episodeList, currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState, 
        playList,
        playPrevious,
        playNext,
        hasPrevious,
        hasNext,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle, clearPlayerState

      }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}
