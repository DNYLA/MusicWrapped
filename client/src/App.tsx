import { useEffect, useState } from 'react';
import './App.css';
import { MenuTable } from './mTable';
import Example from './navbar';
import { MusicWrapped } from './utils/APIHandler';
import { User } from './utils/types';

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

  useEffect(() => {
    MusicWrapped.getUser().then((res: any) => {
      console.log(res);
      setUser(res);
    });
  }, []);

  return (
    <div className="App">
      <Example />
      <MenuTable />
      <header className="App-header">
        <img src={user.photoUrl} alt="Spotify Profile" />
        <p>
          Welcome <code>{user.displayName}</code> your UserID is {user.id}
        </p>
      </header>
    </div>
  );
}

export default App;
