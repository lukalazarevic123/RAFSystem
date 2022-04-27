import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ExamTable(props){
    return(
        <Table bordered hover variand = "dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Professor</th>
                    <th>Sign up</th>
                </tr>
            </thead>
            <tbody>
                {props.exams.map(exam => {
                    <tr key = {exam.id}>
                        <td>{exam.id}</td>
                        <td>{exam.name}</td>
                        <td>{exam.professor}</td>
                        <td>
                            <Button>
                                Sign up
                            </Button>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>
    )
}