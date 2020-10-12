import SphericalMercator from "@mapbox/sphericalmercator";
import { PointUtils } from "../PointUtils";
import { Point } from "../Point";
import { Projection } from "../Projection";
import { CoordinatesUtils } from "../CoordinatesUtils";

export class MapboxProjection extends Projection {
	private sphericalMercator = new SphericalMercator({size: 256});

	public toScreen(p: Partial<Coordinates>, zoom: number): Point {
		return PointUtils.fromArray(this.sphericalMercator.px([p.latitude, p.longitude], zoom));
	}

	public toGeo(p: Point, zoom: number): Partial<Coordinates> {
		return CoordinatesUtils.fromArray(this.sphericalMercator.ll([p.x, p.y], zoom));
	}
}
