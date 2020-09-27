/**
 * Свойства у domRect не собственные, следовательно Object.values не вернёт их, если передавать сразу domRect, поэтому нужен преобразователь, для кроссбраузерности используются только поддерживаемые свойства
 */
export const domRectToObject = domRect => {
    const { left, right, top, bottom } = domRect;
    return { left, right, top, bottom };
}