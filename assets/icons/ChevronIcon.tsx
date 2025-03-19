import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import { scaleHorizontal } from '@/Utils';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
    position?: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
}

const TRANSFORM_DEGREE = {
    UP: '90deg',
    RIGHT: '180deg',
    DOWN: '270deg',
    LEFT: '0deg',
}

export const ChevronIcon: FC<IProps> = ({ width, height, color, position = 'UP' }) => (
    <View style={{ transform: [{ rotate: TRANSFORM_DEGREE[position] }] }}>
         <Svg
      width={scaleHorizontal(width || 10)}
      height={scaleHorizontal(height || 18)}
      viewBox="0 0 10 18"
      fill="none"
    >
      <Path
        d="M9 17L1 9l8-8"
        stroke={color || "#fff"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    </View>
);