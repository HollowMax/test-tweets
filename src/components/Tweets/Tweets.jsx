import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function Tweets() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return state ? (
    <>
      <ul className="tweets-list">
        {state.tweets.map((el, idx) =>
          el ? (
            <li className="tweets-list__item" key={idx}>
              <p>{el}</p>
              <div className="tweets-list__arrow" />
            </li>
          ) : null
        )}
      </ul>
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
    </>
  ) : (
    <Navigate to="/" />
  );
}
