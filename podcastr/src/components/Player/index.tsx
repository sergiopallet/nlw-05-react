import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePlayer } from '../../contexts/PlayerContext';
import { converDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
    const { episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle,
        clearPlayerState
    } = usePlayer();



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

    function setupProgressListener() {
        audioRef.current.currentTime = 0;
        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    }

    function handleSeek(amount : number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    

    function handleEpisodeEnded() {
        if (hasNext) {
            playNext()
        }
        else {
            clearPlayerState()
        }
    }
    const episode = episodeList[currentEpisodeIndex];
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);
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
                    <span>{converDurationToTimeString(progress)}</span>

                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                trackStyle={{ backgroundColor: '#84d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#84d361' }}
                                onChange={handleSeek}
                            />
                        ) :
                            (
                                <div className={styles.emptySlider} />
                            )

                        }
                    </div>
                    <span>{converDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>
                {episode &&
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        loop={isLooping}
                        autoPlay
                        onEnded={handleEpisodeEnded}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                    />

                }
                <div className={styles.buttons}>
                    <button type="button"
                        disabled={!episode || episodeList.length === 1}
                        onClick={toggleShuffle}
                        className={isShuffling ? styles.isActive : ''}
                    >
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
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
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.svg" alt="tocar próxima" />
                    </button>
                    <button type="button"
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? styles.isActive : ''}
                    >
                        <img src="/repeat.svg" alt="repetir" />
                    </button>
                </div>
            </footer>

        </div>
    );
}