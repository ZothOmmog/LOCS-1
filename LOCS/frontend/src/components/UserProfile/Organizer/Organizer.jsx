import React from 'react';
import s from './Organizer.module.scss';
import { Button } from '../../Button-bem/Button';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';


const Organizer = (props) => {
    const imgUrl = 'https://bit.ly/2AVRWfX';
    const name = 'CreateEvent Inc.';
    const link = 'https://www.ownsite.com';
    const description = 'Мы делаем самые интересные, качественные и масштабные мероприятия.';

    return(
        <div className={s.Profile}>                                                                                                                                                                                                     
            <div className={s.Profile__ContentWrapper}>
                <div className={s.ProfilePicture}>
                    <img className={s.Profile__Img} src={imgUrl} alt='' />
                    <div className={s.Profile__Button}>
                        <Button style={{
                            buttonText: 'Отписаться',
                            type: 'NotBorderRadius',
                            size: 'FullContainer'
                        }} />
                    </div>
                </div>

                <div className={s.ProfileDescribtion}>
                    <div className={s.ProfileDescribtion__Item}>
                    <div className={s.ProfileDescribtion__Title}>Организация</div>
                        <div className={s.ProfileDescribtion__Text}>{name}</div>
                    </div>
                    <div className={s.ProfileDescribtion__Item}>
                        <div className={s.ProfileDescribtion__Title}>Наш сайт:</div>
                        <div className={s.ProfileDescribtion__Text}>
                            <a className={s.ProfileDescribtion__Link} href={link}>{link}</a>
                        </div>
                    </div>
                    <div className={s.ProfileDescribtion__Item + ' ' + s.ProfileDescribtion__Item_Block}>
                        <div className={s.ProfileDescribtion__Title}>Наши мероприятия:</div>
                        <div className={s.ProfileDescribtion__Text}>Dance Walking 2020, Stand-Up On Tour</div>
                    </div>
                    <div className={s.ProfileDescribtion__Item + ' ' + s.ProfileDescribtion__Item_Block}>
                        <div className={s.ProfileDescribtion__Title}>О нас:</div>
                        <div className={s.ProfileDescribtion__Text}>{description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const OrganizerWithSignUpRedirect = (props) => {
    //const [query, setQuery] = useState('React');

    const [isLoaging] = useState(false);
    //const [loadingError, setLoadingError] = useState(null);

    const [isOrg] = useState(true);
    //const [orgData, setOrgData] = useState(null);

    // useEffect(function setOrganizer() {
    //     const getMeOrg = async () => {
    //         const result = await organizerApi.getMeOrg();

    //         setIsLoading(false);

    //         if (!result.err) {
    //             setOrgData(result.value);
    //             setIsOrg(true);
    //         }
    //         else {
    //             if (result.err === 'do not have permissions') setIsOrg(false);
    //             else {
    //                 alert(result.err);
    //                 setLoadingError(result.err);
    //             }
    //         }
    //     }

    //     getMeOrg();
    // }, [query]);

    return isLoaging ? 'Загрузка...' : isOrg ? 
        <Organizer {...props} /> :
        <Redirect to='/UserProfile/me/Organizer/Registration' />
}