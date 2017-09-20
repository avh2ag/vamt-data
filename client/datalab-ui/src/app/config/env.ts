import { isDevMode } from '@angular/core';
export class Env {
	public getAPIHost(): string {
		if (!isDevMode) {
			//return prod url
		}
		return "http://localhost:8000/api/";
	} 
}