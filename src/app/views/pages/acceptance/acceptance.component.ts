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
	quoteNo: number;
	dateOfAcceptance: string;
	customer: string;
	acceptedQuote: string;
	depositRequired: string;
	depositReceived: string;
	balance: string;
  }
  const LEAD_DATA: ILead[] = [
	{position: 1, quoteNo: 3214, dateOfAcceptance: '5 Dec 2018', customer: 'Lara Croft',acceptedQuote: '5345',depositRequired: '1200',depositReceived: '1200',balance: '0'},
	{position: 1, quoteNo: 3214, dateOfAcceptance: '5 Dec 2018', customer: 'Lara Croft',acceptedQuote: '5345',depositRequired: '1200',depositReceived: '1200',balance: '0'},
	{position: 1, quoteNo: 3214, dateOfAcceptance: '5 Dec 2018', customer: 'Lara Croft',acceptedQuote: '5345',depositRequired: '1200',depositReceived: '1200',balance: '0'}
  ];
@Component({
	selector: 'kt-acceptance',
	templateUrl: './acceptance.component.html',
	styleUrls: ['acceptance.component.scss'],
})
export class AcceptanceComponent implements OnInit {
	
	displayedColumns: string[] = ['quoteNo', 'dateOfAcceptance', 'customer','acceptedQuote', 'depositRequired', 'depositReceived','balance'];
    dataSource = LEAD_DATA;
	constructor(private layoutConfigService: LayoutConfigService,private subheaderService:SubheaderService) {
	}

	ngOnInit(): void {
		this.subheaderService.setTitle('Acceptance');
	}
}
