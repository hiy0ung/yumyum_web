/** @jsxImportSource @emotion/react */
import React from 'react';
import Order from '../Order/Order'
import * as css from "./Style";

const Main = () => {
    return (
        <>
        <div css={css.order}>
            <Order />
        </div>
        </>
    );
};

export default Main;