import { useState } from "react"
import { useCookies } from "react-cookie"

const Auth = () => {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    const viewLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSumbit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogIn && password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/api/user/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (data.detail){
            setError(data.detail)
        } else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)
            window.location.reload()
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">

                <form >
                    <h2>{isLogIn ? 'LOG IN' : 'SING UP'}</h2>
                    <input
                        required
                        type="email" 
                        placeholder="email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        required
                        type="password" 
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    { !isLogIn && <input 
                                    required
                                    type="password" 
                                    placeholder="confirm password" 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                    /> }
                    <input 
                        type="submit" 
                        className="create" 
                        onClick={(e) => handleSumbit(e, isLogIn ? 'login' : 'singup')} 
                    />
                    {error && <p>{error}</p>}
                </form>

                <div className="auth-options">
                    <button onClick={() => viewLogin(false)} style={{ backgroundColor: isLogIn ? 'rgb(255 255 255)' : 'rgb(188 188 188)' }}>Sing Up</button>
                    <button onClick={() => viewLogin(true)} style={{ backgroundColor: !isLogIn ? 'rgb(255 255 255)' : 'rgb(188 188 188)' }}>Login</button>
                </div>

            </div>
        </div>
    )
}

export default Auth
