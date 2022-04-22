import './App.css'
import { Queues } from './components/queues/queues'
import { TimerAndQueue } from './components/timer-queue/timer-queue'
import { TimerComponent } from './components/timer/timer'
import { useCircularState } from './services/circular-state-hook'

function App() {
  const [page, nextPage] = useCircularState([1, 2, 3])
  return (
    <div className="App">
      <div>
        <button onClick={() => nextPage()}>next</button>
      </div>
      {page === 1 && <TimerComponent />}
      {page === 2 && <Queues />}
      {page === 3 && <TimerAndQueue />}
    </div>
  )
}

export default App
