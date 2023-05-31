import { ColorModel } from '@interfaces/Color.model';

export const getColors = (
    colors?: ColorModel[],
    value?: number,
): ColorModel | undefined => {
    if (!colors) return;
    if (!value) return;

    return colors.find((c) => c.id === value);
};
