import {
  albumDetailItem
} from './AlbumDetail.module.scss';

const AlbumDetail = ({ 
  albumCover, 
  albumTitle,
  artist,
  albumInformation,
  productionAgency,
  genre,
  date
}) => {
  return (
    <section className={albumDetailItem}>
      <img src={albumCover} alt={albumTitle}/>
      <table>
        <tbody>
        <tr>
          <th>{'앨범 명'}</th>
          <td>{albumTitle}</td>
        </tr>
        <tr>
          <th>{'아티스트'}</th>
          <td>{artist}</td>
        </tr>
        <tr>
          <th>{'장르'}</th>
          <td>{genre}</td>
        </tr>
        <tr>
          <th>{'배급사'}</th>
          <td>{productionAgency}</td>
        </tr>
        <tr>
          <th>{'소개'}</th>
          <td>{albumInformation}</td>
        </tr>
        <tr>
          <th>{'발매일'}</th>
          <td>{date}</td>
        </tr>
        </tbody>
      </table>
    </section>
  )
}

export default AlbumDetail;

