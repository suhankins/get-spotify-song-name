import type { Position } from '../types/Position';

export default function getPosition(index: number, total: number): Position {
    if (total === 1) {
        return '';
    }
    if (index === 0) {
        return 'first';
    }
    if (total - 1 === index) {
        return 'last';
    }
    return 'middle';
}
