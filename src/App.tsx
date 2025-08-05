import './App.css'
import { Layout } from './Layout'

function App(children:React.ReactNode) {


  return (
    <>
      <div className='bg-amber-700'>
        <Layout children={children}/>
      </div>
    </>
  )
}

export default App
