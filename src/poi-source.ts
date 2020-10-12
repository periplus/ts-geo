import { Observable } from 'rxjs';
import { BoundingBox } from './BoundingBox';
import { POI } from './poi';

export interface POISource {
	name: string;

	get(bbox: BoundingBox, zoom: number): Observable<POI[]>;
}
