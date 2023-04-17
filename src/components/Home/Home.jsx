import { useEffect, useState } from 'react';
import { LineWave } from 'react-loader-spinner';
import User from '../User/User';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [dataLength, setDataLength] = useState(null);
  const [limit, setLimit] = useState(12);
  const [select, setSelect] = useState('showAll');

  useEffect(() => {
    fetch('https://6437f247894c9029e8ca8d37.mockapi.io/Users')
      .then(el => el.json())
      .then(el => setDataLength(el.length))
      .catch(console.log);
  }, []);

  useEffect(() => {
    fetch(
      `https://6437f247894c9029e8ca8d37.mockapi.io/Users?page=1&limit=${limit}`
    )
      .then(el => el.json())
      .then(setUsers)
      .catch(console.log);
  }, [limit]);

  const onLoadMore = e => {
    setLimit(prevState => prevState + 12);
    e.target.blur();
  };

  const onSelect = e => {
    setSelect(e.target.value);
  };

  return (
    <>
      <select onChange={onSelect} className="select">
        <option className="option" value="showAll">
          show all
        </option>
        <option className="option" value="follow">
          follow
        </option>
        <option className="option" value="followings">
          followings
        </option>
      </select>

      <ul className="users-list">
        {users.map(el =>
          el ? (
            <li key={el.id}>
              <User
                id={el.id}
                avatar={el.avatar}
                tweets={el.Tweets}
                followers={el.Followers}
                select={select}
              />
            </li>
          ) : null
        )}
      </ul>
      {users.length ? (
        <>
          {select === 'showAll' && (
            <div className="load-more__container">
              <button
                onClick={onLoadMore}
                className="load-more__btn"
                style={{ display: dataLength >= limit ? 'block' : 'none' }}
              >
                load more
              </button>
            </div>
          )}
        </>
      ) : (
        <LineWave
          height="300"
          width="300"
          color="#491481"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass="spiner"
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      )}
    </>
  );
}
