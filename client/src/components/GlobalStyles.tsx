import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    @font-face {
        font-family: "Montserrat";
        src: url("/fonts/Montserrat-VariableFont_wght.ttf")
    }

    // // CSS VARIABLES HERE
    // :root {
    //     --nav-color:
    //     --text-color:
    // }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html,
    body {
        font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
    }

`;

export default GlobalStyles;
