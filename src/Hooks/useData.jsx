import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const url = 'http://localhost:3003/clients';

export default function useData() {

  const [data, setData] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [file, setFile] = useState(null);
  const uploadInput = useRef(null);


  const fileReader = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = _ => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const readFile = e => {
    uploadInput.current = e.target;
    fileReader(e.target.files[0])
      .then(f => setFile(f))
      .catch(_ => _);
  }

  const removeFile = _ => {
    if (null !== uploadInput.current) {
      uploadInput.current.value = null;
    }
    setFile(null)
  }

  useEffect(() => {
    axios.get(url)
      .then(res => {
        const clients = res.data && Array.isArray(res.data.result) ? res.data.result : [];
        setData(clients.map((c) => ({ ...c, pid: null })));
        
      })
  }, [lastUpdate]);


  useEffect(() => {
    if (null === createData) {
      return
    }
    const promiseID = uuidv4();

    setData(c => [...c, {
      ...createData,
      pid: promiseID,
      photo: file,
    }]);



    axios.post(url, { client: createData, promiseID, file })
      .then(res => {
        setData(c => c.map(c => c.pid === res.data.promiseID ? { ...c, pid: null, id: res.data.id } : { ...c }))
        setLastUpdate(Date.now())
        console.log("PID:", res.data)
      });
      
  }, [createData])

  useEffect(() => {
    if (null === editData) {
      return;
    }
    const promiseID = uuidv4();
    setData(c => c.map(c => c.id === editData.id ? { ...c, ...editData, pid: promiseID } : { ...c }))



    axios.put(url + '/' + editData.id, { client: editData, promiseID })
      .then(res => {
        setData(c => c.map(c => c.pid === res.data.promiseID ? { ...c, pid: null } : { ...c }))
        setLastUpdate(Date.now())
      });
  }, [editData]);

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    setData(c => c.filter(c => c.id !== deleteData.id))


    axios.delete(url + '/' + deleteData.id)
      .then(res => {
        setLastUpdate(Date.now())
      })
  }, [deleteData])

  return [data, setCreateData, setEditData, setDeleteData, lastUpdate, file, readFile, removeFile, setFile]
}