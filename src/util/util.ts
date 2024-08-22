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


export const formatROR = (ror: number): string => {
  const sign = ror > 0 ? '+' : '';  // 양수일 때 + 기호 추가
  return `${sign}${ror.toFixed(2)}`; // 소수점 둘째 자리까지 포맷팅
}
