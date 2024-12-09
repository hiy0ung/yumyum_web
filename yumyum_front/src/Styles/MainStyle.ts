import {css} from "@emotion/react";

export const middleContainer = css`
    display: flex;
`;

export const middleLeftContainer = css`
    position: relative;
    min-width: 250px;
    height: calc(100vh - 90px - 90px);
`;

export const middleRightContainer = css`
    position: fixed;
    left: 250px;
    right: 0;
    min-width: calc(1280px - 250px);
    flex: 1;
    font-size: 100px;
    padding: 30px 15px;
    overflow-y: auto;
    height: calc(100vh - 90px - 90px);
    z-index: 100;
`;