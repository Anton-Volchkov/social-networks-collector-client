"use strict";(self.webpackChunkSNC=self.webpackChunkSNC||[]).push([[592],{9878:(m,d,l)=>{l.d(d,{x:()=>h});var i=l(3075),u=l(3411),n=l(5e3),c=l(6696);let h=(()=>{class a extends u.V{constructor(t,e){super(),this.route=t,this.fb=e,this.submitted=!1,this.isClosed=!1,this.isReadonly=!1,this.detailsForm=new i.cw({})}get f(){return this.detailsForm.controls}getFormValue(t){var e;return null===(e=this.detailsForm.get(t))||void 0===e?void 0:e.value}setCaretToPosition(t,e){t.nativeElement.setSelectionRange&&e&&setTimeout(()=>{t.nativeElement.focus(),t.nativeElement.setSelectionRange(e,e)})}setFormValue(t,e){var s;return null===(s=this.detailsForm.get(t))||void 0===s?void 0:s.patchValue(e)}validateAllFormFields(t){return!(!t||!t.controls)&&(Object.keys(t.controls).forEach(e=>{const s=t.get(e);s instanceof i.NI?s.markAsTouched({onlySelf:!0}):s instanceof i.cw&&this.validateAllFormFields(s)}),this.logValidationErrors(t),t.valid)}preValidate(t){t&&t()}save(t,e=!0){this.preValidate(t),this.validate()&&this.saveInternal()}resetForm(t=!1){this.detailsForm.reset(),this.submitted=!t}resetSubmit(){this.submitted=!1}validate(){return this.submitted=!0,this.validateAllFormFields(this.detailsForm)&&this.detailsForm.valid}logValidationErrors(t){!t||!t.controls||Object.keys(t.controls).forEach(e=>{var s;const o=null===(s=t.get(e))||void 0===s?void 0:s.errors;null!=o&&Object.keys(o).forEach(()=>{})})}}return a.\u0275fac=function(t){return new(t||a)(n.Y36(c.gz),n.Y36(i.qu))},a.\u0275cmp=n.Xpm({type:a,selectors:[["ng-component"]],inputs:{submitted:"submitted"},outputs:{submitted:"submitted"},features:[n.qOj],decls:0,vars:0,template:function(t,e){},encapsulation:2}),a})()}}]);