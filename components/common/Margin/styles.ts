import styled from '@emotion/styled';
import { IMargin } from './types';

export const SMargin = styled.div(({ H = 0, W = 0 }: IMargin) => ({
  display: 'flex',
  width: W,
  minWidth: W,
  height: H,
  minHeight: H,
}));
