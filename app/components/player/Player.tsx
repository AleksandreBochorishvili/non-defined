'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Player.module.css'




type MusicCardProps = {
    icon : string;
    artistName : string;
    songName : string;
};


export default function Player ( {icon, artistName, songName} : MusicCardProps) {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trackIndex, setTrackIndex] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isShuffle, setIsShuffle] = useState(false);



    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause()
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (!audioRef.current) return;
      
        audioRef.current.load();  
        if (isPlaying) {
          audioRef.current.play();
      }
    }, [trackIndex]);

    useEffect(() => {
        if (audioRef.current)  {
          audioRef.current.volume = volume;
        }
      }, [volume]);


    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };


    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };




    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    


    const tracks = [
        '/Audio/track1.mp3',
        '/Audio/tracks2.mp3',
        '/Audio/track3.mp3',
        '/Audio/track4.mp3'
    ]


    const handlePrev = () => {
        if(isShuffle) {
            let prevIndex;
            do {
                prevIndex = Math.floor(Math.random() * tracks.length);
            } while (prevIndex === trackIndex && tracks.length > 1);
            setTrackIndex(prevIndex);
        } else {
            setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        }
    };
    


    const handleNext = () => {
        if(isShuffle) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * tracks.length);
            } while (nextIndex === trackIndex && tracks.length > 1);
            setTrackIndex(nextIndex);
        } else {
            setTrackIndex((prev) => (prev + 1) % tracks.length);
        }
    };
    

    

      const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      };

      const handleLoadMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration)
        }
      }

      
      const handleForward = () => {
        if(audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 5, duration);
            if(isPlaying) audioRef.current.play(); 
        }
    };
    return (
        <div className={styles.main}>
            <div className={styles.artistInfo}>
                <img src={icon} alt={artistName} className={styles.artistIcon}/>

                <div className={styles.artistDetails}>
                    
                    <p className={styles.songTitle}> {songName} </p>
                    <p className={styles.artistName}> {artistName} </p>

                </div>
            </div>
            <div className={styles.playerSection}>
                <div className={styles.playerControls}>
                    <div className={styles.seekControl}>
                        <button onClick={handleForward} className={styles.seekButton}>
                        <img src="/icon/rotate.svg" alt="forward" className={styles.seekIcon} />
                        <span className={styles.seekLabel}> 5 </span>
                        </button>
                    </div>
                    <div className={styles.trackControls}>
                        <div className={styles.prevButtonWrapper}>
                            <button onClick={handlePrev} className={styles.prevButton}>
                                <img src='/icon/prev.svg' alt="previcon"  className={styles.prevIcon}/>
                            </button>
                        </div>
                        <div className={styles.playPauseButtonWrapper}>
                            <button onClick={handlePlayPause} className={styles.playPauseButton}>
                                {isPlaying ? (
                                <div className={styles.pauseLines}>
                                    <img src="/icon/line1.svg" alt="pause line 1" className={styles.pauseLineOne}/>
                                    <img src="/icon/line2.svg" alt="pause line 2" className={styles.pauseLineTwo}/>
                                </div>
                                ) : (
                                <img src="/icon/play.svg" alt="play" className={styles.playIcon} />
                                )}
                            </button>
                        </div>

                        <div className={styles.prevButtonWrapper}>
                            <button onClick={handleNext} className={styles.prevButton}> 
                                <img src='/icon/next.svg' alt="nexticon" className={styles.prevIcon} />
                            </button>    
                        </div>
                    </div>

                    <div className={styles.shuffleWrapper}>
                        <button className={styles.shuffleButton}  onClick={() => setIsShuffle(prev => !prev)}> 
                            <img src='/icon/shuffle.svg' alt="nexticon" className={styles.shuffleIcon} />
                         </button>    
                    </div>
                    
                </div>
                <div className={styles.audioPlayer}>
                    <audio 
                        ref={audioRef}
                        src={tracks[trackIndex]}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadMetadata}
                        onEnded={handleNext}
                    />
                    
                    <input type="range"
                    className={styles.timeSlider}
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    step={0.1}
                    style={{
                        background: `linear-gradient(to right, #A54CFF 0%, #A54CFF ${(currentTime / duration) * 100}%, #FFFFFF ${(currentTime / duration) * 100}%, #FFFFFF 100%)`
                      }}
                      />
                    
                    <div className={styles.timeLabels}>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    
                    
                </div>


            </div>

            <div className={styles.volumeControl}  >
                <img src='/icon/volume.svg' alt="volume" className={styles.volumeIcon} />
                
                <input
                    className={styles.volumeSlider}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => {
                        const newVolume = parseFloat(e.target.value);
                        setVolume(newVolume);
                        if (audioRef.current) audioRef.current.volume = newVolume;

                    
                        e.target.style.setProperty('--volume-percent', `${newVolume * 100}%`);
                        
                    }}
                    style={{ "--volume-percent": `${volume * 100}%` } as React.CSSProperties}
                
                /> 

                    
                    <span className={styles.volumeLabel}>
                        {Math.round(volume * 100)}
                    </span>
                    
                
            </div>
            

        </div>
    )
}