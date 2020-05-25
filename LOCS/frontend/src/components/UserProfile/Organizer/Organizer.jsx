import React from 'react';
import s from './Organizer.module.scss';
import { Button } from '../../Button-bem/Button';
import { Redirect } from 'react-router-dom';

const Organizer = (props) => {
    const imgUrl = 'https://bit.ly/2AVRWfX';
    const name = 'CreateEvent Inc.';
    const link = 'https://www.ownsite.com';
    const description = 'Съешь ещё этих сладких французских булок, да выпей чаю. Съешь ещё этих сладких французских булок, да выпей чаю. Съешь ещё этих сладких французских булок, да выпей чаю.';

    return(
        <div className={s.Profile}>                                                                                                                                                                                                     
            <div className={s.Profile__ContentWrapper}>
                <div className={s.ProfilePicture}>
                    <img className={s.Profile__Img} src={imgUrl} alt='' />
                    <div className={s.Profile__Button}>
                        <Button style={{
                            buttonText: 'Загрузить Лого',
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
                        <div className={s.ProfileDescribtion__Title}>О нас:</div>
                        <div className={s.ProfileDescribtion__Text}>{description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const OrganizerWithSignUpRedirect = (props) => {
    const isOrg = false;

    return isOrg ? 
        <Organizer {...props} /> :
        <Redirect to='/UserProfile/me/Organizer/Registration' />
}