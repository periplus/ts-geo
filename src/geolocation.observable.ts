import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

const GEOLOCATION_ERRORS = {
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
	'errors.location.timeout': 'Service timeout has been reached'
};

/** Options to monitor the geoposition. */
export interface WatchOptions {
	/** Specify true to obtain the most accurate position possible, or false to optimize in favor of performance and power consumption. */
	enableHighAccuracy?: boolean;

	/**
	 	* An Integer value that indicates the time, in milliseconds, allowed for obtaining the position.
		* If timeout is Infinity, (the default value) the location request will not time out.
		* If timeout is zero (0) or negative, the results depend on the behavior of the location provider.
		*/
	timeout?: number;

	/**
		* An Integer value indicating the maximum age, in milliseconds, of cached position information.
		* If maximumAge is non-zero, and a cached position that is no older than maximumAge is available,
		* the cached position is used instead of obtaining an updated location.
		* If maximumAge is zero (0), watchPosition always tries to obtain an updated position, even if a cached position is already available.
		* If maximumAge is Infinity, any cached position is used, regardless of its age,
		* and watchPosition only tries to obtain an updated position if no cached position data exists.
	 	*/
	maximumAge?: number;
}

export const DEFAULT_WATCH_OPTIONS: WatchOptions = {
	enableHighAccuracy: true,
	timeout: 10000,
	maximumAge: 0
};

/**
 * Obtains the geographic position, in terms of latitude and longitude coordinates, of the device.
 * @param options An object literal to specify one or more of the following attributes and desired values:
 * @returns {Observable} An observable sequence with the geographical location of the device running the client.
 */
export function watch(options?: WatchOptions): Observable<Coordinates> {
	let watchId: number;

	return new Observable<Coordinates>(observer => {
		if (window.navigator && window.navigator.geolocation) {
			watchId = window.navigator.geolocation.watchPosition(
				(position) => {
					observer.next(position.coords);
				},
				(error) => {
					switch (error.code) {
						case 1:
							observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
							break;
						case 2:
							observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
							break;
						case 3:
							observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
							break;
					}
				},
				{ ...DEFAULT_WATCH_OPTIONS, ...options});
		} else {
			observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
		}
	}).pipe(finalize(() => {
		// cancel the geolocation watch
		if (typeof(watchId) !== "undefined") {
			navigator.geolocation.clearWatch(watchId);
		}
	}));
}
