import { Point } from "./Point";

export namespace PointUtils {

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
		return new Point(to.x - from.x, to.y - from.y);
	}

	export function add(p: Point, d: Point): Point {
		return new Point(p.x + d.x, p.y + d.y);
	}
}
