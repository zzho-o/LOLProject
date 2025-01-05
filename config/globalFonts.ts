// import { colors } from '@/config/globalColors';
// import styled from '@emotion/styled';
// type ITypo = {
//   color?: string;
//   underline?: 'true' | 'false' | 'config';
//   textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
//   style?: object;
// }

// const BasicNotoSans = styled.span(({ color = colors.BLACK, underline = 'false', textAlign = 'left', style }: ITypo) => ({
//   textDecorationLine: underline === 'true' ? 'underline' : 'none',
//   letterSpacing: 0,
//   color,
//   textAlign,
//   whiteSpace: 'pre-wrap',
//   cursor: 'inherit',
//   display: 'flex',
//   ...style,
// }));
// const BasicRoboto = styled.span(({ color = colors.BLACK, underline = 'false', textAlign = 'left', style }: ITypo) => ({
//   textDecorationLine: underline === 'true' ? 'underline' : 'none',
//   letterSpacing: 0,
//   color,
//   textAlign,
//   whiteSpace: 'pre-wrap',
//   cursor: 'inherit',
//   display: 'flex',
//   ...style,
// }));
// export const WEIGHT = {
//   BOLD: {
//     fontWeight: 700,
//   },
//   MEDIUM: {
//     fontWeight: 500,
//   },
//   REGULAR: {
//     fontWeight: 400,
//   },
//   THIN: {
//     fontWeight: 300,
//   },
// };
// export const SIZE = {
//   35: {
//     fontSize: '35px',
//     lineHeight: '39px',
//   },
//   30: {
//     fontSize: '30px',
//     lineHeight: '34px',
//   },
//   28: {
//     fontSize: '28px',
//     lineHeight: '32px',
//   },
//   24: {
//     fontSize: '24px',
//     lineHeight: 'normal',
//   },
//   22: {
//     fontSize: '22px',
//     lineHeight: '26px',
//   },
//   20: {
//     fontSize: '20px',
//     lineHeight: '24px',
//   },
//   18: {
//     fontSize: '18px',
//     lineHeight: '22px',
//   },
//   16: {
//     fontSize: '16px',
//     lineHeight: '20px',
//   },
//   15: {
//     fontSize: '15px',
//     lineHeight: 'auto',
//   },
//   14: {
//     fontSize: '14px',
//     lineHeight: '18px',
//   },
//   12: {
//     fontSize: '12px',
//     lineHeight: '16px',
//   },
//   10: {
//     fontSize: '10px',
//     lineHeight: '14px',
//   },
// };
// export const Noto = {
//   /** BOLD */
//   BOLD_35: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[35],
//   }),
//   BOLD_30: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[30],
//   }),
//   BOLD_28: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[28],
//   }),
//   BOLD_24: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[24],
//   }),
//   BOLD_22: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[22],
//   }),
//   BOLD_20: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[20],
//   }),
//   BOLD_18: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[18],
//   }),
//   BOLD_16: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[16],
//   }),
//   BOLD_15: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[15],
//   }),
//   BOLD_14: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[14],
//   }),
//   BOLD_12: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[12],
//   }),
//   BOLD_10: styled(BasicNotoSans)({
//     ...WEIGHT.BOLD,
//     ...SIZE[10],
//   }),
//   /** MEDIUM */
//   MEDIUM_35: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[35],
//   }),
//   MEDIUM_30: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[30],
//   }),
//   MEDIUM_28: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[28],
//   }),
//   MEDIUM_24: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[24],
//   }),
//   MEDIUM_22: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[22],
//   }),
//   MEDIUM_20: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[20],
//   }),
//   MEDIUM_18: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[18],
//   }),
//   MEDIUM_16: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[16],
//   }),
//   MEDIUM_15: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[15],
//   }),
//   MEDIUM_14: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[14],
//   }),
//   MEDIUM_12: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[12],
//   }),
//   MEDIUM_10: styled(BasicNotoSans)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[10],
//   }),
//   /** REGULAR */
//   REGULAR_35: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[35],
//   }),
//   REGULAR_30: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[30],
//   }),
//   REGULAR_24: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[24],
//   }),
//   REGULAR_22: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[22],
//   }),
//   REGULAR_20: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[20],
//   }),
//   REGULAR_18: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[18],
//   }),
//   REGULAR_16: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[16],
//   }),
//   REGULAR_15: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[15],
//   }),
//   REGULAR_14: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[14],
//   }),
//   REGULAR_12: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[12],
//   }),
//   REGULAR_10: styled(BasicNotoSans)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[10],
//   }),
//   /** THIN */
//   THIN_35: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[35],
//   }),
//   THIN_30: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[30],
//   }),
//   THIN_24: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[24],
//   }),
//   THIN_22: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[22],
//   }),
//   THIN_20: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[20],
//   }),
//   THIN_18: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[18],
//   }),
//   THIN_16: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[16],
//   }),
//   THIN_15: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[15],
//   }),
//   THIN_14: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[14],
//   }),
//   THIN_12: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[12],
//   }),
//   THIN_10: styled(BasicNotoSans)({
//     ...WEIGHT.THIN,
//     ...SIZE[10],
//   }),
// };

// export const Roboto = {
//   /** BOLD */
//   BOLD_35: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[35],
//   }),
//   BOLD_30: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[30],
//   }),
//   BOLD_24: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[24],
//   }),
//   BOLD_22: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[22],
//   }),
//   BOLD_20: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[20],
//   }),
//   BOLD_18: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[18],
//   }),
//   BOLD_16: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[16],
//   }),
//   BOLD_15: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[15],
//   }),
//   BOLD_14: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[14],
//   }),
//   BOLD_12: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[12],
//   }),
//   BOLD_10: styled(BasicRoboto)({
//     ...WEIGHT.BOLD,
//     ...SIZE[10],
//   }),
//   /** MEDIUM */
//   MEDIUM_35: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[35],
//   }),
//   MEDIUM_30: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[30],
//   }),
//   MEDIUM_24: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[24],
//   }),
//   MEDIUM_22: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[22],
//   }),
//   MEDIUM_20: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[20],
//   }),
//   MEDIUM_18: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[18],
//   }),
//   MEDIUM_16: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[16],
//   }),
//   MEDIUM_15: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[15],
//   }),
//   MEDIUM_14: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[14],
//   }),
//   MEDIUM_12: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[12],
//   }),
//   MEDIUM_10: styled(BasicRoboto)({
//     ...WEIGHT.MEDIUM,
//     ...SIZE[10],
//   }),
//   /** REGULAR */
//   REGULAR_35: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[35],
//   }),
//   REGULAR_30: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[30],
//   }),
//   REGULAR_24: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[24],
//   }),
//   REGULAR_22: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[22],
//   }),
//   REGULAR_20: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[20],
//   }),
//   REGULAR_18: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[18],
//   }),
//   REGULAR_16: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[16],
//   }),
//   REGULAR_15: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[15],
//   }),
//   REGULAR_14: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[14],
//   }),
//   REGULAR_12: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[12],
//   }),
//   REGULAR_10: styled(BasicRoboto)({
//     ...WEIGHT.REGULAR,
//     ...SIZE[10],
//   }),
//   /** THIN */
//   THIN_35: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[35],
//   }),
//   THIN_30: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[30],
//   }),
//   THIN_24: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[24],
//   }),
//   THIN_22: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[22],
//   }),
//   THIN_20: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[20],
//   }),
//   THIN_18: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[18],
//   }),
//   THIN_16: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[16],
//   }),
//   THIN_15: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[15],
//   }),
//   THIN_14: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[14],
//   }),
//   THIN_12: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[12],
//   }),
//   THIN_10: styled(BasicRoboto)({
//     ...WEIGHT.THIN,
//     ...SIZE[10],
//   }),
// };
