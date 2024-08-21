export const getGrowthColor = (growth: number): string => {
    if (growth > 0) {
        return '#FF5759';
    } else if (growth < 0) {
        return '#21BF73';
    } else {
        return 'black';
    }
};

export const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null) {
    return "0"; // price가 undefined나 null일 경우 기본값 반환
  }
  return `${price.toLocaleString()}`;
};
