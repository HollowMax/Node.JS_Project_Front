import styled from 'styled-components';

export const EmptyPlugWrapper = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  @media screen and (min-width: 768px) {
    gap: 32px;
  }
`;

export const EmptyPlugText = styled.p`
  font-family: ${p => p.theme.fonts.main};
  font-weight: ${p => p.theme.fontWeights[1]};
  letter-spacing: ${p => p.theme.letterSpacings.content};
  line-height: ${p => p.theme.lineHeights.subheader};
  font-size: 14px;
  text-align: center;
  font-feature-settings: 'liga' off;
  color: ${p => p.theme.colors.mainBlack};
  opacity: 0.5;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

export const EmptyPlugImgWrapper = styled.div`
  width: 208px;
  height: 133px;
  margin: 0 auto;
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    width: 350px;
    height: 225px;
    margin-bottom: 32px;
  }
`;
