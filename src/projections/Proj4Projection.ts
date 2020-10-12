import proj4 from "proj4";
import { Point } from "../Point";
import { Projection } from "../Projection";

export class Proj4Projection extends Projection {

	private static geoDef = 'EPSG:27700';
	private static screenDef = 'EPSG:4326';

	public toScreen(p: Partial<Coordinates>, zoom: number): Point {
		return proj4(Proj4Projection.geoDef, Proj4Projection.screenDef, {x: p.latitude, y: p.longitude});
	}

	public toGeo(p: Point, zoom: number): Partial<Coordinates> {
		const pt = proj4(Proj4Projection.screenDef, Proj4Projection.geoDef, p);
		return { latitude: pt.x, longitude: pt.y };
	}
}
