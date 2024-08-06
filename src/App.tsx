import { ConversionForm } from './components/ConversionForm';
import { Layout } from './components/Layout';
import './App.css';

function App() {
  return (
    <Layout>
      <ConversionForm.Root>
        <ConversionForm.TextArea />
        <ConversionForm.SubmitButton>Convert to PDF</ConversionForm.SubmitButton>
      </ConversionForm.Root>
    </Layout>
  );
}

export default App;
