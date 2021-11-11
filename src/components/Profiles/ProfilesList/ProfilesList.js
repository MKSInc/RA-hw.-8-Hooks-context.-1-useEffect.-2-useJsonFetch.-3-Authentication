import useFetch from '../hooks/useFetch';

function ProfilesList({ handleOnItemClick, selectedID, isLoading }) {
  const [{ data: list }] = useFetch({
    url: 'users.json',
    initialData: [],
    dataName: 'list',
  });

  const setListItemClasses = (item) => {
    const classes = [];
    if (item.id === selectedID) classes.push('profiles__selected');
    if (isLoading.details) classes.push('profiles__loading', 'profiles__loading-details');

    return classes.join(' ');
  }

  return (
    <div className={'profiles__item'}>
      <ul className={'profiles__list'}>
        {isLoading.list ?
        <li
          className={'profiles__loading profiles__loading-list'}>
          <div className={'profiles__text'}>Loading...</div>
        </li>
        : null}   
        {list.map((item) => 
          <li 
            key={item.id}
            className={`${setListItemClasses(item)}`}
            onClick={() => handleOnItemClick(item)}>
            <button className={'profiles__text'}>{item.name}</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ProfilesList;
