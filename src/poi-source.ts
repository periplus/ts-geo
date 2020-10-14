import { Provider } from './Provider';
import { Observable } from 'rxjs';
import { BoundingBox } from './BoundingBox';
import { POI } from './poi';

export interface POISource {
	readonly name: string;
	readonly provider: Provider;

	get(bbox: BoundingBox, zoom: number): Observable<POI[]>;
}
