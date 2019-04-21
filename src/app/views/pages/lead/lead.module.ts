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
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule,MatInputModule,MatButtonModule,MatDialogModule,MatIconModule } from '@angular/material';
@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		MatTableModule,
		MatInputModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		MatDatepickerModule,
		FormsModule,
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
