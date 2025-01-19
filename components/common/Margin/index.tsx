import React from 'react';
import * as S from './styles';
import { IMargin } from './types';

const Margin = ({ H = 0, W = 0 }: IMargin) => {
  return <S.SMargin H={H} W={W}></S.SMargin>;
};

export default Margin;
