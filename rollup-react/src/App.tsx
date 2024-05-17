import React, { FC, useState, lazy, Suspense } from 'react'
import './styles/app.scss'
import './App.css'
import image from '@/assets/11.png'
import Loading from '@/components/Loading'
const About = lazy(() => delay(import('@/components/About'), 2000))
const App: FC = () => {
  const [n, setN] = useState(0)
  const [show, setShow] = useState(false)
  console.log('App');
  
  return (
    <div className='app-containter'>
      <h2 className="title">hello1</h2>
      <img src={image} style={{width: '200px'}}/>
      <button className='btn' onClick={() => setN(n + 1)}>
        n: {n}
      </button>
      <button
        className='btn'
        onClick={() => {
          setShow(!show)
        }}
      >
        show about
      </button>
      {
        show && (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        )
      }
    </div>
  )
}

function delay(promise: any, time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  }).then(() => promise)
}
export default App
