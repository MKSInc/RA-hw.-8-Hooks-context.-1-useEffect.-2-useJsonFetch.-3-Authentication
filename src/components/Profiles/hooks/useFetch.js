import { useState, useEffect, useContext } from 'react';
import ProfilesContext from '../ProfilesContext/ProfilesContext';

/**
 * Хук useFetch выполняет запрос на переданный url и возвращает полученные данные.
 * dataName - указывает для каких данных показывать и скрывать иконку загрузки.
 * Также возвращает fetchController, с помощью которого можно прервать запрос,
 * если пользователь выбрал другой профиль. Для использования нужно вызвать
 * fetchController.abort() в useEffect хуке того компонента, где вызывается и сам useFetch.
 * Таким образом useEffect среагирует на смену id профиля и вызовет fetchController.abort()
 * @returns 
 */

export default function useFetch({ url, initialData, dataName }) {
  const { setIsLoading } = useContext(ProfilesContext);
  const [data, setData] = useState(initialData);
  const fetchController = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      // Показываем значек загрузки.
      setIsLoading((prevValue) => ({...prevValue, [dataName]: true}));

      try {
        const response = await fetch(process.env.REACT_APP_PROFILES_DATA_URL + url, { signal: fetchController.signal });
        if (!response.ok) throw new Error(`${response.url} ${response.status}`);
        const data = await response.json();
        setData(data);
        // Убираем значек загрузки.
        setIsLoading((prevValue) => ({...prevValue, [dataName]: false}));

      } catch(error) {
          console.log('⛔', error.message);
          // Убираем значек загрузки только в случае, если ошибка не была вызванна прерыванием запроса.
          // Та же ситуациия, если убирать значек при любом исходе ниже.
          if (error.name !== 'AbortError') {
            setIsLoading((prevValue) => ({...prevValue, [dataName]: false}));
          }
      }

      // Если убирать значек загрузки при любом исходе, то в ситуации, когда пользователь прерывает запрос,
      // выбирая другой профиль, этот сброс значка от прерванного запроса сработает после начала нового запроса
      // и тем самым уберет значек загрузки для нового профиля.
      // setIsLoading((prevValue) => ({...prevValue, [dataName]: false}));
    }
    
    fetchData();

    // Вариант обработки запроса через then-catch, на который react ругается и просит переделать
    // через async-await.
    /*
    fetch(process.env.REACT_APP_PROFILES_DATA_URL + url, { signal: fetchController.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`${response.url} ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading((prevValue) => ({...prevValue, [dataName]: false}));
      })
      .catch((error) => {
        console.error('⛔', error.message);
        // Убираем значек загрузки только в случае, если ошибка не была вызванна прерыванием запроса.
        // Та же ситуациия, что и с блоком finally.
        if (error.name !== 'AbortError') {
          setIsLoading((prevValue) => ({...prevValue, [dataName]: false}));
        }
      })
      .finally(() => {
        // Если убирать значек загрузки в finally, то в ситуации, когда пользователь прерывает запрос,
        // выбирая другой профиль, finally от прерванного запроса сработает после начала нового запроса
        // и тем самым уберет значек загрузки для нового профиля.
        // setIsLoading((prevValue) => ({...prevValue, [dataName]: false}));
      });*/

  }, [url]);

  return [{ data, fetchController }];
}
