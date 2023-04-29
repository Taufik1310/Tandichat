import React from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

const FIRST_LOGO = './assets/logo1.png'
const SECOND_LOGO = './assets/logo2.png'

const Login = () => {

    return (
        <HelmetProvider >
            <Helmet defer={false}>
                <link rel="icon" href={`${SECOND_LOGO}`} />
                <title >Tandichat Web</title>
            </Helmet>
            <img src={FIRST_LOGO} alt="manafotonya" />
        </HelmetProvider>
    )
}

export default Login