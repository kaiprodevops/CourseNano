import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'

// You can customize the theme later
// import theme from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider> {/* Add the provider here */}
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)