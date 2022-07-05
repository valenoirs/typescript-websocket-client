import { useEffect, useState, useRef } from 'react';
import './App.css';
import config from './config/config'
import io from 'socket.io-client'
import axios from 'axios';

const socket = io(config.REACT_APP_SOCKET_URI)

const App = () => {
  const [username, setUsername] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [message, setMessage] = useState<Array<any>>([])
  const scrollRef = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   (async function getMessage() {
  //     const data = await axios.get('https://websocket.wuntu.my.id/api/v1/user/chat');
  //     setMessage(data.data.data.payload)
  //     // console.log(message)
  //   })();

  // }, [])

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
      // console.log('connected')
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
      // console.log('disconnected')
    })

    socket.on('message', (data) => {
      setMessage((message) => [...message, data])
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('message')
    }
  }, [message])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [message])

  const sendMessageHandler = async (event: any) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formDataObject = Object.fromEntries(formData.entries())

    // console.log(formDataObject)

    axios.post('https://websocket.wuntu.my.id/api/v1/user/chat', formDataObject)
    // .then(response => console.log(response))
    // .catch(error => console.error('send-message-error', error))

    event.target.message.value = ''
  }

  const setUsernameHandler = (event: any) => {
    event.preventDefault()
    if(event.target.username.value === 'Lucky' || event.target.username.value === 'lucky' || event.target.username.value === ''){
      alert('"Never gonna give you up, never gonna let you down" Kabal - -"')
      event.target.username.value = ''
    }
    else if(event.target.username.value === 'vvalenoirss'){
      setUsername('Lucky')
    }
    else{
      // console.log(event.target.username.value)
      setUsername(event.target.username.value)
    }

    (async function getMessage() {
      const data = await axios.get('https://websocket.wuntu.my.id/api/v1/user/chat');
      setMessage(data.data.data.payload)
      console.log(data.data.data.payload)
    })();
  }

  return (
    <div className="App">
      <main>
        <div className="container mx-auto">
          <div className="row">
              {!username ?
              <>
                <div className='row justify-center text-center'>
                  <p className='p-5'>
                    {/* <em>Real-time chat application using Socket.IO to establish a handshake through WebSocket Communication Protocol</em><br/> */}
                    Hola, thanks for visit, test akng neh<br/> Aplikasi <b>Hujat Saya</b>, say anything you want lol.
                    chill, no session, no cookie, no authentication, no authorization, ssl enabled, auto-delete message after 24h, E2E Encryption. complete deh, intinya, nd mo dpa tau nn spa wkwk.
                    Just enter random shit below and there you go. kritik, saran, ujaran kebencian, SARA, dll. dipersilahkan :)
                  </p>
                  <br/>
                  <form onSubmit={setUsernameHandler} className='input-group-sm text-center'>
                    <input className='input input-bordered max-w-xs' placeholder='Username...' type="text" name="username" required/>
                    <button className='btn' type='submit'>Enter</button>
                  </form>
                  <p className='mt-5'>Username 'Lucky' ilegal</p>
                </div>
              </>
              :
              <>
                <div id='chatroom' className="row h-[75vh] w-full overflow-auto overflow">
                  {message.map(({username, createdAt, message}, index: number) => 
                  <div key={index} ref={scrollRef}>
                    <div key={index} className='p-5 w-[full]'>
                      {username === 'Lucky' ?
                      <div className='flex'>
                        <ul className="menu bg-base-200 rounded-xl">
                          <li className="menu-title text-secondary">
                            <span>{username}</span>
                          </li>
                          <li><span><span className='text-xs'>{new Date(createdAt).toLocaleString('en', {hour: '2-digit', minute: '2-digit'})}:</span> {message}</span></li>
                        </ul>
                      </div>
                      :
                      <div className='flex flex-row-reverse'>
                        <ul className="menu bg-base-200 rounded-xl">
                          <li className="menu-title text-secondary">
                            <span>{username}</span>
                          </li>
                          <li><span><span className='text-xs'>{new Date(createdAt).toLocaleString('en', {hour: '2-digit', minute: '2-digit'})}:</span> {message}</span></li>
                        </ul>
                      </div>
                      }
                    </div>
                  </div>
                  )}
                </div>
                <div className='row p-5 text-end'>
                  <form onSubmit={sendMessageHandler} className='input-group-sm'>
                    <input type="hidden" name='username' value={username} />
                    <input className='input input-bordered w-[65%] max-w-xs' type="text" placeholder='Your message...' name="message" id="" required/>
                    <button className='btn' type='submit'>Send</button>
                  </form>
                </div>
                </>
              }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
