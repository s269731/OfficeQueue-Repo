import React from 'react'
import {Table,Container,Col,Row} from 'react-bootstrap';

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
let{logs}=props;
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
        </Container>);
}



export default MainBoard;