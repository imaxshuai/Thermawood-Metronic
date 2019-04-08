// Anglar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Layout Directives
import { ContentAnimateDirective, HeaderDirective, MenuDirective, StickyDirective } from './_base/layout';
// Metronic Pipes
// Metornic Services
import { FirstLetterPipe, GetObjectPipe, JoinPipe, OffcanvasDirective, SafePipe, ScrollTopDirective, SparklineChartDirective, TabClickEventDirective, TimeElapsedPipe, ToggleDirective } from './_base/metronic';

@NgModule({
	imports: [CommonModule],
	declarations: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
	],
	exports: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
	],
	providers: []
})
export class CoreModule {
	constructor(){
		//localStorage.setItem('authce9d77b308c149d5992a80073637e4d5','access-token-8f3ae836da744329a6f93bf20594b5cc')
	}
}
