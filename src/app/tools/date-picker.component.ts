import { forwardRef, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";

const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePicker),
  multi: true
};
declare var jQuery: any;

@Component({
  selector: 'my-datepicker',
  template: `   
                <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
                <input #input type="text" [class]="status" required readonly>
            `,
  providers: [DATE_PICKER_VALUE_ACCESSOR],
  

})
export class DatePicker implements AfterViewInit {
    private onTouched = () => { };
    private onChange: (value: string) => void = () => {  };

    @Input() myNgClass: string = '';

    @Input() required: boolean = false;

    @Input() options: any = {};
  
    @Input() value: string = '';
    
    @Input() status: string = "form-control ng-invalid";
 
    checkStatus(value: string){
        this.status="form-control ";
        //Si la valeur est 
        return value=='' ? this.status+="ng-invalid" : this.status+="ng-valid"; 
    }
    
    writeValue(date: string) {
        this.value = date;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    @Output() dateChange = new EventEmitter();

    @ViewChild('input') input: ElementRef;

    ngAfterViewInit() {
        
        jQuery(this.input.nativeElement).datepicker(Object.assign({}, this.options, {
            onSelect: (value:any) => {
                
                this.value = value;

                this.onChange(value);

                this.onTouched();

                this.dateChange.next(value);
                
                //change la couleur de l'input
                this.checkStatus(value);              
                
            }
        })).datepicker('setDate', this.value)
        .datepicker( "option", "dateFormat", "yy-mm-dd" );
        //Afin de ne plus avoir de problème au début du chargement de la page
        document.getElementById('ui-datepicker-div').setAttribute('style', "display:none;" );
        
        

    ;
    
  }
}