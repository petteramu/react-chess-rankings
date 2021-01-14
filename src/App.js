import React from 'react'
import './App.scss'
import { Auth0Provider } from "@auth0/auth0-react"
import AppContent from "./components/AppContent"

function App() {
    return (
        <Auth0Provider
          domain="dev-nf6chill.eu.auth0.com"
          useRefreshTokens={true}
          audience="https://api.petteramu.com/sjakk"
          scope="read:current_user update:current_user_metadata add:game add:tournament add:user delete:game"
          clientId="cQExMny3hN3QYKvPpA2EZGqt8r6j1a5j"
          redirectUri={`https://petteramu.com${process.env.PUBLIC_URL}`}
        >
            <AppContent />
        </Auth0Provider>
    )
}
export default App
