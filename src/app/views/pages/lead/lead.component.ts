// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
import { LayoutConfigService, SubheaderService } from '../../../core/_base/layout';
// Widgets model
import { SparklineChartOptions } from '../../../core/_base/metronic';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';
export interface ILead {
	position:number,
	salesRep: string;
	date: string;
	customer: string;
	address: string;
	subrub: string;
	city: string;
	postcode: string;
	phone: string;
	email: string;
	joineryType: string;
  }
  const LEAD_DATA: ILead[] = [
	{position: 1, salesRep: 'John Citizen', date: '5 Dec 2018', customer: 'Lara Croft',address: '12 Dead End Road',subrub: 'Grey Lynn',city: 'Auckland',postcode: '2000',phone: '0277679908',email: 'abc@xyd.com',joineryType: 'Aluminium'},
	{position: 1, salesRep: 'Jason Bourne', date: '15 Jan 2019', customer: 'Jecinda Ardurn',address: '54 First View St',subrub: 'Mt Wellingtor',city: 'Auckland',postcode: '2349',phone: '0277679908',email: 'acvd@xyd.com',joineryType: 'Timber'},
	{position: 1, salesRep: 'Jack Reacher', date: '25 Mar 2019', customer: 'john Wick',address: '34 kiwi Road',subrub: 'Chatswood',city: 'Auckland',postcode: '2019',phone: '0277679908',email: 'hgf@xyd.com',joineryType: 'Timber'}
  ];
@Component({
	selector: 'kt-lead',
	templateUrl: './lead.component.html',
	styleUrls: ['lead.component.scss'],
})
export class LeadComponent implements OnInit {
	
	displayedColumns: string[] = ['salesRep', 'date', 'customer','address', 'subrub', 'city','postcode', 'phone', 'email','joineryType'];
    dataSource = LEAD_DATA;
	constructor(private layoutConfigService: LayoutConfigService,private subheaderService:SubheaderService) {
	}

	ngOnInit(): void {
		this.subheaderService.setTitle('Lead');
	}
}
