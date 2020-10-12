export namespace Geo {
	/** Earth radius in meters. */
	export const EarthRadius = 6378137;

	export const MinLatitude = -85.05112878;
	export const MaxLatitude = 85.05112878;
	export const MinLongitude = -180;
	export const MaxLongitude = 180;

	/**
	 * Calculates width and height of the map in pixels at a specific zoom level from -180 degrees to 180 degrees.
	 */
	export function mapSizeInPx(zoom: number, tileSize: number): number {
		return Math.ceil(tileSize * mapSizeInTiles(zoom));
	}

	/**
	 * Calculates width and height of the map in tiles at a specific zoom level from -180 degrees to 180 degrees.
	 */
	export function mapSizeInTiles(zoom: number): number {
		return Math.pow(2, zoom);
	}

	/**
	 * Calculatesarea of the map in tiles at a specific zoom level from -180 degrees to 180 degrees.
	 */
	export function mapAreaInTiles(zoom: number): number {
		return Math.pow(mapSizeInTiles(zoom), 2);
	}
}
