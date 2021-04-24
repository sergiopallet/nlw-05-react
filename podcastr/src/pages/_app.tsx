import '../styles/global.scss'


import { Header } from '../components/Header'
import styles from "../styles/app.module.scss";
import { Player } from '../components/Player';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';
function MyApp({ Component, pageProps }) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsplaying] = useState(false)


    function play(episode) {
      console.log("episode:", episode);
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsplaying(true)
    }

    function togglePlay(){
      setIsplaying(!isPlaying);
    }

    function setPlayingState(state: boolean){
      setIsplaying(state)
    }


  return (
    <div className={styles.wrapper}>
      <PlayerContext.Provider value={{episodeList,currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState}}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player/>
    </PlayerContext.Provider>
    </div>
  )
}

export default MyApp
