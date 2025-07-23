import { TodoProvider } from './context/TodoContext';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-purple-400 py-8 px-4 flex">
        <Sidebar />
        <MainContent />
      </div>
    </TodoProvider>
  );
}

export default App;
