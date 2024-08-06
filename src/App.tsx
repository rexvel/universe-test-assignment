import './App.css';
import { Layout } from './components/Layout';

function App() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-4">
        <main className="w-full">
          <h1 className="text-4xl font-bold">Welcome to Vite!</h1>
        </main>
      </div>
    </Layout>
  );
}

export default App;
