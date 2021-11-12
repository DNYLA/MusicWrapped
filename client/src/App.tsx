import { useEffect, useState } from 'react';
import { MenuTable } from './components/MenuTable';
import { MusicWrapped } from './utils/APIHandler';
import { User } from './utils/types';
import { MyListbox } from './components/CustomListBox';
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

const dateRange = [
  {
    id: 1,
    name: '4 Weeks',
    value: 'short_term',
  },
  {
    id: 2,
    name: '6 Months',
    value: 'medium_term',
  },
  {
    id: 3,
    name: 'All Time',
    value: 'long_term',
  },
];

function App() {
  const [user, setUser] = useState(loadingUser);
  const [selectedRange, setSelectedRange] = useState(dateRange[0]);

  useEffect(() => {
    MusicWrapped.User.getUser().then((res: any) => {
      console.log(res);
      setUser(res);
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <TabBox />

      {/* <MenuTable range={selectedRange} /> */}
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
