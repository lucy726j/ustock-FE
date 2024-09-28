import React from "react";

export const formatPrice = (num: number): string => {
    if (num === 0) {
        return "-";
    }

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPriceWithYear = (num: number, year: string): string => {
    if (num === 0 && year !== "2014") {
        return "상장폐지";
    }
    if (num === 0) {
        return "-";
    }

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatChangeRate = (changeRate: number): string => {
    if (changeRate === 0) {
        return "-";
    }

    const formattedRate = `${Math.abs(changeRate).toFixed()}%`; // 소수점 2자리까지 표시
    if (changeRate > 0) {
        return `▲ + ${formattedRate}`;
    } else if (changeRate < 0) {
        return `▼ - ${formattedRate}`;
    } else {
        return formattedRate;
    }
};

interface ChangeRateResult {
    format: string;
    color: string;
}

export const formatChangeRateFrom = (changeRate: number): ChangeRateResult => {
    if (changeRate > 0) {
        return {
            format: `+ ${changeRate}%`,
            color: "red",
        };
    } else if (changeRate < 0) {
        return {
            format: `- ${changeRate}`,
            color: "blue",
        };
    } else {
        return {
            format: "-",
            color: "black",
        };
    }
};
