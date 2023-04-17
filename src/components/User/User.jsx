import { useEffect, useState } from 'react';
import goit from '../../images/goit.svg';
import { NavLink } from 'react-router-dom';

export default function Users({ id, avatar, tweets, followers, select }) {
  const [followed, setFollowed] = useState(false);
  const [localFollowers, setLocalFollowers] = useState(followers);
  const [shown, setShown] = useState(false);

  useEffect(
    () => {
      const localData = JSON.parse(localStorage.getItem('followed'));
      const inLocal = localData?.find(el => el === id.toString());

      if (inLocal) {
        setFollowed(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    switch (select) {
      case 'follow':
        if (!followed) {
          setShown(true);
        } else {
          setShown(false);
        }
        break;
      case 'followings':
        if (followed) {
          setShown(true);
        } else {
          setShown(false);
        }
        break;

      default:
        setShown(true);
        break;
    }
  }, [select, followed]);

  const onFollow = async e => {
    e.target.disabled = true;
    const localData = JSON.parse(localStorage.getItem('followed'));

    const uniqueArr = new Set(localData);

    if (followed) {
      uniqueArr.delete(id);
      setLocalFollowers(prevState => --prevState);
      localStorage.setItem('followed', JSON.stringify([...uniqueArr]));
      setFollowed(false);
    } else {
      setLocalFollowers(prevState => ++prevState);
      localStorage.setItem('followed', JSON.stringify([...uniqueArr.add(id)]));
      setFollowed(true);
    }
    await fetch(`https://6437f247894c9029e8ca8d37.mockapi.io/Users/` + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
      body: JSON.stringify({ Followers: localFollowers }),
    });

    e.target.disabled = false;
    e.target.blur();
  };

  return (
    shown && (
      <div className="user-card">
        <div className="user-card__img-container">
          <img src={goit} alt="GoIT" className="user-card__img" />
        </div>
        <div className="user-card__separator-line">
          <div className="user-card__avatar-border">
            <img
              src={avatar}
              alt="User avatar"
              className="user-card__avatar-img"
            />
          </div>
        </div>
        <NavLink
          to="/tweets"
          className="user-card__text user-card__link"
          state={{ tweets: tweets.split('.') }}
        >
          {tweets.split('.').length - 1} tweets
        </NavLink>
        <p className="user-card__text">
          {localFollowers.toLocaleString()} followers
        </p>

        <button
          onClick={onFollow}
          className="user-card__btn"
          style={{ background: followed ? '#5CD3A8' : '#ebd8ff' }}
        >
          {followed ? 'following' : 'follow'}
        </button>
      </div>
    )
  );
}
