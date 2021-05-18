import {
  albumItem
} from './AlbumItem.module.scss';
import {
  Link
} from 'react-router-dom';

const AlbumItem = ({ albumCover, albumTitle, artist, albumid }) => {
  return (
    <Link
      to={`/album/${albumid}`}
      className={albumItem}
    >
      <img src={albumCover} alt={albumTitle}/>
      <section>
        <h3>{albumTitle}</h3>
        <p>{artist}</p>
      </section>
    </Link>
  )
}

export default AlbumItem;
