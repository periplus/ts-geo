import { Projection } from "./Projection";
import { MathUtils } from "./MathUtils";
import { Geo } from "./Geo";
import { Point } from "./Point";

// https://wiki.openstreetmap.org/wiki/Bounding_Box
export interface BoundingBox {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export namespace BoundingBox {
	export function getBBoxCoordinaterForMapViewport(projection: Projection,
			center: Coordinates,
			zoom: number,
			width: number, height: number): BoundingBox {
		const centerOnMap = projection.toScreen(center, zoom);
		const h2 = height / 2, w2 = width / 2;
		const topLeft = projection.toGeo(new Point(centerOnMap.x - w2, centerOnMap.y - h2), zoom);
		const bottomRight = projection.toGeo(new Point(centerOnMap.x + w2, centerOnMap.y + h2), zoom);
		return {
			top: topLeft.longitude,
			left: topLeft.latitude,
			bottom: bottomRight.longitude,
			right: bottomRight.latitude
		};
	}

	export function getBBoxInTilesForMapViewport(projection: Projection,
			center: Coordinates,
			zoom: number,
			width: number, height: number,
			tileSize: number): BoundingBox {
		const centerOnMap = projection.toScreen(center, zoom);
		const mapSizeInTiles = Geo.mapSizeInTiles(zoom);
		width = MathUtils.clip(width, 0, mapSizeInTiles * tileSize);
		height = MathUtils.clip(height, 0, mapSizeInTiles * tileSize);
		const top = MathUtils.clip(Math.floor((centerOnMap.y - height / 2) / tileSize), 0, mapSizeInTiles - 1);
		const left = MathUtils.clip(Math.floor((centerOnMap.x - width / 2) / tileSize), 0, mapSizeInTiles - 1);
		return {
			top: top,
			bottom: top + Math.floor(height / tileSize),
			left: left,
			right: left + Math.floor(width / tileSize)
		};
	}

	export function splitBBox(bbox: BoundingBox, max: number): BoundingBox[] {
		const bboxes = [];
		for (let x = bbox.left; x < bbox.right; x += max) {
			for (let y = bbox.top; y < bbox.bottom; y += max) {
				const b = {
					top: y, bottom: y + max,
					left: x, right: x + max
				};
				bboxes.push(b);
			}
		}
		return bboxes;
	}
}
