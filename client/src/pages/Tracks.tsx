import { TabBox } from '../components/TabBox';

interface TracksProps {
  user: any;
}

export function TracksPage({ user }: TracksProps) {
  return (
    <div>
      <TabBox isTracksTab={true} />

      <header className="App-header">
        <img src={user?.photoUrl} alt="Spotify Profile" />
        <p>
          Welcome <code>{user?.displayName}</code> your UserID is {user?.id}
        </p>
      </header>
    </div>
  );
}
