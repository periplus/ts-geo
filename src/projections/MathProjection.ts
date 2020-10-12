import { MathUtils } from "../MathUtils";
import { Point } from "../Point";
import { Projection } from "../Projection";
import { Geo } from "../Geo";

export class MathProjection extends Projection {

	constructor(public readonly tileSize = 256) {
		super();
	}

	public toScreen(p: Partial<Coordinates>, zoom: number): Point {
		const latitude = MathUtils.clip(p.latitude, Geo.MinLatitude, Geo.MaxLatitude);
		const longitude = MathUtils.clip(p.longitude, Geo.MinLongitude, Geo.MaxLongitude);

		const x = (longitude + 180) / 360;
		const sinLatitude = Math.sin(latitude * Math.PI / 180);
		const y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);

		const mapSize = Geo.mapSizeInPx(zoom, this.tileSize);

		return new Point(MathUtils.clip(x * mapSize + 0.5, 0, mapSize - 1), MathUtils.clip(y * mapSize + 0.5, 0, mapSize - 1));
	}

	public toGeo(p: Point, zoom: number): Partial<Coordinates> {
		const mapSize = Geo.mapSizeInPx(zoom, this.tileSize);

		const x = (MathUtils.clip(p.x, 0, mapSize - 1) / mapSize) - 0.5;
		const y = 0.5 - (MathUtils.clip(p.y, 0, mapSize - 1) / mapSize);

		return {
				longitude: 360 * x,
				latitude: 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI
				};
	}
}
