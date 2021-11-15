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

  return (
    <div className={'profiles__details details-profiles'}>
      <ul className={'profiles__list'}>
        <li>
          <div className={'profiles__img'}>
            <img src={data.avatar} alt={'user'}/>
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
