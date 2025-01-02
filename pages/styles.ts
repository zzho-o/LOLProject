import styled from '@emotion/styled';

export const MainContainer = styled.div({
  display: 'flex',
  flex: 1,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  width: '100%',
});

export const BodyContainer = styled.div({
  display: 'flex',
  maxWidth: '940px',
  position: 'relative',
});
export const ContentsLeftContainer = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});


export const ContentsRightContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxWidth: 240,
});
