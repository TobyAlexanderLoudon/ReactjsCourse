import Player from './components/player/Player.jsx';
import TimerChallange from './components/timerChallange/TimerChallange.jsx';
import { CHALLENGES } from './data/challenges.js';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        {CHALLENGES.map((challenge) => (
          <TimerChallange
            key={challenge.title}
            title={challenge.title}
            targetTime={challenge.targetTime}
          />
        ))}
      </div>
    </>
  );
}

export default App;
