import { useEffect, useState } from 'react';
import { MusicWrapped } from './utils/APIHandler';
import { User } from './utils/types';
import Navbar from './components/navbar';
import { TabBox } from './components/TabBox';

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

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <TabBox />

      {/* <MenuTable range={selectedRange} /> */}
      <header className="App-header">
        <img src={user?.photoUrl} alt="Spotify Profile" />
        <p>
          Welcome <code>{user?.displayName}</code> your UserID is {user?.id}
        </p>
      </header>
    </div>
  );
}

export default App;
