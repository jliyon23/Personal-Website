import { useState } from 'react'

import VercelPortfolio from './VercelPortfolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <VercelPortfolio />
    </div>
  )
}

export default App
