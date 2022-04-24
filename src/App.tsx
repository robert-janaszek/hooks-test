import './App.css'
import { Queues } from './components/queues/queues'
import { TimerAndQueue } from './components/timer-queue/timer-queue'
import { TimerComponent } from './components/timer/timer'
import { QueryComponent } from './components/query/query';
import { useCircularState } from './services/circular-state-hook'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false }}});

function App() {
  const { page, next: nextPage } = useCircularState([1, 2, 3, 4], 3);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div>
          <button onClick={() => nextPage()}>next</button>
        </div>
        {page === 1 && <TimerComponent />}
        {page === 2 && <Queues />}
        {page === 3 && <TimerAndQueue />}
        {page === 4 && <QueryComponent />}
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
