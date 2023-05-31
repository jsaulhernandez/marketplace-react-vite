import { ColorModel } from '@interfaces/Color.model';

export const getColors = (colors?: ColorModel[]): string[] => {
    if (!colors) return [];

    return colors.map((c) => c.value);
};
