import {
  AlbumDetail as AlbumDetailItem,
  SongItem
} from 'components';
import {
  useParams
} from 'react-router-dom';
import {
  songlist,
} from './AlbumDetail.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { getData } from 'utility';

const AlbumDetail = () => {
  let { albumid } = useParams();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playing, setPlaying] = useState(null);

  const main = useRef(); 
  useEffect(() => {
    const mainTag = main.current;
    if (mainTag) {
      const addEventToMain = () => mainTag.addEventListener('click', handlePlayMusic);
      addEventToMain();
    }

    getData(`album/${albumid}`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error getting the data: ', error);
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });

    getData(`songs/${albumid}`)
    .then(response => {
      setSongs(response.data);
    })
    .catch(error => {
      console.error('Error getting the data: ', error);
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });

    return function cleanup() {
      if (mainTag) mainTag.removeEventListener('click', handlePlayMusic);
    }

  }, [albumid, main]);

  // event handler
  const handlePlayMusic = ({target}) => {
    const audio = target.previousElementSibling;
    const audiolist = document.querySelectorAll('audio');
    // audiolist.forEach(audio => console.log(audio === target));
    if (audio.paused) {
      audio.play();
      setPlaying(audio.id);
      audiolist.forEach(audioItem => {
        if (audioItem.id !== audio.id) audioItem.pause();
      });
    } else {
      audio.pause();
      setPlaying(null);
    }
    console.log(playing);
  }
  
  if (loading) return 'it is loading';
  if (error) return 'There is an Error';

  return (
    <main ref={main}>
      <AlbumDetailItem
        albumCover={data.album_cover}
        albumTitle={data.name}
        artist={data.artist}
        albumInformation={data.introduction}
        productionAgency={data.production_agency}
        genre={data.genre}
        date={data.date}
      />
      <section className={songlist}>
        <h2>앨범 수록 곡</h2>
        {
          songs && songs.map((song, index) => (
            <SongItem 
              src={song.song_url}
              title={song.name}
              artist={song.artist}
              onClick={handlePlayMusic}
              status={playing}
              key={`${song.song_id}-${index}`}
              id={index}
            />
          ))
        }
      </section>
    </main>
  );
}

export default AlbumDetail;
