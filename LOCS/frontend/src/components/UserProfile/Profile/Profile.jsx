import React from 'react';
import s from './Profile.module.scss';
import { Button } from '../../Button-bem/Button';

export const Profile = (props) => {
    const imgUrl = 'https://im0-tub-ru.yandex.net/i?id=bc7f9021eae00edbac26dc53c0e013c4&n=13';

    return (
        <div className={s.Profile}> 
            <div className={s.Profile__ContentWrapper}>
                <div className={s.ProfilePicture}>
                    <img className={s.Profile__Img} src={imgUrl} alt='' />
                </div>

                <div className={s.ProfileDescribtionTitles}>
                    <div className={s.ProfileDescribtionTitles__Item}>Никнейм:</div>
                    <div className={s.ProfileDescribtionTitles__Item}>Электронная почта:</div>
                    <div className={s.ProfileDescribtionTitles__Item}>Город:</div>
                </div>

                <div className={s.ProfileDescribtionItems}>
                    <div className={s.ProfileDescribtionItems__Item}>{props.nick}</div>
                    <div className={s.ProfileDescribtionItems__Item}>{props.mail}</div>
                    <div className={s.ProfileDescribtionItems__Item}>{props.city}</div>
                </div>
            </div>
            
            {props.route.userId === 'me' ?
                <div className={s.ProfileButton}>
                    <Button style={{
                        buttonText: 'Загрузить фото',
                        type: 'NotBorderRadius',
                        size: 'FullContainer'
                    }} />
                </div> : ''
            }
        </div>
    );
}