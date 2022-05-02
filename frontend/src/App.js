import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import ExamTable from './components/ExamTable';
import NewExamForm from './components/NewExamForm';
import NewSubjectForm from './components/NewSubjectForm';
import NewStudentForm from './components/NewStudentForm';

function App() {
  return (
    <div className="App">
      <Header />
      <div className = "user-info">
        <h4>User: </h4>
      </div>
      <Container  className="justify-content-center text-center mt-5">
        <ExamTable exams = {[{id: 123, name: "asp", professor: "urosevic"}]}/>
        <Row>
          <Col>
            <NewExamForm  exams = {[{id: 123, name: "asp", professor: "urosevic"}]}/>
          </Col>
          <Col>
            <NewSubjectForm />
          </Col>
          <Col>
            <NewStudentForm />
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default App;
