"use client";

import ArtistCard from "./components/artistCard/ArtistCard";
import Player from "./components/player/Player";
import Header from "./components/header/header";
import MostListened from "./components/mostListened/MostListened";
import Nav from "./components/navigation/nav";
import PopularCard from "./components/popularSongCard/SongCard";
import styles from "./page.module.css";
import AlbumCard from "./components/albumCard/AlbumCard";

const artists = [
  { name: "Eminem", icon: "/eminem.svg" },
  { name: "Bad Bunny", icon: "/messy.svg" },
  { name: "Ariana", icon: "/roddyRich.svg" },
  { name: "Doja", icon: "/selfish.svg" },
  { name: "SZA", icon: "/abracadabra.svg" },
];

const songs = [
  { icon: "/abracadabra.svg", artistName: "Lady Gaga", songName: "Abracadabra" },
  { icon: "/roddyRich.svg", artistName: "Roddy Ricch", songName: "The Box" },
  { icon: "/messy.svg", artistName: "Miley", songName: "Midnight" },
  { icon: "/selfish.svg", artistName: "NF", songName: "Selfish" },
];

const albums = [
  { icon: "/selfish.svg", artistName: "Selfish", songName: "2014 - Album" },
  { icon: "/eminem.svg", artistName: "Recovery", songName: "2011 - Album" },
  { icon: "/messy.svg", artistName: "Night Shift", songName: "2024 - Album" },
  { icon: "/abracadabra.svg", artistName: "Solar Echo", songName: "2023 - Album" },
];

const chips = ["All", "Trending", "Hip Hop", "Pop", "R&B", "Electronic"];

export default function Home() {
  return (
    <div className={styles.pageShell}>
      <Header />

      <div className={styles.main}>
        <Nav />

        <main className={styles.center}>
          <section className={styles.hero}>
            <div className={styles.heroText}>
              <p className={styles.kicker}>Welcome back</p>
              <h1>Feel the rhythm. Own the night.</h1>
              <p className={styles.subtitle}>
                Discover fresh sounds, trending playlists, and the artists defining this week&apos;s sound.
              </p>

              <div className={styles.heroActions}>
                <button className={styles.primaryButton}>Play mix</button>
                <button className={styles.secondaryButton}>Follow</button>
              </div>

              <div className={styles.statsRow}>
                <div>
                  <span>18.4k</span>
                  <small>listeners</small>
                </div>
                <div>
                  <span>348</span>
                  <small>tracks</small>
                </div>
                <div>
                  <span>5.9k</span>
                  <small>followers</small>
                </div>
              </div>
            </div>

            <div className={styles.heroArt}>
              <div className={styles.glow} />
              <img src="/roddyRich.svg" alt="Featured artist" className={styles.featureImage} />
              <div className={styles.nowPlayingCard}>
                <span>Now playing</span>
                <strong>The Box</strong>
                <small>Roddy Ricch</small>
              </div>
            </div>
          </section>

          <div className={styles.playerWrap}>
            <Player icon="/roddyRich.svg" artistName="Roddy Ricch" songName="The Box" />
          </div>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Trending artists</h2>
              <a href="#">See all</a>
            </div>

            <div className={styles.filterRow}>
              {chips.map((chip) => (
                <button
                  key={chip}
                  className={`${styles.filterChip} ${chip === "All" ? styles.activeChip : ""}`}
                  type="button"
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className={styles.artistRow}>
              {artists.map((artist) => (
                <ArtistCard key={artist.name} name={artist.name} icon={artist.icon} />
              ))}
            </div>
          </section>

          <section className={styles.featuredGrid}>
            <div className={styles.featurePanel}>
              <div className={styles.sectionHeader}>
                <h2>Popular songs</h2>
                <a href="#">See all</a>
              </div>
              <div className={styles.songGrid}>
                {songs.map((song) => (
                  <PopularCard
                    key={`${song.songName}-${song.artistName}`}
                    icon={song.icon}
                    artistName={song.artistName}
                    songName={song.songName}
                  />
                ))}
              </div>
            </div>

            <div className={styles.featurePanel}>
              <div className={styles.sectionHeader}>
                <h2>Top albums</h2>
                <a href="#">See all</a>
              </div>
              <div className={styles.albumGrid}>
                {albums.map((album) => (
                  <AlbumCard
                    key={`${album.songName}-${album.artistName}`}
                    icon={album.icon}
                    artistName={album.artistName}
                    songName={album.songName}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Most listened this week</h2>
              <a href="#">View playlist</a>
            </div>

            <div className={styles.listeningList}>
              <MostListened />
              <MostListened />
              <MostListened />
              <MostListened />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
