// Angular
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialog } from '@angular/material';
// RxJS
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { map, startWith, delay, first} from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
import { Dictionary, Update } from '@ngrx/entity';
import { AppState } from '../../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../../core/_base/layout';
// CRUD
import { LayoutUtilsService, TypesUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { SignatureFieldComponent } from '../signature-field/signature-field.component';
// Services and Models
import {
	selectLastCreatedProductId,
	selectProductById,
	SPECIFICATIONS_DICTIONARY,
	ProductModel,
	ProductOnServerCreated,
	ProductUpdated
} from '../../../../../../core/e-commerce';
import { OffcanvasOptions } from '../../../../../../core/_base/metronic';
const AVAILABLE_COLORS: string[] =
	['Red', 'CadetBlue', 'Gold', 'LightSlateGrey', 'RoyalBlue', 'Crimson', 'Blue', 'Sienna', 'Indigo', 'Green', 'Violet',
	'GoldenRod', 'OrangeRed', 'Khaki', 'Teal', 'Purple', 'Orange', 'Pink', 'Black', 'DarkTurquoise'];

const AVAILABLE_MANUFACTURES: string[] =
	['Pontiac', 'Subaru', 'Mitsubishi', 'Oldsmobile', 'Chevrolet', 'Chrysler', 'Suzuki', 'GMC', 'Cadillac', 'Mercury', 'Dodge',
	'Ram', 'Lexus', 'Lamborghini', 'Honda', 'Nissan', 'Ford', 'Hyundai', 'Saab', 'Toyota'];

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-window-edit',
	templateUrl: './window-edit.component.html',
	styleUrls: ['./window-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowEditComponent implements OnInit, OnDestroy {
	// Public properties
	@ViewChild(SignatureFieldComponent) public signature: SignatureFieldComponent;
    @ViewChild('sigContainer') public signatureContainer: ElementRef;
	demoPanelOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: 'kt-demo-panel',
		closeBy: 'kt_demo_panel_close1',
		toggleBy: 'kt_demo_panel_toggle1'
	};
	product: {};
	windowName:'';
	description:'';
	productId$: Observable<number>;
	oldProduct: ProductModel;
	selectedTab: number = 0;
	loadingSubject = new BehaviorSubject<boolean>(true);
	loading$: Observable<boolean>;
	productForm: FormGroup;
	hasFormErrors: boolean = false;
	availableYears: number[] = [];
	filteredColors: Observable<string[]>;
	filteredManufactures: Observable<string[]>;
	// Private password
	private componentSubscriptions: Subscription;
	// sticky portlet header margin
	private headerMargin: number;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param typesUtilsService: TypesUtilsService
	 * @param productFB: FormBuilder
	 * @param dialog: MatDialog
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: SubheaderService
	 * @param layoutConfigService: LayoutConfigService
	 */
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

	public ngAfterViewInit() {
		this.beResponsive();
		this.setOptions();
	  }
	  
	  // set the dimensions of the signature pad canvas
	  public beResponsive() {
		this.size(this.signatureContainer, this.signature);
	  }
	  
	  public size(container: ElementRef, sig: SignatureFieldComponent) {
		  sig.signaturePad.set('canvasWidth', 434);
		  sig.signaturePad.set('canvasHeight', 250);
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
	  public setOptions() {
		this.signature.signaturePad.set('penColor', 'rgb(0, 0, 0)');
			this.signature.signaturePad.set('maxWidth', '3');
			this.signature.signaturePad.set('backgroundColor', 'rgb(255, 255, 255)');
			this.signature.signaturePad.clear(); // clearing is needed to set the background colour
	  }
	  public clear() {
		this.signature.clear();
	  }
	ngOnInit() {
		this.createForm();
		this.subheaderService.setTitle('Edit Window');
		// sticky portlet header
		window.onload = () => {
			const style = getComputedStyle(document.getElementById('kt_header'));
			this.headerMargin = parseInt(style.height, 0);
		};
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	/**
	 * Init product
	 */
	initProduct() {
	}

	/**
	 * Create form
	 */
	createForm() {
		// this.productForm = this.productFB.group({
		// 	room: [this.product.name, Validators.required],
		// 	description: [this.product.description]
		// });

		// this.filteredManufactures = this.productForm.controls.manufacture.valueChanges
		// 	.pipe(
		// 		startWith(''),
		// 		map(val => this.filterManufacture(val.toString()))
		// 	);
		// this.filteredColors = this.productForm.controls.color.valueChanges
		// 	.pipe(
		// 		startWith(''),
		// 		map(val => this.filterColor(val.toString()))
		// );
	}

	/**
	 * Filter manufacture
	 *
	 * @param val: string
	 */
	filterManufacture(val: string): string[] {
		return AVAILABLE_MANUFACTURES.filter(option =>
			option.toLowerCase().includes(val.toLowerCase()));
	}

	/**
	 * Filter color
	 *
	 * @param val: string
	 */
	filterColor(val: string): string[] {
		return AVAILABLE_COLORS.filter(option =>
			option.toLowerCase().includes(val.toLowerCase()));
	}

	/**
	 * Go back to the list
	 *
	 * @param id: any
	 */
	goBack(id) {
		this.loadingSubject.next(false);
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
		this.loadingSubject.next(false);
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `${this.layoutConfigService.getCurrentMainRoute()}/quotes/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	reset() {
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		let url = `/default/all/quotes/edit/${this.activatedRoute.snapshot.paramMap.get('id')}/room/window/quote-extras`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Returns object for saving
	 */
	prepareProduct(): ProductModel {
		const controls = this.productForm.controls;
		const _product = new ProductModel();
		return _product;
	}

	/**
	 * Add product
	 *
	 * @param _product: ProductModel
	 * @param withBack: boolean
	 */
	addProduct(_product: ProductModel, withBack: boolean = false) {
		this.loadingSubject.next(true);
		this.store.dispatch(new ProductOnServerCreated({ product: _product }));
		this.componentSubscriptions = this.store.pipe(
			delay(1000),
			select(selectLastCreatedProductId)
		).subscribe(newId => {
			if (!newId) {
				return;
			}

			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(newId);
			} else {
			 	const message = `New product successfully has been added.`;
			 	this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			 	this.refreshProduct(true, newId);
			}
		});
	}

	/**
	 * Update product
	 *
	 * @param _product: ProductModel
	 * @param withBack: boolean
	 */
	updateProduct(_product: ProductModel, withBack: boolean = false) {
		this.loadingSubject.next(true);

		const updateProduct: Update<ProductModel> = {
			id: _product.id,
			changes: _product
		};

		this.store.dispatch(new ProductUpdated({
			partialProduct: updateProduct,
			product: _product
		}));

		of(undefined).pipe(delay(3000)).subscribe(() => { // Remove this line
			if (withBack) {
		 		this.goBack(_product.id);
			} else {
				const message = `Product successfully has been saved.`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Update, 10000, true, true);
		 		this.refreshProduct(false);
			}
		}); // Remove this line
	}

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'List';
		return result;
	}

	/**
	 * Close alert
	 *
	 * @param $event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
