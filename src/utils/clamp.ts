export function clamp(target: number, min: number, max: number): number {
    if (target <= min) return min;
    if (target >= max) return max;
    return target;
}
