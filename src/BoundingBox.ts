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
	export function getCenter(bbox: BoundingBox): Point {
		return new Point((bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2);
	}

	export function clipCenter(bbox: BoundingBox, radius: number | Point): BoundingBox {
		if (typeof radius === "number") {
			radius = new Point(radius, radius);
		}
		const center = getCenter(bbox);
		return {
				bottom: center.y > bbox.bottom ? center.y - radius.y / 2 : center.y + radius.y / 2,
				top: center.y > bbox.top ? center.y - radius.y / 2 : center.y + radius.y / 2,
				left: center.x > bbox.left ? center.x - radius.x / 2 : center.x + radius.x / 2,
				right: center.x > bbox.right ? center.x - radius.x / 2 : center.x + radius.x / 2
				};
	}

	export function getBBoxCoordinaterForMapViewport(projection: Projection,
			center: Coordinates,
			zoom: number,
			width: number, height: number): BoundingBox {
		const centerOnMap = projection.toScreen(center, zoom);
		const h2 = height / 2, w2 = width / 2;
		const topLeft = projection.toGeo(new Point(centerOnMap.x - w2, centerOnMap.y - h2), zoom);
		const bottomRight = projection.toGeo(new Point(centerOnMap.x + w2, centerOnMap.y + h2), zoom);
		return {
			top: topLeft.latitude,
			left: topLeft.longitude,
			bottom: bottomRight.latitude,
			right: bottomRight.longitude
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
		const xSign = Math.sign(bbox.right - bbox.left);
		const ySign = Math.sign(bbox.bottom - bbox.top);
		for (let x = bbox.left; x * xSign < bbox.right * xSign; x += xSign * max) {
			for (let y = bbox.top; y * ySign < bbox.bottom * ySign; y += ySign * max) {
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
