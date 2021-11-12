import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

function ProfilesDetails({ selectedID }) {
  const [{ data, fetchController }] = useFetch({
    url: `${selectedID}.json`,
    initialData: null,
    dataName: 'details',
  });

  useEffect(() => {
    return () => fetchController.abort()
  }, [selectedID]);

  if (data === null) return null;

  // Функция для корректировки ссылки на аватар, чтобы приходили разные картинки.
  // Для этого нужно менять в ссылке размер кртинки.
  const updateAvatar = (url) => {
    const imgUrl = new URL(url);
    // Определяем случайный размер в диапазоне 280 - 320.
    const imgSize = Math.floor(Math.random() * (320 - 280)) + 280;
    imgUrl.pathname = imgSize;
    return imgUrl.href;
  }

  return (
    <div className={'profiles__details details-profiles'}>
      <ul className={'profiles__list'}>
        <li>
          <div className={'profiles__img'}>
            <img src={updateAvatar(data.avatar)} alt={'user'}/>
          </div>
        </li>
        <li><div className={'profiles__text propfiles__name'}>{data.name}</div></li>
        <li><div className={'profiles__text'}>City: {data.details.city}</div></li>
        <li><div className={'profiles__text'}>Company: {data.details.company}</div></li>
        <li><div className={'profiles__text'}>Position: {data.details.position}</div></li>
      </ul>
    </div>
  )
}

export default ProfilesDetails;
