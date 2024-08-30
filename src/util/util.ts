export const getGrowthColor = (growth: number): string => {
  if (growth > 0) {
    return "#FF5759";
  } else if (growth < 0) {
    return "#21BF73";
  } else {
    return "black";
  }
};

export const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null) {
    return "0"; // price가 undefined나 null일 경우 기본값 반환
  }
  return `${price.toLocaleString()}`;
};

export const formatRate = (rate: number | undefined | null): string => {
  if (rate === undefined || rate === null) {
    return "0.00"; // Return "0.00" if rate is undefined or null
  }
  return rate.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// export const formatROR = (ror: number): string => {
//   const sign = ror > 0 ? '+' : '';  // 양수일 때 + 기호 추가
//   return `${sign}${ror.toFixed(2)}`; // 소수점 둘째 자리까지 포맷팅
// }

type FormattedROR = {
  value: string;
  color: string;
};

export const formatROR = (ror: number | undefined): FormattedROR => {
  // 기본값 설정
  if (ror === undefined || ror === null) {
    return { value: "0.00", color: "blue" };
  }

  // 양수, 음수, 0 판단
  const isPositive = ror > 0;
  const isZero = ror === 0;

  // + 붙이기, 2자리 소수점으로 표시, 0일 때는 기호 없이 표시
  const formattedValue = isZero
    ? ror.toFixed(2)
    : `${isPositive ? "+" : ""}${ror.toFixed(2)}`;

  // 색상 설정, 0일 때는 회색
  const color = isZero ? "#5B5B5B" : isPositive ? "#FF4949" : "#001AFF";

  return { value: formattedValue, color: color };
};
