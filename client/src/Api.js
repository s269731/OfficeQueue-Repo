const baseURL="/api";


async function getAllServices(){
    let url="/service_types";
    const response=await fetch(baseURL+url);
    const servicesJson=await response.json();
    if(response.ok){
        return servicesJson.map((a)=>{ return {"id":a.id,"name":a.name,"sign":a.sign}});
    }
    else{
        let err={status:response.status, errObj:servicesJson};
        throw err;
    }
}
async function requireNewTicket(id){
    let url="/tickets"
    const response= await fetch(baseURL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({serviceTypeId: id}),
    });
    const ticketJson=await response.json();
    if(response.ok){
        return (ticketJson)
    }
}
async function getCounters(){
    let url="/counters/";
    const response=await fetch(baseURL+url);
    const countersJson=await response.json();
    console.log(countersJson)
    if(response.ok){
        return countersJson.map((a)=>{ return {"id":a.id,"name":a.name}});
    }
    else{
        let err={status:response.status, errObj:countersJson};
        throw err;
    }
}
async function getLogs(counterId){
    let url="/counters/"+counterId.toString();
    console.log(url)
    const response=await fetch(baseURL+url);
    const logJson=await response.json();
    console.log(logJson)
    if(response.ok){
        return logJson
    }
    else{
        let err={status:response.status, errObj:logJson};
        throw err;
    }
}
async function getQueue(queueId){
    let url="/queue/"+queueId.toString();
    console.log(url)
    const response=await fetch(baseURL+url);
    const queueJson=await response.json();
    console.log(queueJson)
    if(response.ok){
        console.log(queueJson)
        return queueJson
    }
    else{
        let err={status:response.status, errObj:queueJson};
        throw err;
    }
}

async function getCurrentTicketId(id){
    let url="/counters/"+id;
    const response=await fetch(baseURL+url);
    const servicesJson=await response.json();
    if(response.ok){
        return servicesJson
    }
    else{
        let err={status:response.status, errObj:servicesJson};
        throw err;
    }
}

async function getNextTicketId(id){
    let url="/counters"
    const response= await fetch(baseURL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({counterId: id}),
    });
    const ticketJson=await response.json();
    if(response.ok){
        return (ticketJson)
    }
}

const API={getAllServices,requireNewTicket,getLogs,getCounters,getQueue, getCurrentTicketId, getNextTicketId};
export default API;