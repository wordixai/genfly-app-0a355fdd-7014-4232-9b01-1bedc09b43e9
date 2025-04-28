import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { LocaleProvider } from './contexts/LocaleContext'
import { CurrencyProvider } from './contexts/CurrencyContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocaleProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </LocaleProvider>
  </React.StrictMode>,
)