import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/authSlice';
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",
    });
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
        if (!values.fname) {
            error.fname = t('registration.fnameRequired');
        }
        if (!values.lname) {
            error.lname = t('registration.lnameRequired');
        }
        if (!values.email) {
            error.email = t('registration.emailRequired');
        } else if (!regex.test(values.email)) {
            error.email = t('registration.invalidEmail')
        }
        if (!values.password) {
            error.password = t('registration.passwordRequired')
        } else if (!passwordPattern.test(values.password)) {
            error.password = t('registration.invalidPassword')
        }
        if (!values.cpassword) {
            error.cpassword = t('registration.cpasswordRequired')
        } else if (values.cpassword !== values.password) {
            error.cpassword = t('registration.passwordMatch')
        } else if (!passwordPattern.test(values.cpassword)) {
            error.password = t('registration.invalidCpassword')
        }
        return error;
    };

    const signupHandler = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(user));
        setIsSubmit(true);
    };
    
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(user);
            dispatch(signUpUser(user)).then(response => {
                console.log("check the response ==>>", response)
                if (response.payload.message === "User already exists") {
                    setErrorMessage(t('registration.userExists'));
                } else {
                    toast.success(t('registration.registrationSuccess'));
                    navigate("/login", { replace: true });
                }

            }).catch((error) => {
                console.log("error is ==>>", error);
            })
        }
    }, [dispatch, formErrors, isSubmit, navigate, t, user]);

    return (
        <>
            <div className='registration'>
                <form>
                    <h1>{t('registration.createAccount')}</h1>
                    {errorMessage && <p className='errorMesage'>{errorMessage}</p>}
                    <div>
                        <label htmlFor=''>{t('registration.firstName')}<span className='requiedClass'>*</span></label>
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            placeholder={t('registration.firstName')}
                            onChange={changeHandler}
                            value={user.fname}
                        />
                        <p className='errorMesage'>{formErrors.fname}</p>
                    </div>
                    <div>
                        <label htmlFor=''>{t('registration.lastName')}<span className='requiedClass'>*</span></label>
                        <input
                            type="text"
                            name="lname"
                            id="lname"
                            placeholder={t('registration.lastName')}
                            onChange={changeHandler}
                            value={user.lname}
                        />
                        <p className='errorMesage'>{formErrors.lname}</p>
                    </div>
                    <div>
                        <label htmlFor=''>{t('registration.regEmail')}<span className='requiedClass'>*</span></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder={t('registration.regEmail')}
                            onChange={changeHandler}
                            value={user.email}
                        />
                        <p className='errorMesage'>{formErrors.email}</p>
                    </div>
                    <div>
                        <label htmlFor=''>{t('registration.regPassword')}<span className='requiedClass'>*</span></label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder={t('registration.regPassword')}
                            onChange={changeHandler}
                            value={user.password}
                        />
                        <p className='errorMesage'>{formErrors.password}</p>
                    </div>
                    <div>
                        <label htmlFor=''>{t('registration.confirmPassword')}<span className='requiedClass'>*</span></label>
                        <input
                            type="password"
                            name="cpassword"
                            id="cpassword"
                            placeholder={t('registration.confirmPassword')}
                            onChange={changeHandler}
                            value={user.cpassword}
                        />
                        <p className='errorMesage'>{formErrors.cpassword}</p>
                    </div>
                    <button onClick={signupHandler}>
                        {t('registration.title')}
                    </button>
                </form>
                <div className='addressLabel'>{t('registration.alreadyRegisterd')} <NavLink to="/login" className="navigationLink">{t('registration.reLogin')}</NavLink></div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Register