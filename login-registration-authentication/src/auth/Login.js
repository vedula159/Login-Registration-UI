import React, { useState, useEffect } from 'react';
import { signInUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const Login = ({ setUserState }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...user,
            [name]: value,
        });
    };

    const validateForm = (values) => {
        const error = {};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
        if (!values.email) {
            error.email = t('login.emailRequired')
        } else if (!regex.test(values.email)) {
            error.email = t('login.invalidEmail')
        }
        if (!values.password) {
            error.password = t('login.passwordRequired')
        } else if (!passwordPattern.test(values.password)) {
            error.password = t('login.invalidPassword')
        }
        return error;
    };

    const loginHandler = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(user));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(signInUser(user)).then(response => {
                if (response.payload.message === "User not found") {
                    setErrorMessage(t('login.userNotFound'));
                } else if (response.payload.message === "Login successful") {
                    setUserState(user);
                    toast.success(t('login.loginSuccess'));
                    navigate("/", { replace: true });
                }
            }).catch((error) => {
                toast.warning(t('login.loginFailure'));
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formErrors]);
    return (
        <div className='login'>
            <form autocomplete="off">
                <h1>{t('login.title')}</h1>
                {errorMessage && <p className='errorMesage'>{errorMessage}</p>}
                <div>
                    <label htmlFor=''>{t('login.email')}<span className='requiedClass'>*</span></label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={t('login.email')}
                        onChange={changeHandler}
                        value={user.email}
                    />
                    <p className='errorMesage'>{formErrors.email}</p>
                </div>
                <div>
                    <label htmlFor=''>{t('login.password')}<span className='requiedClass'>*</span></label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder={t('login.password')}
                        onChange={changeHandler}
                        value={user.password}
                    />
                    <p className='errorMesage'>{formErrors.password}</p>
                </div>
                <button onClick={loginHandler}>
                    {t('login.title')}
                </button>
            </form>
            <div className='addressLabel'>{t('login.notRegisterd')} <NavLink to="/signup" className="navigationLink">{t('login.registerHere')}</NavLink></div>
            <ToastContainer />
        </div>
    );
}

export default Login