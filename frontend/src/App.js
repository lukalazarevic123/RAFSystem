import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import ExamTable from './components/ExamTable';
import NewExamForm from './components/NewExamForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Container  className="justify-content-center text-center mt-5">
        <ExamTable exams = {[{id: 123, name: "asp", professor: "urosevic"}]}/>
        <Row>
          <Col>
            <NewExamForm  exams = {[{id: 123, name: "asp", professor: "urosevic"}]}/>
          </Col>
          <Col>
            <NewExamForm  exams = {[{id: 123, name: "asp", professor: "urosevic"}]}/>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default App;
