import { useState } from 'react';
import LoadResources from './LoadResources/LoadResources';
import ProfilesList from './ProfilesList/ProfilesList';
import ProfilesDetails from './ProfilesDetails/ProfilesDetails';
import ProfilesContext from './ProfilesContext/ProfilesContext';
import './profiles.css';

export default function Profiles() {
  const [selectedID, setSelectedID] = useState(null);
  const [isLoading, setIsLoading] = useState({
    list: false,
    details: false,
  });

  const handleOnItemClick = (item) => {
    setSelectedID(item.id);
  }

  return (
    <ProfilesContext.Provider value={{setIsLoading}}>
      <div className={'profiles'}>
        <LoadResources />
        <div className={'profiles__column-1'}>
          <ProfilesList handleOnItemClick={handleOnItemClick} selectedID={selectedID} isLoading={isLoading} />
        </div>

        <div className={'profiles__column-2'}>
          {selectedID !== null ? <ProfilesDetails selectedID={selectedID} />: null}
        </div>
      </div>
    </ProfilesContext.Provider>
  )
}
