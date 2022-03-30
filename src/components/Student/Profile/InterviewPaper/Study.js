import { Form } from "react-bootstrap";

const Study = (props) => {
    return (
        <>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Thực trạng</Form.Label>
                <Form.Control required disabled={props.isView} name={props?.study?.reality} as="textarea" rows={1} defaultValue={props?.data?.reality} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Mục tiêu đặt ra ở kỳ sau</Form.Label>
                <Form.Control required disabled={props.isView} name={props?.study?.target} as="textarea" rows={1} defaultValue={props?.data?.target} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Giải trình</Form.Label>
                <Form.Control disabled={props.isView} name={props?.study?.explanation} as="textarea" rows={3} defaultValue={props?.data?.explanation} />
            </Form.Group>
        </>
    );
}

export default Study;