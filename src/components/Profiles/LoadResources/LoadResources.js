import { useState } from 'react';

/**
 * Компонент предназначен для загрузки svg иконок, которые показываются во время выполнения запросов.
 * Так как на загрузку иконок тоже нужно время, то они появляются с опозданием в случае первого запроса,
 * на дальнейших запросах они отображаются как надо. Поэтому, что бы при первом использовании они появлялись сразу,
 * приходится подгружать их заранее.
 * @returns 
 */

export default function LoadResources({ setIsSrcLaded }) {
  const [isMount, setIsMount] = useState(true);

  setTimeout(() => {
    setIsSrcLaded(true);
    setIsMount(false);
  }, 1);
  

  if (isMount) return (
    <>
      <div className={'profiles__loading profiles__loading-list _visually-hidden'}></div>
      <div className={'profiles__loading profiles__loading-details _visually-hidden'}></div>
    </>
  )
  
  return null;
}
