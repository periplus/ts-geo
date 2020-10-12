import { MathUtils } from "./MathUtils";

export namespace ZoomLevel {
	export const MIN = 0;
	export const MAX = 20;
	export const WORLD = 0;
	export const CONTINENT = 1;
	export const COUNTRY = 6;
	export const METROPOLITAN = 10;
	export const CITY = 11;
	export const TOWN = 12;
	export const DISTRICT = 12;
	export const VILLAGE = 13;
	export const SUBURB = 13;
	export const ROAD = 15;
	export const STREET = 16;
	export const BLOCK = 17;
	export const BUILDING = 18;

	export function clip(value: number) {
		return MathUtils.clip(value, MIN, MAX);
	}
}
