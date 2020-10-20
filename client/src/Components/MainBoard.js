import React from 'react'
import {Table,Container,Col,Row,Alert} from 'react-bootstrap';

//funzione per renderizzare riga della tabella
const RowItem=(props)=>{
    let {log}=props;
   return(
        <tr>
            <td>{log.counterName}</td>
            <td>{log.currentTicketNumber}</td>
        </tr>);
      
}

//funzione per renderizzare la tabella delle auto
const MainBoard=(props)=>{
let{logs,queues}=props;
    return(<Container fluid>
        
        <Row className="justify-content-md-center ">
        <Col sm={5}>    
                <Table striped bordered hover  size="sm"  >
                    <thead className="tableHeader">
                        <tr>
                        <th>COUNTER</th>
                        <th>TICKET</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => <RowItem  key = {log.counterId} log={log} />)}
                    </tbody>
               </Table>
        </Col>
        </Row>
        <Row className="justify-content-md-center ">
            {queues.map((q)=>{return <><Col sm={2}><Alert key={q.serviceName} variant="info">{q.serviceName}: {q.length} people in line</Alert></Col></>})}
        </Row>
       
        </Container>);
}



export default MainBoard;