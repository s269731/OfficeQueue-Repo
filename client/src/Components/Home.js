import TicketPicker from './TicketPicker.js';
import MainBoard from './MainBoard.js';
import React,{Component} from 'react';
import {Row,Container,Alert,Button,Spinner, Navbar} from 'react-bootstrap';
import API from '../Api.js';



class Home extends Component{
    constructor(props){
        super(props);
        this.state={isLoading:true,logs:[],queues:[]};
        this.createTicket=this.createTicket.bind(this);
    }
    createTicket(index){
      index=parseInt(index)
      API.requireNewTicket(index+1).then((res)=>{
        console.log(res)
        let num=res.ticketNumber;
        let Tnumber=this.props.typesOfServices[res.serviceTypeId-1].sign+num.toString();
     
        this.setState({newTicket:Tnumber,newTicketWaitingTime:res.waitingTime,serverErr:false});
        this.updateMainScreen()

      }).catch((err)=>{
          this.setState({serverErr:true,ewTicket:undefined})
      })
           }
   notNewTicket(){
    this.setState({newTicket:undefined});
   }
   updateMainScreen(){
     
      Promise.all(this.state.counters.map((c)=>{return API.getLogs(c.id)})).then((res)=>{
        console.log(res)
        let logs=res.map((l)=>{
          let curTic=" "
          if(l.currentTicketNumber && l.serviceTypeId){
            curTic=this.props.typesOfServices[l.serviceTypeId-1].sign+l.currentTicketNumber.toString()
          }
          return ({
          counterName:l.counterName,
          currentTicketNumber:curTic
        })})
        console.log(logs)
        this.setState({logs:logs,serverErr:false})
      }).catch((err)=>{console.log(err)
        this.setState({serverErr:true})})

      Promise.all(this.props.typesOfServices.map((c)=>{return API.getQueue(c.id)})).then((res)=>{
        res=res.map((r)=>{console.log(r);return ({serviceName:this.props.typesOfServices[r.serviceTypeId-1].name,serviceTypeId:r.serviceTypeId,length:r.queueLength})})
        this.setState({queues:res,serverErr:false})
      }).catch((err)=>{console.log(err)
        this.setState({serverErr:true})})
      
   }

   componentDidMount(){   
       API.getCounters().then((counters)=>{
        this.setState({counters:counters,isLoading:false})
        this.updateMainScreen()
        this.interval = setInterval(() => this.updateMainScreen(), 3000);
      }).catch((err)=>{
        this.setState({serverErr:true});
      });
    

  
  }
    render(){
        return(<>
        <Container fluid>
        {/*<Row className=" below-nav justify-content-md-center">
            <Button variant="info" onClick={(ev)=>this.updateMainScreen()}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-repeat" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
              </svg> Refresh the Main Screen </Button>
             </Row>*/}
        <Row className="below-nav justify-content-md-center ">
            {this.state.logs ? <MainBoard queues={this.state.queues} logs={this.state.logs}></MainBoard> : <><Alert variant="info" className="below-nav"><Spinner animation="border" variant="primary"/>   Loading...</Alert></>}
        </Row>
       
        </Container>
        <Container fluid>
        <Row className="below-nav   justify-content-md-center ">
            {(this.state.isLoading && !this.state.serverErr) ? <><Alert variant="primary" className="below-nav"><Spinner animation="border" variant="primary"/>   Loading...</Alert></>:<>
        {(this.state.newTicket) ? <><Alert variant="success">YOUR NUMBER IS : {this.state.newTicket}<Row className="justify-content-md-center "> Estimated waiting time: {Number(this.state.newTicketWaitingTime.toFixed(1))}</Row><Row className="justify-content-md-center "><Button variant="success" onClick={(ev)=>this.notNewTicket()}>OK</Button></Row></Alert></>
           : <> {this.state.serverErr ? <Alert variant="danger">Server error!</Alert> : <TicketPicker options={this.props.typesOfServices} newTicket={this.createTicket}/>}</>}</>}
        </Row>
        </Container>    
        </>);
    }
}

export default Home;
