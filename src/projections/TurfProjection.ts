import { PointUtils } from "../PointUtils";
import { Point } from "../Point";
import { Projection } from "../Projection";
import { CoordinatesUtils } from "../CoordinatesUtils";

export class TurfProjection extends Projection {

	public toScreen(p: Partial<Coordinates>, zoom: number): Point {
		const pt = turf.point([p.latitude, p.longitude]);
		// pt = turf.toMercator(pt);
		return PointUtils.fromArray(pt.geometry.coordinates);
	}

	public toGeo(p: Point, zoom: number): Partial<Coordinates> {
		const pt = turf.point([p.x, p.y]);
		// pt = turf.toWgs84(pt);
		return CoordinatesUtils.fromArray(pt.geometry.coordinates);
	}
}
