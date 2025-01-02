import { colors } from '@/config/globalColors';
import styled from '@emotion/styled';

export const MainContainer = styled.div(({ isMobile = false }: { isMobile: boolean }) => ({
  display: 'flex',
  width: '100%',
  height: isMobile ? 94 : 111,
}));

// export const FixedContainer = styled.div(({ isMobile = false }: { isMobile: boolean }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   width: '100%',
//   height: isMobile ? 94 : 111,
//   position: 'fixed',
//   zIndex: 1e8,
// }));
// export const TopHeader = styled.div(({ isMobile = false }: { isMobile: boolean }) => ({
//   display: 'flex',
//   width: '100%',
//   height: isMobile ? 34 : 36,
//   backgroundColor: colors.LB_E2FF00,
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 1e8,
//   cursor: 'pointer',
// }));
// export const BottomHeader = styled.div(({ isMobile = false }: { isMobile: boolean }) => ({
//   display: 'flex',
//   width: '100%',
//   height: isMobile ? 60 : 75,
//   backgroundColor: '#000000',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));
// export const ContentsContainer = styled.div({
//   display: 'flex',
//   flex: 1,
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   maxWidth: 1080,
// });
// export const RowBox = styled.div({
//   display: 'flex',
//   alignItems: 'center',
// });

// export const DrawerSearchBoxContainer = styled.div({
//   width: '300px',
//   marginTop: '20px',
// });

// export const DrawerMenuContainer = styled.div({
//   marginTop: '50px',
//   width: '220px',
// });
