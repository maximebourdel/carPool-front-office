var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { forwardRef, Input, Output, EventEmitter, ViewChild, ElementRef, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
var DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DatePicker; }),
    multi: true
};
var DatePicker = (function () {
    function DatePicker() {
        this.onTouched = function () { };
        this.onChange = function () { };
        this.myNgClass = '';
        this.required = false;
        this.options = {};
        this.value = '';
        this.dateChange = new EventEmitter();
    }
    DatePicker.prototype.writeValue = function (date) {
        this.value = date;
        //jQuery(this.input.nativeElement).datepicker('setDate', date);
    };
    DatePicker.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DatePicker.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DatePicker.prototype.ngAfterViewInit = function () {
        var _this = this;
        jQuery(this.input.nativeElement).datepicker(Object.assign({}, this.options, {
            onSelect: function (value) {
                _this.value = value;
                _this.onChange(value);
                _this.onTouched();
                _this.dateChange.next(value);
            }
        })).datepicker('setDate', this.value)
            .datepicker("option", "dateFormat", "yy-mm-dd");
        //Afin de ne plus avoir de problème au début du chargement de la page
        document.getElementById('ui-datepicker-div').setAttribute('style', "display:none;");
        ;
    };
    return DatePicker;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], DatePicker.prototype, "myNgClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DatePicker.prototype, "required", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePicker.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DatePicker.prototype, "value", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DatePicker.prototype, "dateChange", void 0);
__decorate([
    ViewChild('input'),
    __metadata("design:type", ElementRef)
], DatePicker.prototype, "input", void 0);
DatePicker = __decorate([
    Component({
        selector: 'my-datepicker',
        template: "   \n                <link rel=\"stylesheet\" href=\"https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css\">\n                <input #input type=\"text\" [ngClass]=\"myNgClass\"  ngRequired=\"required\">\n            ",
        providers: [DATE_PICKER_VALUE_ACCESSOR],
    })
], DatePicker);
export { DatePicker };
//# sourceMappingURL=date-picker.component.js.map