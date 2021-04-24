import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image'
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { PlayerContext } from '../../contexts/PlayerContext';

export function Player() {
    const { episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState
    } = useContext(PlayerContext);

    useEffect(() => {
        if (!audioRef.current)
            return;
        if (isPlaying) {
            audioRef.current.play();
        }
        else {
            audioRef.current.pause();
        }


    }, [isPlaying]);
    const episode = episodeList[currentEpisodeIndex];
    const audioRef = useRef<HTMLAudioElement>(null);
    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="tocando agora" />
                <strong>tocando agora</strong>
            </header>

            {episode ? (
                <div className={styles.currentEpisode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>

                </div>

            ) :
                (
                    <div className={styles.emptyPlayer}>
                        <strong>Seleciona um podcast para ouvir</strong>
                    </div>
                )
            }
            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progess}>
                    <span>00:00</span>

                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#84d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#84d361' }}
                            />
                        ) :
                            (
                                <div className={styles.emptySlider} />
                            )

                        }
                    </div>
                    <span>00:00</span>
                </div>
                {episode &&
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />

                }
                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button >
                    <button type="button"
                        className={styles.playButton}
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        {isPlaying ?
                            <img src="/pause.svg" alt="pausar" />
                            :
                            <img src="/play.svg" alt="tocar" />
                        }
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="tocar próxima" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="repetir" />
                    </button>
                </div>
            </footer>

        </div>
    );
}