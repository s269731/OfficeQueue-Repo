import React,{Component} from 'react';
import {Alert,Button,Col,Row,Form} from 'react-bootstrap';


class TicketPicker extends Component{
    
    constructor(props){
        super(props);
        this.state={};
        
    }
    changeCat(cat){
        if(cat!==-1){
            this.setState({selected:cat});
        }
        else{
            this.setState({selected:null});
        }
    }
    render(){
    
    return (<>
    <Col sm={4} className="justify-content-md-center ">
    <Alert variant='info'>
    <Form method="POST" onSubmit={(event)=>{event.preventDefault();this.props.newTicket(this.state.selected)}}>
        <Row className="justify-content-md-center ">
            <Form.Group controlId="exampleForm.SelectCustom">
                 <Form.Label>Select a category and pick a ticket</Form.Label>
                    <Form.Control as="select" custom onChange={(ev)=>this.changeCat(ev.target.value)}>
                    <option key='-1' id="-1" value="-1" >Select a category</option>
      {this.props.options.map((option,index)=>{return(<option key={index} id={index} value={index} onClick={(ev)=>this.changeCat(ev.target.value)}>{option.name}</option>);})}
                    </Form.Control>
            </Form.Group>
        </Row>
        <Row className="justify-content-md-center ">{this.state.selected && <Button variant="primary" type="submit">Pick a Ticket</Button>}</Row>
    </Form>
    </Alert>
    </Col>
    </>);
    }
}

export default TicketPicker;