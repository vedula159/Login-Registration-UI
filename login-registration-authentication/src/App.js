
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select';
import Profile from './auth/Profile';
import { useTranslation } from 'react-i18next';
import './custom.scss';

function App() {
  const { t, i18n } = useTranslation();
  const [userstate, setUserState] = useState({});
  console.log("check the app values ==>>", userstate)

  const changeLanguage = (selectedOption) => {
    const language = selectedOption.value;
    i18n.changeLanguage(language);
    window.location.reload();
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'it', label: "Italian" },
    { value: 'ru', label: "Russian" }
    // Add more language options as needed
  ];
  return (

    <div className="App">
      <header className='appHeader'>
        <span className='appHeaderText'>{t('appHeader.headerText')}</span>
        <div className='languageSelect'>
          <span>{t('appHeader.selectLanguage')}:</span>
          <Select
            options={languageOptions}
            defaultValue={languageOptions.find((option) => option.value === i18n.language)}
            onChange={changeLanguage} className='chooseLanguage'
          />
        </div>
      </header>
      <section>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                userstate && userstate.email && userstate.password ? (
                  <Profile
                    setUserState={setUserState}
                    username={userstate}
                  />
                ) : (
                  <Login setUserState={setUserState} />
                )
              }
            ></Route>
            <Route
              path="/login"
              element={<Login setUserState={setUserState} />}
            ></Route>
            <Route path="/signup" element={<Register />}></Route>
          </Routes>
        </Router>
      </section>
      <footer className='appFooter'>
        <div className='appFooterText'>&copy; {t('appHeader.copyRights')}</div>
      </footer>
    </div>
  );
}

export default App;
