import TicketPicker from './TicketPicker.js';
import MainBoard from './MainBoard.js';
import React,{Component} from 'react';
import {Row,Container,Alert,Button} from 'react-bootstrap';




class Home extends Component{
    constructor(props){
        super(props);
        this.state={logs:[{"number":"A1","counter":"1"},{"number":"A2","counter":"2"},{"number":"C1","counter":"1"},{"number":"D1","counter":"4"},{"number":"E1","counter":"5"}],num:[0,0,0,0,0],typesOfServices: [{"name":"categoryA","sign":"A"},{"name":"categoryB","sign":"B"},{"name":"categoryC","sign":"C"},{"name":"categoryD","sign":"D"},{"name":"categoryE","sign":"E"}] };
        this.createTicket=this.createTicket.bind(this);
    }
    createTicket(index){
        let num=this.state.num;
        num[index]=num[index]+1;
        let Tnumber=this.state.typesOfServices[index].sign+num[index].toString();
        this.setState({newTicket:Tnumber,newTicketWaitingTime:"10 minutes",num:num});
    }
   notNewTicket(){
    this.setState({newTicket:undefined});
   }
    render(){
        return(<>
        <Container fluid>
        <Row className="justify-content-md-center ">
            <MainBoard logs={this.state.logs}></MainBoard>
        </Row>
        </Container>
        <Container fluid>
        <Row className="justify-content-md-center ">
        {this.state.newTicket ? <><Alert variant="success">YOUR NUMBER IS : {this.state.newTicket}<Row className="justify-content-md-center "> Estimated waiting time: {this.state.newTicketWaitingTime}</Row><Row className="justify-content-md-center "><Button variant="success" onClick={(ev)=>this.notNewTicket()}>OK</Button></Row></Alert></>
           : <TicketPicker options={this.state.typesOfServices} newTicket={this.createTicket}/>}
        </Row>
        </Container>    
        </>);
    }
}

export default Home;