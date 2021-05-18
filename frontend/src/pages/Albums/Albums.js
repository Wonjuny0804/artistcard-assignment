import { 
  AlbumItem
} from 'components';
import { getData } from 'utility';
import { useState, useEffect } from 'react';

const Albums = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData('albums')
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
  }, []);

  if (loading) return 'it is loading';
  if (error) return 'There is an Error';

  return (
    <main>
      {data && data.map(({
        album_cover,
        name,
        artist,
        album_id
      }) => (
        <AlbumItem
          albumCover={album_cover} 
          albumTitle={name} 
          artist={artist}
          albumid={album_id}
          key={album_id}
        />
      ))}
    </main>
  )
}

export default Albums;
