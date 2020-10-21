import React, {Component} from 'react';
import Navbars from './Navbar.js'
import {Navbar, Card, Button, Form, Alert} from 'react-bootstrap';
import API from '../../Api.js';

class OfficerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counterList: [],
      currentCustomerValue: null,
      counterValue: null,
      clicked: null
    }
  }

  componentDidMount() {
    this.getAllCounters();
  }

  getAllCounters = () => {
    API.getCounters()
      .then((res) => {
        let allCounters = [];
        for (let i = 0; i < res.length; i++) {
          allCounters.push(res[i]);
        }
        this.setState({counterList: allCounters})
      })
      .catch((err) => {
        this.setState({AuthErr: err.msg});
      });
  }


  getCurrentTicketId = (counterValue) => {
    if (counterValue === null) {
    }
    API
      .getCurrentTicketId(counterValue)
      .then((res) => {
        let Tnumber=this.props.typesOfServices[res.serviceTypeId-1].sign+res.currentTicketNumber;
     
        this.setState({currentCustomerValue: Tnumber})
      })
      .catch((err) => {
        this.setState({AuthErr: err.msg});
      });
  }

  getNextTicketId = (counterValue) => {
    if (counterValue === "") {
      
    }
    else{
    API.getNextTicketId(counterValue)
      .then((res) => {
        let Tnumber=this.props.typesOfServices[res.serviceTypeId-1].sign+res.ticketNumber;
     
        this.setState({currentCustomerValue: Tnumber})
      })
      .catch((err) => {
        this.setState({AuthErr: err.msg});
      });
    }
  }

  onChangeCounter = (event) => {
    this.setState({counterValue: event.target.value},
       () => this.getCurrentTicketId(this.state.counterValue))
  };


  onChangeButton = (id) => {
    this.setState({clicked: "clicked"})
    this.getNextTicketId(id);

    
  };

  render() {
    return (

      <div>
        
        <Card
          style={{
          float: "left",
          margin: "20px",
          width: '20rem'
        }}>
          <Card.Body>
            <Card.Title>Choose Your Counter</Card.Title>
            <Form.Control
              id="sduration"
              as="select"
              type="number"
              value={this.state.counterValue}
              onChange={(ev) => this.onChangeCounter(ev)}
              required>
              <option value={null}></option>
              {this
                .state
                .counterList
                .map(ctr => <option key={ctr.id} value={ctr.id}>{ctr.name}</option>)};
            </Form.Control>
          </Card.Body>
        </Card>

        <Card
          style={{
          float: "right",
          margin: "20px",
          width: '20rem'
        }}>
          <Card.Body>
            <Card.Title>Currently Served Number: {this.state.currentCustomerValue}</Card.Title>
          </Card.Body>
        </Card>

        <Card className="text-center">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>Call next customer to serve</Card.Title>
            <Button onClick={()=>{this.onChangeButton(this.state.counterValue)}} size="lg" variant="primary">NEXT</Button>
          </Card.Body>
          <Card.Footer >

          {this.state.clicked ==="clicked" && this.state.currentCustomerValue ===null 
             && <Alert variant={"warning"}>
               There is no tickets to serve for this counter.
            </Alert>}

          {this.state.counterValue ===""  && this.state.currentCustomerValue===undefined
          && <Alert variant={"warning"}>
              Please choose counter
            </Alert>}

          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default OfficerPage;