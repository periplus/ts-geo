import { POISource } from './poi-source';

export interface POI {
	source: POISource;
	id: string;
	title: string;
	description: string;
	url: string;
	position: Coordinates;
	icon: string;
	thumbnailUrl: string;
}
