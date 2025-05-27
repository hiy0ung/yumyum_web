import {css} from "@emotion/react";

export const wrap = css`
    display: flex;
`;

export const rightContainer = css`
    position: fixed;
    left: 250px;
    top :0;
    right: 0;
    bottom: 0;
    flex: 1;
    min-width: calc(1280px - 250px);
    height: 100vh;
    font-size: 16px;
    overflow-y: auto;
`;
