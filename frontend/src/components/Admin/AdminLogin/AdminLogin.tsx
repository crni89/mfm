import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import AppStore from '../../../stores/AppStore';
import 'bootstrap/dist/css/bootstrap.css';
import './AdminLogin.scss';
import logo from '../../../template/LOGO - FINALNO RESENJE 240710-1.png';
import { MDBInput } from 'mdb-react-ui-kit';

export default function AdminLogin() {

    const [ username, setUsername ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ error, setError ] = useState<string>("");

    const navigate = useNavigate();

    const doLogin = () => {
        api("post", "/api/auth/administrator/login", "administrator", { username, password })
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not log in. Reason: " + JSON.stringify(res.data));
            }

            return res.data;
        })
        .then(data => {
            AppStore.dispatch( { type: "auth.update", key: "authToken", value: data?.authToken } );
            AppStore.dispatch( { type: "auth.update", key: "refreshToken", value: data?.refreshToken } );
            AppStore.dispatch( { type: "auth.update", key: "identity", value: username } );
            AppStore.dispatch( { type: "auth.update", key: "id", value: +(data?.id) } );
            AppStore.dispatch( { type: "auth.update", key: "role", value: "administrator" } );

            navigate("/admin/dashboard", {
                replace: true,
            });
        })
        .catch(error => {
            setError(error?.message ?? "Could not log in!");

            setTimeout(() => {
                setError("");
            }, 3500);
        });
    };
    
  return (
    <motion.div
            initial={{
                position: "relative",
                top: 20,
                scale: 0.95,
                opacity: 0,
            }}
            animate={{
                top: 0,
                scale: 1,
                opacity: 1,
            }}
            transition={{
                delay: 0.125,
                duration: 0.75,
            }}>
            {/* <div className="col col-xs-12 col-md-6 offset-md-3">
                <h1 className="h5 mb-3">Log into your account</h1>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Enter your username" value={ username }
                               onChange={ e => setUsername(e.target.value) } />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="password" placeholder="Enter your password" value={ password }
                               onChange={ e => setPassword(e.target.value) }/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <button className="btn btn-primary px-5" onClick={ () => doLogin() }>
                        Log in
                    </button>
                </div>

                { error && <p className="alert alert-danger">{ error }</p> }
            </div> */}
            <div className="Auth-form-container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                    <img src={logo} alt="Mfm" className='Auth-form-img' />
                    <h3 className="Auth-form-title">Prijava</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="Enter username"
                        value={ username }
                        onChange={ e => setUsername(e.target.value) }
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        value={ password }
                        onChange={ e => setPassword(e.target.value) }
                        />
                    </div>
                    <div className="d-grid gap-2 mt-4 mb-3">
                        <button 
                        className="btn btn-primary"
                        onClick={ () => doLogin() }
                        >
                        Prijavi se
                        </button>
                    </div>
                    </div>
                </div>
            </div>
    </motion.div>
  )
}
