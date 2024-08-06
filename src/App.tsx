import { ConversionForm } from './components/ConversionForm';
import { Layout } from './components/Layout';
import './App.css';

function App() {
  const { Container, TextArea, SubmitButton } = ConversionForm;

  return (
    <Layout>
      <Container>
        <TextArea />
        <SubmitButton>Convert to PDF</SubmitButton>
      </Container>
    </Layout>
  );
}

export default App;
