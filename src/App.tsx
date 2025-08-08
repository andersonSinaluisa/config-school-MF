import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import InversifyProvider from './components/InversifyProvider'
import { Toaster } from './components/ui/toaster'
function App() {

  return (
    <InversifyProvider>
      <RouterProvider router={router} />
      <Toaster />

    </InversifyProvider>

  )
}

export default App
