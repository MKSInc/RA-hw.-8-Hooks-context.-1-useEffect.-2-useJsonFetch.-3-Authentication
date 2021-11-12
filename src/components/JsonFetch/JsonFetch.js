import useJsonFetch from './hooks/useJsonFetch';
import './jsonfetch.css';

function Success () {
  const [{ data }] = useJsonFetch('http://localhost:8080/data');

  return (
    <div className={'success'}>
      <div className={'jsonfetch__title'}>Успешное получение данных</div>
      <div className={'jsonfetch__text'}>Data: {data !== null ? data.status : ''}</div>
    </div>
  )
}

function Error () {
  const [{ error }] = useJsonFetch('http://localhost:8080/error');

  return (
    <div className={'error'}>
      <div className={'jsonfetch__title'}>Получение 500 ошибки</div>
      <div className={'jsonfetch__text jsonfetch__error'}>Error: {error !== null ? error : ''}</div>
    </div>
  )
}

function Loading () {
  const [{ loading }] = useJsonFetch('http://localhost:8080/loading');

  return (
    <div className={'loading'}>
      <div className={'jsonfetch__title'}>Индикатор загрузки (5 сек)</div>
      {loading ? 
        <div className={'jsonfetch__loading'}>Загрузка...</div>
        : null
      }
    </div>
  )
}

export default function JsonFetch() {
  return (
    <div className={'jsonfetch'}>
      <Success />
      <Error />
      <Loading />
    </div>
  )
}
