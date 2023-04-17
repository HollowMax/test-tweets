import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Tweets from './Tweets/Tweets';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tweets" element={<Tweets />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
