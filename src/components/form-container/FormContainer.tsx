import React, { Fragment } from 'react';
import Card from '@mui/material/Card';

import styles from './FormContainer.module.scss';
import Form from '../form/Form';

import GitHubIcon from '@mui/icons-material/GitHub';

const FormContainer = () => {

    return(
        <Fragment>
          <h1 >Start writing a Note!</h1>
            <Card variant='outlined' className={styles.form__wrapper} sx={{height: '35em'}}>
                <Form/>
            </Card>
            <div style={{marginTop: '50px'}}>
                <p className={styles['github-title']}>See all my projects in my Github.</p>
                <a href="https://github.com/Marcos-Iorio" target="_blank"><GitHubIcon/></a>
            </div>
        </Fragment>
    );
};

export default FormContainer;