import { ReactComponent as PlayIcon } from './assets/play.svg';
import { ReactComponent as PauseIcon } from './assets/pause.svg';
import {
  songItem
} from './SongItem.module.scss';

const SongItem = ({src, title, artist, onClick, status, id }) => {
  console.log(status, id);
  const ButtonIcon = status === id + '' ?  PauseIcon : PlayIcon;

  return (
  <figure className={songItem}>
    <figcaption>{`${title} - ${artist}`}</figcaption>
    <audio src={src} id={id}></audio>
    <button 
      type="button" 
      onClick={onClick}
      aria-label={status}
    >
      <ButtonIcon />
    </button>
  </figure>
  );
};

export default SongItem;
