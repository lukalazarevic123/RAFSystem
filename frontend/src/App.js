import './App.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import ExamTable from './components/ExamTable';

function App() {
  return (
    <div className="App">
      <Header />
      <Container  className="justify-content-center text-center mt-5">
        <ExamTable exams = {[]}/>
      </Container>
      
    </div>
  );
}

export default App;
