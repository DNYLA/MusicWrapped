import { Fragment, useEffect, useState } from 'react';
import { MusicWrapped } from './utils/APIHandler';
import { User } from './utils/types';
import Navbar from './components/navbar';
import { TabBox } from './components/TabBox';
import { TracksPage } from './pages/Tracks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArtistsPage } from './pages/Artist';

const loadingUser: User = {
  id: '0',
  username: 'bob',
  displayName: 'Bob',
  photoUrl: 'n/a',
  refreshToken: '0',
  accessToken: '0',
  expires_in: 0,
};

function App() {
  const [user, setUser] = useState(loadingUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MusicWrapped.User.getUser().then((res: any) => {
      console.log(res);
      setUser(res);
      setLoading(false);
    });
  }, []);

  return (
    <Fragment>
      <Navbar />

      <Routes>
        <Route path="/tracks" element={<TracksPage user={user} />} />
        <Route path="/artists" element={<ArtistsPage user={user} />} />
        <Route path="/genres" element={<div>Genres Under Construction</div>} />
        <Route
          path="/recent"
          element={<div>Recently Played Under Construction</div>}
        />
      </Routes>
      {/* <MenuTable range={selectedRange} /> */}
    </Fragment>
  );
}

export default App;
