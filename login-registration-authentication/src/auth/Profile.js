/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { currentUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Profile = ({ setUserState, username }) => {
    const dispatch = useDispatch();
    const [userList, setData] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(currentUser({ email: username.email })).then((result) => {
            const checkUserDetails = result.payload.userDetails;
            setData(checkUserDetails);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="profile">
            <h1>{t('profile.title')} {userList.fname} {userList.lname} !!</h1>
            <h4>{t('profile.userDetail')}</h4>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className='col1'>{t('profile.tableHeader1')}</th>
                            <th className='col2'>{t('profile.tableHeader2')}</th>
                            <th className='col3'>{t('profile.tableHeader3')}</th>
                            <th className='col4'>{t('profile.tableHeader4')}</th>
                            <th className='col5'>{t('profile.tableHeader5')}</th>
                            <th className='col6'>{t('profile.tableHeader6')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='col1'>{userList.fname}</td>
                            <td className='col2'>{userList.lname}</td>
                            <td className='col3'>{userList.email}</td>
                            <td className='col4'>{userList.password }</td>
                            <td className='col5'>{userList.cpassword}</td>
                            <td className='col6'>
                                <button className='logoutBtn' onClick={() => setUserState({})}>
                                {t('profile.button')}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};
export default Profile;
