import React, { useEffect } from 'react';
import s from './Organizer.module.scss';
import { Button } from '../../Button-bem/Button';
import { Redirect, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { organizerApi } from '../../../api/indexApi';


export const Organizer = ({logoLink, name, orgLink, info, id, myId}) => {
    const logoLinkBase = 'https://bit.ly/2AVRWfX';
    const [orgEvents, setOrgEvents] = useState(false);
    const [orgId] = useState(id);
    const [status, setStatus] = useState(false);
    
    
    useEffect(() => {
        const getOrgEvents = async () => {
            const orgEventsFromServer = await organizerApi.getOrgEvents(orgId);

            setOrgEvents(orgEventsFromServer.map(event => (
                <NavLink className={s.OrgEvent} to={`/EventProfile/${event.eventorglist.id}`}>{event.eventorglist.name + ', '}</NavLink>
            )));
        }
        if (id !== 'me') getOrgEvents();
    }, [orgId]);

    useEffect(function getStatus() {
        const getStatusFromServer = async () => {
            const subscribersOrg = await organizerApi.subscribers(orgId);

            setStatus(subscribersOrg
                .map(subscriber => subscriber.subscribers.id_user)
                .includes(myId)
            );
        }
        if (id !== 'me') getStatusFromServer();
    });
    

    return(
        <div className={s.Profile}>                                                                                                                                                                                                     
            <div className={s.Profile__ContentWrapper}>
                <div className={s.ProfilePicture}>
                    <img className={s.Profile__Img} src={logoLink && logoLink !== '1' || logoLinkBase} alt='' />
                    <div className={s.Profile__Button}>
                    {id === 'me' ? (
                        <Button style={{
                            buttonText: 'Загрузить лого',
                            type: 'NotBorderRadius',
                            size: 'FullContainer'
                        }} />
                    ) : +orgId !== +myId ? (
                        <Button style={{
                            buttonText: !status ? 'Подписаться' : 'Отписаться',
                            type: 'NotBorderRadius',
                            size: 'FullContainer',
                            onClickHandler: () => {                              
                                if(!status) {
                                    organizerApi.subscribe(orgId);
                                    setStatus(true);
                                }
                                else {
                                    organizerApi.unSubscribe(orgId);
                                    setStatus(false);
                                }
                            }
                        }}

                        />
                    ) : 'Это ваш аккаунт'}
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
                            <a className={s.ProfileDescribtion__Link} href={orgLink}>{orgLink}</a>
                        </div>
                    </div>
                    {id !== 'me' ? (
                        <div className={s.ProfileDescribtion__Item + ' ' + s.ProfileDescribtion__Item_Block}>
                            <div className={s.ProfileDescribtion__Title}>Наши мероприятия:</div>
                            <div className={s.ProfileDescribtion__Text}>{orgEvents}</div>
                        </div>
                    ) : null}
                    <div className={s.ProfileDescribtion__Item + ' ' + s.ProfileDescribtion__Item_Block}>
                        <div className={s.ProfileDescribtion__Title}>О нас:</div>
                        <div className={s.ProfileDescribtion__Text}>{info}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const OrganizerWithSignUpRedirect = ({ userId }) => {
    const [isLoaging, setIsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    const [isOrg, setIsOrg] = useState(false);
    const [orgData, setOrgData] = useState(null);

    useEffect(function setOrganizer() {
        const getMeOrg = async () => {
            const result = await organizerApi.getMeOrg();

            if (!result.err) {
                setOrgData({
                    name: result.data.organizerdata.organization_name,
                    info: result.data.organizerdata.info,
                    logoLink: result.data.organizerdata.logo,
                    orgLink: result.data.organizerdata.organization_link,
                });
                setIsOrg(true);
            }
            else {
                if (result.err === 'do not have permissions') setIsOrg(false);
                else {
                    alert(result.err);
                    setLoadingError(result.err);
                }
            }

            setIsLoading(false);
        }

        getMeOrg();
    }, []);

    return isLoaging ? 'Загрузка...' : loadingError ? (
        <div>{loadingError}</div>
    ) : isOrg ? (
        <Organizer {...orgData} id={userId} />
    ) : <Redirect to='/UserProfile/me/Organizer/Registration' />
}

export const OrganizerOuther = ({ userId }) => {
    const [isLoaging, setIsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    const [orgData, setOrgData] = useState(null);
    const [myId, setMyId] = useState(null);

    useEffect(function setOrganizer() {
        const getOrg = async () => {
            const result = await organizerApi.getOrg(userId);
            setOrgData({
                name: result.data.organizerdata.organization_name,
                info: result.data.organizerdata.info,
                logoLink: result.data.organizerdata.logo,
                orgLink: result.data.organizerdata.organization_link,
                status: result.Status
            });
            
            setIsLoading(false);
        }
        getOrg();
    }, []);

    useEffect(function initialSetMyId() {
        const getMeOrg = async () => {
            const result = await organizerApi.getMeOrg();
            if (!result.err) {
                setMyId(result.data.organizerdata.id_user);
            }

            setIsLoading(false);
        }

        getMeOrg();
    }, []);

    return isLoaging ? 'Загрузка...' : loadingError ? (
        <div>{loadingError}</div>
    ) : <Organizer {...orgData} id={userId} myId={myId} />
}