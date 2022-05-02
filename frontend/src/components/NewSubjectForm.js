import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import './styles/NewExamForm.css';

export default function NewSubjectForm(props){

    const [subjectName, setSubjectName] = useState("");
    const [professorName, setProfessor] = useState("");
    const [points, setPoints] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const handleSubject = async(evt) => {
        evt.preventDefault();
        setLoading(true);
    }

    return(
        <Form onSubmit = {evt => handleSubject(evt)} className = "form-box">
            <h3>Create a subject</h3>
            <Form.Group>
                <Form.Label>Subject name</Form.Label>
                <Form.Control 
                    type = "text" 
                    placeholder = "Subject..." 
                    onChange = {(evt) => setSubjectName(evt.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Professor's name</Form.Label>
                <Form.Control 
                    type = "text" 
                    placeholder = "Professor..." 
                    onChange = {(evt) => setProfessor(evt.target.value)}
                    required 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>ESPB points</Form.Label>
                <Form.Control 
                    type = "number" 
                    min = "3" 
                    placeholder = "Points..."
                    onChange = {(evt) => setPoints(evt.target.value)}
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