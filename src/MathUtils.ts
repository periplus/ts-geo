export namespace MathUtils {

	export function clip(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}

	export function randomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min);
	}

	export function randomChar(min: string, max: string): string {
		const imin = min.charCodeAt(0);
		const imax = max.charCodeAt(0);
		return String.fromCharCode(randomInt(imin, imax));
	}
}
