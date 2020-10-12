export namespace CoordinatesUtils {

	/**
	 * Creates a position.
	 * @param x an array of the form [latitude, longitude, altitude]. Altitude is optional.
	 * @param invertedPosition
	 */
	export function fromArray(x: number[], invertedPosition?: boolean): Partial<Coordinates> {
		return {
				latitude: x[invertedPosition ? 1 : 0],
				longitude: x[invertedPosition ? 0 : 1],
				altitude: x.length > 2 ? x[2] : undefined
				};
	}

	export function parse(s: string, invertedPosition?: boolean): Partial<Coordinates> {
		return fromArray(s.split(/(?:\s|,|;)+/).map(n => parseFloat(n)), invertedPosition);
	}
}
