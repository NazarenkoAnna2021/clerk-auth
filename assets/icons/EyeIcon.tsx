import { scaleHorizontal } from "@/Utils";
import Svg, { Path } from "react-native-svg";
import React, { FC } from "react";

interface IProps {
    width?: number;
    height?: number;
    color?: string;
    isCrossed?: boolean;
};

export const EyeIcon: FC<IProps> = ({ width, height, color, isCrossed = false }) => (
    <Svg
        width={scaleHorizontal(width || 24)}
        height={scaleHorizontal(height || 24)}
        viewBox="0 0 24 24"
        fill="none"
    >
        {isCrossed
            ? <Path
                d="M10.733 5.076a10.744 10.744 0 0111.205 6.575 1 1 0 010 .696 10.747 10.747 0 01-1.444 2.49m-6.41-.679a3 3 0 01-4.242-4.242m7.637 7.583a10.75 10.75 0 01-15.417-5.151 1 1 0 010-.696 10.75 10.75 0 014.446-5.143M2 2l20 20"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            : <>
                <Path
                    d="M2.062 12.348a1 1 0 010-.696 10.75 10.75 0 0119.876 0 1 1 0 010 .696 10.75 10.75 0 01-19.876 0z"
                    stroke={color || "#000"}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                    stroke={color || "#000"}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </>
        }
    </Svg>
);
