import { Point } from "./Point";

export abstract class Projection {
	public abstract toScreen(p: Partial<Coordinates>, zoom: number): Point;
	public abstract toGeo(p: Point, zoom: number): Partial<Coordinates>;
}
