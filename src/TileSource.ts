import { Provider } from "Provider";
import { MathUtils } from "./MathUtils";
import { Point } from "./Point";

export interface TileSource {
	zoomMin: number;
	zoomMax: number;
	tileSize: number;
	baseUrl: string;
	name: string;
	provider: Provider;
	description: string;
}

export const DEFAULT_TILE_SOURCE = {
	zoomMin: 1,
	zoomMax: 13,
	tileSize: 256
};

export function tileUrl(source: TileSource, point: Point, zoom: number): string {
	const tileUrls = source.baseUrl.split(/\s|\,|\;/i);
	return tileUrls[MathUtils.randomInt(0, tileUrls.length)]
			.replace(/\$?\{([^}]+)\}/gi, (match, varName) => {
				switch (varName.toLowerCase()) {
					case "s":
					case "server":
					case "abc":
						return MathUtils.randomChar('a', 'd');
					case "x":
						return point.x.toString();
					case "y":
						return point.y.toString();
					case "z":
					case "zoom":
						return zoom.toString();
					default:
						return "${" + varName + "}";
				}
			});
}
