import { useContext } from "react"
import { Store } from "../Store"
import Clients from "../Components/Clients";
import Create from "../Components/Create";
import Stat from "../Components/Stat";


export default function Admin() {

    const { data, setEditData, setDeleteData, setCreateData, msg, adminPageData, file, removeFile, readFile } = useContext(Store);

    if (null === adminPageData){
        return (
            <h2>Loading...</h2>
        )
    }

    return (

        <div className="container">

        <div className='row'>

          <div className='table-col col-8'>

            <Clients data={data} setCreateData={setCreateData} setEditData={setEditData} setDeleteData={setDeleteData} msg={msg} file={file}/>
          </div>
          <div className='col-4 p-4'>
            <Stat data={data}/>
            <Create setCreateData={setCreateData} msg={msg} file={file} removeFile={removeFile} readFile={readFile} />
          </div>
        </div>


        
      </div>
    )
}