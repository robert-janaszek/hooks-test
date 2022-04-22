import './App.css'
import { Queues } from './components/queues/queues'
import { TimerAndQueue } from './components/timer-queue/timer-queue'
import { TimerComponent } from './components/timer/timer'

function App() {
  return (
    <div className="App">
      <TimerComponent />
      <Queues />
      <TimerAndQueue />
    </div>
  )
}

export default App
