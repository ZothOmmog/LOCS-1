import React from 'react';
import s from "./Search.module.scss";
import { useLocation, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { Formik, Field, Form, useFormikContext } from 'formik';
import * as yup from 'yup';
import { Button } from '../Button-bem/Button';
import { useState } from 'react';
import { setQuery, searchThunk } from '../../redux';
import { connect } from 'react-redux';

const ResetIfChangeLocation = ({ location }) => {
    const { resetForm } = useFormikContext();

    useEffect(function CleanIfChangeLocation() {
        resetForm('');
    }, [location, resetForm]);

    return null;
}

const Search = ({ setQuery, searchThunk }) => {
    let location = useLocation();
    const [isSearch, setIsSearch] = useState(false);
    
    useEffect(() => {
        if(location.pathname !== '/Search') setIsSearch(false);
    }, [location]);

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{ query: '' }}

                validationSchema={yup.object({
                    query: yup.string()
                        .required()
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setQuery(values.query);
                    setIsSearch(true);
                    searchThunk(4, 1);
                    setSubmitting(false);
                }}
            >
                <Form className={s.Search}>
                    <Field className={s.Search__Input} name='query' placeholder='События, организаторы...' />
                    <div className={s.Search__Submit}>
                        <Button
                            style={{
                                type: 'Search',
                                size: 'FullContainer'
                            }}
                            typeButton='submit'
                        />
                    </div>
                    {!isSearch ? (
                        <ResetIfChangeLocation location={location} />
                    ): null}
                </Form>
            </Formik>
            {isSearch ? (
                <Redirect to='/Search' />
            ) : null}
        </>
    );
}

export const SearchWithSetQueryCallback = connect(null, { setQuery, searchThunk })(Search);