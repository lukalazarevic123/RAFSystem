import { useState } from "react";
import { Button, Form, FormSelect, Spinner } from "react-bootstrap";
import './styles/NewExamForm.css';

export default function NewStudentForm(props){

    const [studentName, setStudentName] = useState("");
    const [department, setDepartment] = useState(0);
    const [year, setYear] = useState(0);
    const [address, setAddress] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const handleStudent = async(evt) => {
        evt.preventDefault();
        setLoading(true);
    }

    return(
        <Form onSubmit = {evt => handleStudent(evt)} className = "form-box">
            <h3>Admit a student</h3>
            <Form.Group>
                <Form.Label>Student name</Form.Label>
                <Form.Control 
                    type = "text" 
                    placeholder = "Name..." 
                    onChange = {(evt) => setStudentName(evt.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Department</Form.Label>
                <FormSelect onChange={evt => {setDepartment(evt.target.value)}} required>
                    <option value = {0}>Select a department</option>
                    <option value = {1}>RN</option>
                    <option value = {2}>RI</option>
                    <option value = {3}>D</option>
                    <option value = {4}>IT</option>
                </FormSelect>
            </Form.Group>
            <Form.Group>
                <Form.Label>Year of attendance</Form.Label>
                <Form.Control 
                    type = "number" 
                    min = "1" 
                    placeholder = "Year..."
                    onChange = {(evt) => setYear(evt.target.value)}
                    required 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Students address</Form.Label>
                <Form.Control 
                    type = "text" 
                    placeholder = "Address..."
                    onChange = {(evt) => setYear(evt.target.value)}
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