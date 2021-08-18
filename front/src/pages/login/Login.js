import {useState} from "react";
import {FormInput} from "../../components/shared/form-input";
import {SubmitButton} from "../../components/shared/submit-button";
import axios from "axios";
import {Redirect} from "react-router-dom"

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const {access_token} = await axios.post("/users/login", {username, password})
            localStorage.setItem("token", access_token);
            setAuth(true)
        } catch (e) {
            if (e.response.status === 401)
                setError("Wrong username or password")
            else
                setError("Something went wrong")
        } finally {
            setLoading(false);
        }

    }
    if (auth)
        return <Redirect to="/"/>
    return (
        <div className="flex justify-center items-center px-2 py-2 h-screen">
            <div className="lg:w-2/5 w-full bg-white px-6 py-6 rounded shadow">
                <h1 className="text-gray-700 text-2xl tracking-wide">Welcome,</h1>
                <h3 className="text-gray-800 text-lg tracking-wide">Please login to your account!</h3>
                <form className="mt-4" method="post" action="" onSubmit={submit}>
                    <div className="mb-4 ">
                        <FormInput changed={setUsername} label="Username"/>
                    </div>
                    <div className="mb-4 ">
                        <FormInput changed={setPassword} label="Password" type="password"/>
                        {error ? <span className="text-red-500 text-sm">{error}</span> : ''}
                    </div>
                    <div className="mb-4 ">
                        <div className="flex justify-between items-center">
                            <SubmitButton text="Login" loading_text="Logging In..." loading={loading}/>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}