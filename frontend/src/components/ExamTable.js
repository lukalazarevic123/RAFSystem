import { Table, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ExamTable(props){

    return(
        <Container>
            <h3>Sign up for the exams</h3>
            <Table striped bordered hover variant = "dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Professor</th>
                        <th>Date</th>
                        <th>Sign up</th>
                    </tr>
                </thead>
                <tbody>
                    {props.exams.map(exam => 
                        <tr key = {exam.id}>
                            <td>{exam.id}</td>
                            <td>{exam.name}</td>
                            <td>{exam.professor}</td>
                            <td>{exam.date}</td>
                            <td>
                                <Button variant = "light" size = "sm">
                                    Sign up
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    )
}