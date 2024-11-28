import {css} from "@emotion/react";

export const middleContainer = css`
    display: flex;
`;

export const middleLeftContainer = css`
    position: relative;
    min-width: 250px;
    width: 250px;
    height: calc(100vh - 90px - 90px);
    background-color: #FAFAFA;
`;

export const middleRightContainer = css`
    flex: 1;
    font-size: 100px;
    padding: 30px 15px;
    overflow: hidden;
    overflow-y: scroll;
    height: calc(100vh - 90px - 90px);
`;

export const app = css`
    height: 100vh;
`;