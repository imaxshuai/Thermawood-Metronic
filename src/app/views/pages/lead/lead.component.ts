// Angular
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
// Services
import { LayoutConfigService, SubheaderService } from '../../../core/_base/layout';

import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

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
	@ViewChild('searchInput') searchInput: ElementRef;
	private subscriptions: Subscription[] = [];
	displayedColumns: string[] = ['salesRep', 'date', 'customer','address', 'subrub', 'city','postcode', 'phone', 'email','joineryType'];
    dataSource = LEAD_DATA;
	constructor(private layoutConfigService: LayoutConfigService,private subheaderService:SubheaderService,public dialog: MatDialog) {
	}

	ngOnInit(): void {
		// Filtration, bind to searchInput
		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(150),
			distinctUntilChanged(),
			tap(() => {
				this.dataSource = LEAD_DATA;
			})
		)
		.subscribe();
		this.subscriptions.push(searchSubscription);
		this.subheaderService.setTitle('Lead');
	}
	leadModal(){
		const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  
  dialogConfig.data = {
    id: 1,
    title: 'Angular For Beginners'
	};
  const dialogRef = this.dialog.open(DialogContentExampleDialog,dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    
  });
	}
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog.html',
})
export class DialogContentExampleDialog {
  discount: string;
  seasons: object[] = [
      {name:'No Discount',value:0}, 
      {name:'Staff (15%)',value:15}, 
      {name:'Friends and Family (12.5%)',value:12.5}, 
      {name:'Custom',value:0}
    ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<DialogContentExampleDialog>
  ) { }
  save() {
    this.dialogRef.close({event:this.discount});
  }
  close() {
    this.dialogRef.close();
  }
  onInputChange(event){
    this.discount = event.value;
    console.log(event.value);
  }
}
