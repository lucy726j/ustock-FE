import React from "react";

export const formatPrice = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatChangeRate = (changeRate: number): string => {
    const formattedRate = `${Math.abs(changeRate).toFixed(2)}%`; // 소수점 2자리까지 표시
    if (changeRate > 0) {
        return `▲ + ${formattedRate}`;
    } else if (changeRate < 0) {
        return `▼ - ${formattedRate}`;
    } else {
        return formattedRate;
    }
};
