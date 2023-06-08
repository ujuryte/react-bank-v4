import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useMessage() {

    const [messages, setMessages] = useState([]);



    const msg = useCallback((text, type) => {
        const id = uuidv4();
        setMessages(m => [...m, { text, type, id }])
        setTimeout(() => {
          setMessages(m => m.filter(m => m.id !== id));
        }, 5000)
    }, [])

    const addServerMessage = useCallback(msg => {
      const id = uuidv4();
      setMessages(m => [...m, { text: msg[0], type: msg[1], id }]);
      setTimeout(() => {
        setMessages(m => m.filter(m => m.id !== id));
      }, 5000);
    }, []);

    return [messages, msg, addServerMessage]
}