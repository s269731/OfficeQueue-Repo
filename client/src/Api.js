const baseURL="/api";


async function getAllServices(){
    let url="/service_types";
    let i=0;
    const response=await fetch(baseURL+url);
    const servicesJson=await response.json();
    if(response.ok){
        return servicesJson.map((a)=>{i++;  return {"id":a.id,"name":a.name,"sign":a.sign}});
    }
    else{
        let err={status:response.status, errObj:servicesJson};
        throw err;
    }
}
const API={getAllServices};
export default API;