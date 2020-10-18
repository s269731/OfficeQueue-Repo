import React from 'react'
import {Table,Container,Col,Row} from 'react-bootstrap';

//funzione per renderizzare riga della tabella
const RowItem=(props)=>{
    let {log}=props;
   return(
        <tr>
            <td>{log.number}</td>
            <td>{log.counter}</td>
        </tr>);
      
}

//funzione per renderizzare la tabella delle auto
const MainBoard=(props)=>{
let{logs}=props;
    return(<Container fluid>
        <Row className="justify-content-md-center ">
        <Col sm={5}>    
                <Table striped borderless hover size="sm" >
                    <thead className="tableHeader">
                        <tr>
                        <th>TICKET</th>
                        <th>COUNTER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => <RowItem  key = {log.number} log={log} />)}
                    </tbody>
               </Table>
        </Col>
        </Row>
        </Container>);
}



export default MainBoard;