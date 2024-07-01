import { useState } from 'react'
import conf from './conf/conf.js';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log(conf.appwriteUrl);
  return (
    <>
      <h1>ReactBlog Website</h1>
    </>
  )
}

export default App
