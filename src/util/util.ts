export const getGrowthColor = (growth: number): string => {
    if (growth > 0) {
        return '#FF5759';
    } else if (growth < 0) {
        return '#21BF73';
    } else {
        return 'black';
    }
};

export const formatPrice = (price: number): string => {
    return price.toLocaleString();
};