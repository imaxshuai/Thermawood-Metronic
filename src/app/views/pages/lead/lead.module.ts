// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { LeadComponent,DialogContentExampleDialog } from './lead.component';
import { MatTableModule,MatInputModule,MatButtonModule,MatDialogModule } from '@angular/material';
@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		MatTableModule,
		MatInputModule,
		MatButtonModule,
		MatDialogModule,
		CoreModule,
		NgbModule,
		RouterModule.forChild([
			{
				path: '',
				component: LeadComponent
			},
		]),
	],
	providers: [],
	declarations: [
		LeadComponent,
		DialogContentExampleDialog
	],
	entryComponents: [DialogContentExampleDialog]
})
export class LeadModule {

}
