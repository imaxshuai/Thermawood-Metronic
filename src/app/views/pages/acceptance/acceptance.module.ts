// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { AcceptanceComponent } from './acceptance.component';
import { FormsModule } from '@angular/forms';
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
		FormsModule,
		CoreModule,
		NgbModule,
		RouterModule.forChild([
			{
				path: '',
				component: AcceptanceComponent
			},
		]),
	],
	providers: [],
	declarations: [
		AcceptanceComponent,
	]
})
export class AcceptanceModule {
}
