import '../styles/global.scss'


import { Header } from '../components/Header'
import styles from "../styles/app.module.scss";
import { Player } from '../components/Player';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';
function MyApp({ Component, pageProps }) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);


    function play(episode) {
      console.log("episode:", episode);
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
    }


  return (
    <div className={styles.wrapper}>
      <PlayerContext.Provider value={{episodeList,currentEpisodeIndex, play}}>
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
