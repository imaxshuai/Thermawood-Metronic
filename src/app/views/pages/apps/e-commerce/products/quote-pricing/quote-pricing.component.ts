// Angular
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder} from '@angular/forms';
// Material
import { MatDialog } from '@angular/material';

// NGRX
import { Store } from '@ngrx/store';

import { AppState } from '../../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../../core/_base/layout';
// CRUD
import { LayoutUtilsService, TypesUtilsService, MessageType } from '../../../../../../core/_base/crud';


import { OffcanvasOptions } from '../../../../../../core/_base/metronic';
	export interface Transaction {
		rooms:string,
		numberOfUnits:number,
		optionOne:number,
		optionTwo:number,
		optionThree:number,
		optionFour:number,
		features:string,
	}
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-quote-pricing',
	templateUrl: './quote-pricing.component.html',
	styleUrls: ['./quote-pricing.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class QuotePricingComponent implements OnInit, OnDestroy {
	// Public properties
	displayedColumns: string[] = ['rooms', 'numberOfUnits','optionOne','optionTwo','optionThree','optionFour','features'];
  enableDiscount:boolean;
	discount:number;
	discountOption :string;
  OptionOneCostWithDiscount:number;
  OptionTwoCostWithDiscount:number;
  OptionThreeCostWithDiscount:number;
  OptionFourCostWithDiscount:number;
  transactions: Transaction[] = [
    {rooms: 'Lounge',
    numberOfUnits:3,
    optionOne:851.00,
    optionTwo:940.00,
    optionThree:960.00,
    optionFour:970,features:'Laminate'},
    {rooms: 'Bedroom 1',
    numberOfUnits:2,
    optionOne:1000.00,
    optionTwo:1050.00,
    optionThree:1100.00,
    optionFour:1150,features:'Laminate'},
    {rooms: 'Bedroom 2',
    numberOfUnits:2,
    optionOne:1050.00,
    optionTwo:1100.00,
    optionThree:1150.00,
    optionFour:1200,features:'Laminate'},
    {rooms: 'Bedroom 3',
    numberOfUnits:4,
    optionOne:1180.00,
    optionTwo:1200.00,
    optionThree:1250.00,
    optionFour:1270,features:'Laminate'},
    {rooms: 'Toilet',
    numberOfUnits:6,
    optionOne:1250.00,
    optionTwo:1290.00,
    optionThree:1320.00,
    optionFour:1370,features:'Laminate'},
    {rooms: 'Laundry',
    numberOfUnits:1,
    optionOne:1400.00,
    optionTwo:1430.00,
    optionThree:1480.00,
    optionFour:1500,features:'Laminate'},
    {rooms: 'Bedroom 4',
    numberOfUnits:2,
    optionOne:1500.00,
    optionTwo:1600.00,
    optionThree:1650.00,
    optionFour:1670,features:'Laminate'},
    {rooms: 'Bedroom 5',
    numberOfUnits:5,
    optionOne:1200.00,
    optionTwo:1250.00,
    optionThree:1300.00,
    optionFour:1400,features:'Laminate'}
	];
	seasons: object[] = [
		{name:'No Discount',value:0}, 
		{name:'Staff (15%)',value:15}, 
		{name:'Friends and Family (12.5%)',value:12.5}, 
		{name:'Custom',value:0}
	];
	demoPanelOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: 'kt-demo-panel',
		closeBy: 'kt_demo_panel_close1',
		toggleBy: 'kt_demo_panel_toggle1'
	};

	constructor(
		private store: Store<AppState>,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private typesUtilsService: TypesUtilsService,
		private productFB: FormBuilder,
		public dialog: MatDialog,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private layoutConfigService: LayoutConfigService) {
		}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	selectDiscountOption(season){
		this.discountOption = season.name;
	}
	onInputChange(event){
		debugger;
    this.discount = event.value;
    this.OptionOneCostWithDiscount = (this.getTotalOptionOneCost() * this.discount)/100;
    this.OptionTwoCostWithDiscount = (this.getTotalOptionTwoCost() * this.discount)/100;
    this.OptionThreeCostWithDiscount = (this.getTotalOptionThreeCost() * this.discount)/100;
    this.OptionFourCostWithDiscount = (this.getTotalOptionFourCost() * this.discount)/100;
  }
	getTotalUnitCost() {
		return this.transactions.map(t => t.numberOfUnits).reduce((acc, value) => acc + value, 0);
	 }
	 getTotalOptionOneCost() {
		return this.transactions.map(t => t.optionOne).reduce((acc, value) => acc + value, 0);
	 }
	 getTotalOptionTwoCost() {
		return this.transactions.map(t => t.optionTwo).reduce((acc, value) => acc + value, 0);
	 }
	 getTotalOptionThreeCost() {
		return this.transactions.map(t => t.optionThree).reduce((acc, value) => acc + value, 0);
	 }
	 getTotalOptionFourCost() {
		return this.transactions.map(t => t.optionFour).reduce((acc, value) => acc + value, 0);
	 }
	 onRowSelect(row){
		this.router.navigate(['/customer-details']);
	 }
	  simulateClick (elem:any) {
		// Create our event (with options)
		let evt = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		// If cancelled, don't dispatch our event
		let canceled = !elem.dispatchEvent(evt);
	};
	  addWindow(){
		let ktDemopanelOverlay = document.getElementsByClassName('kt-demo-panel-overlay')[0];
		this.simulateClick(ktDemopanelOverlay);
	 }

	ngOnInit() {
		this.subheaderService.setTitle('Quote Pricing');
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
	}

	

	
	goBack(id) {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/quotes?id=${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Refresh product
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshProduct(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `${this.layoutConfigService.getCurrentMainRoute()}/quotes/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	onSumbit(withBack: boolean = false) {
		let url = `/quotes/edit/${this.activatedRoute.snapshot.paramMap.get('id')}/room/window/quote-extras`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Add product
	 *
	 * @param _product: ProductModel
	 * @param withBack: boolean
	 */
	

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'List';
		return result;
	}
}
