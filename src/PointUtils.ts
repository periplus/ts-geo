import { Point } from "./Point";

export namespace PointUtils {

	export const ORIGIN = new Point(0, 0);

	/**
	 * Creates a position.
	 * @param x an array of the form [latitude, longitude, altitude]. Altitude is optional.
	 * @param invertedPosition
	 */
	export function fromArray(x: number[], invertedPosition?: boolean): Point {
		return new Point(x[invertedPosition ? 1 : 0], x[invertedPosition ? 0 : 1]);
	}

	export function parse(s: string, invertedPosition?: boolean): Point {
		return fromArray(s.split(/(?:\s|,|;)+/).map(n => parseFloat(n)), invertedPosition);
	}

	export function delta(from: Point, to: Point): Point {
		return minus(to, from);
	}

	export function add(...points: Point[]): Point {
		let x = 0, y = 0;
		points.forEach(p => { x += p.x; y += p.y; });
		return new Point(x, y);
	}

	/** Returns the difference between two points.
	 * @param a the first point from which we substract the second one.
	 * @param b the second point, substracted from first. Optional.
	 * If not specified, the first point is substracted from ORIGIN.
	 */
	export function minus(a: Point, b?: Point) {
		if (typeof b === "undefined") {
			b = a;
			a = ORIGIN;
		}
		return new Point(a.x - b.x, a.y - b.y);
	}
}
