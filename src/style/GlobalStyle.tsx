import { Global, css } from '@emotion/react'

const style = css`
	a{text-align:none;}
    li{list-style:none;}
    .hidden{
        margin:-1px;
        padding:0;
        width:1px;
        height:1px;
        position:absolute;
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);

    }
`
const GlobalStyle = () => <Global styles={style} />

export default GlobalStyle