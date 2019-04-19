// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
import { LayoutConfigService,SubheaderService } from '../../../core/_base/layout';
// Widgets model
import { SparklineChartOptions } from '../../../core/_base/metronic';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';
const color = Chart.helpers.color;
@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	chartOptions1: SparklineChartOptions;
	chartOptions2: SparklineChartOptions;
	chartOptions3: SparklineChartOptions;
	chartOptions4: SparklineChartOptions;
	widget4_1: Widget4Data;
	widget4_2: Widget4Data;
	widget4_3: Widget4Data;
	widget4_4: Widget4Data;
	leadData:any={
		labels: ['10 Jan', '11 Jan', '12 Jan', '13 Jan', '14 Jan', '15 Jan', '16 Jan'],
		datasets: [
			{
				fill: true,
				// borderWidth: 0,
				backgroundColor: color(this.layoutConfigService.getConfig('colors.state.brand')).alpha(0.6).rgbString(),
				borderColor: color(this.layoutConfigService.getConfig('colors.state.brand')).alpha(0).rgbString(),

				pointHoverRadius: 4,
				pointHoverBorderWidth: 12,
				pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
				pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
				pointHoverBackgroundColor: this.layoutConfigService.getConfig('colors.state.brand'),
				pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),

				data: [30, 50, 60, 35, 45, 65, 40]
			},
			{
				fill: true,
				// borderWidth: 0,
				backgroundColor: color(this.layoutConfigService.getConfig('colors.state.brand')).alpha(0.2).rgbString(),
				borderColor: color(this.layoutConfigService.getConfig('colors.state.brand')).alpha(0).rgbString(),

				pointHoverRadius: 4,
				pointHoverBorderWidth: 12,
				pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
				pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
				pointHoverBackgroundColor: this.layoutConfigService.getConfig('colors.state.brand'),
				pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),

				data: [35, 55, 65, 40, 50, 70, 45]
			}
		]
	};
	conversationLeadData:any={
		labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10', 'Label 11', 'Label 12', 'Label 13', 'Label 14', 'Label 15', 'Label 16'],
		datasets: [
			{
				// label: 'dataset 1',
				backgroundColor: this.layoutConfigService.getConfig('colors.state.success'),
				data: [
					15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20, 15, 10, 15, 20
				]
			}, {
				// label: 'dataset 2',
				backgroundColor: '#f3f3fb',
				data: [
					15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20, 15, 10, 15, 20
				]
			}
		]
	};
	constructor(private layoutConfigService: LayoutConfigService,private subheaderService: SubheaderService,) {
	}

	ngOnInit(): void {
		this.subheaderService.setTitle('Dashboard');
		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};
		this.chartOptions2 = {
			data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
			color: this.layoutConfigService.getConfig('colors.state.danger'),
			border: 3
		};
		this.chartOptions3 = {
			data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
			color: this.layoutConfigService.getConfig('colors.state.success'),
			border: 3
		};
		this.chartOptions4 = {
			data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
			color: this.layoutConfigService.getConfig('colors.state.primary'),
			border: 3
		};

		
	}
}
