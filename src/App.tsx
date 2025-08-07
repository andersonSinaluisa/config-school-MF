import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import InversifyProvider from './components/InversifyProvider'

function App() {

  return (
    <InversifyProvider>
      <RouterProvider router={router} />

    </InversifyProvider>

  )
}

export default App
