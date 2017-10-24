import { forwardRef, Input, Output, EventEmitter
    , ViewChild, ElementRef, AfterViewInit, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR }                            from "@angular/forms";

/**
 * Importe l'existant du datepicker Jquery
 */
const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePicker),
  multi: true
};

/**
 * Appel au jquery
 */
declare var jQuery: any;

/**
 * Composent permettant D'initialiser un datepicker de jquery
 */
@Component({
  selector: 'my-datepicker'
    , template: 
    `   
        <link rel="stylesheet" 
            href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
        >
        <input #input type="text" [class]="myClass" required readonly>
    `
    , providers: [DATE_PICKER_VALUE_ACCESSOR],
})
export class DatePicker implements AfterViewInit {
    /**
     * Quand on sélectionne l'input
     */
    private onTouched = () => { };
    /**
     * Quand la valeur de l'input est changée
     * @param value Nouvelle valeur renseignée dans l'input
     */
    private onChange: (value: string) => void = () => {  };
    /**
     * Représente la valeur contenue dans l'input
     */
    @Input() value: string = '';
    /**
     * Représente la surcharge de classe qui sera attribuée à l'input
     */
    @Input() myClass: string = "form-control ng-invalid";
 
    /**
     * Vérifie si la valeur de l'input est vide et va définir sa classe
     * @param value Nouvelle valeur renseignée dans l'input
     */
    checkValueEmpty(value: string){
        this.myClass="form-control ";
        //Si la valeur est 
        return value=='' ? this.myClass+="ng-invalid" : this.myClass+="ng-valid"; 
    }
    
    /**
     * Change la valeur de l'input
     * @param date Nouvelle date en entrée
     */
    writeValue(date: string) {
        this.value = date;
    }

    /**
     * Enregistre les changements de l'input sur changement de valeur
     * @param fn Nouvelle date en entrée
     */
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    /**
     * Enregistre les changements de l'input après avoir sélectionné l'input
     * @param fn Nouvelle date en entrée
     */
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
    
    /**
     * Représente l'élément input
     */
    @ViewChild('input') input: ElementRef;

    /**
     * Fonction motrice qui va permettre d'interragir avec les changements
     * de valeurs
     */
    ngAfterViewInit() {
        /**
         * gfdgd
         */
        jQuery(this.input.nativeElement).datepicker(Object.assign({}, {}, {
            onSelect: (value:any) => {
                //Initialise la variable globale avec la nouvelle valeur
                this.value = value;
                //Notifie du changement avec la nouvelle valeur
                this.onChange(value);
                //Notifie que l'élément a bien été sélectionné
                this.onTouched();
                //Change la couleur de l'input (via sa class)
                this.checkValueEmpty(value);
            }
        })).datepicker('setDate', this.value)
        .datepicker( "option", "dateFormat", "yy-mm-dd" );
        //Afin de ne plus avoir de problème au début du chargement de la page
        document.getElementById('ui-datepicker-div').setAttribute('style', "display:none;" );
    ;
  }
}
