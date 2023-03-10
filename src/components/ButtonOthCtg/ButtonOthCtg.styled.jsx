import styled from "styled-components";
import { theme } from "utils/theme";

export const ButtonOthCtg = styled.a`
font-family: ${theme.fonts.main};
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 21px;
text-align: center;
border-radius: 20px 40px;
color: ${theme.colors.btnHoverBg};
padding: 14px 32px;
border: ${theme.borders.btnHover};
transition: ${theme.transitions.main};
&:hover {
    border: 2px solid ${theme.colors.mainAccent};
}
@media (min-width: 768px) {
        padding: 20px 52px;
        font-size: 16px;
        line-height: 24px;
        }

    @media (min-width: 1440px) {
        padding: 20px 52px;
        font-size: 16px;
        line-height: 24px;
    }
`

export const ButtonOthCtgWrap = styled.div`
margin: 40px 74px 100px;

@media (min-width: 768px) {
        margin: 40px 232px 100px;
        }

    @media (min-width: 1440px) {
        margin: 14px 500px 118px;
    }


`