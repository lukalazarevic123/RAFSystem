import { useState } from "react";
import { Button, Form, FormSelect, Spinner } from "react-bootstrap";
import './styles/NewExamForm.css';

export default function NewExamForm(props){

    const [examDate, setExamDate] = useState(0);
    const [examID, setExamID] = useState(-1);
    const [isLoading, setLoading] = useState(false);

    const handleExam = async(evt) => {
        evt.preventDefault();
        setLoading(true);
    }

    return(
        <Form onSubmit = {evt => handleExam(evt)} className = "form-box">
            <h3>Create an exam</h3>
            <Form.Group>
                <Form.Label>Subject name</Form.Label>
                <FormSelect onChange={evt => {setExamID(evt.target.value)}} required>
                    <option value = "">Select a subject</option>
                    {props.exams.map(exam => 
                        <option key = {exam.id} value = {exam.id}>{exam.name}</option>    
                    )}
                </FormSelect>
            </Form.Group>
            <Form.Group>
                <Form.Label>Exam date</Form.Label>
                <Form.Control 
                    type = "date" 
                    onChange={evt => setExamDate(evt.target.value)}
                    required 
                />
            </Form.Group>
            <div>
                {isLoading?
                    <Spinner animation="border" role="status" variant = "dark" className = "mt-3">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <Button className = "ms-auto mt-3" variant = "dark" size = "lg" type= "submit">Vote</Button>
                }
            </div>
        </Form>
    )
}