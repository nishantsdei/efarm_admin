import { Component, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { CommanService } from '../../shared/services/comman.service';

@Component({
  templateUrl: 'addupdate-category.component.html'
})
export class AddUpdateCategoryComponent {
    public category     = {
        name:'',
        type:'',
        variety: []
    };

    public isLoading       = false;
    public isPageLoading   = true;
    public categoryID: any;
    public oBj = {vname: ''};
    public response:any;
    public type;
    public errMessage = '';
    

    constructor(
        private _router : Router,
        private _activateRouter: ActivatedRoute, 
        private _catgService: CategoryService, 
        private _cookieService: CookieService,
        private _commanService: CommanService,
        private changeDetectorRef: ChangeDetectorRef ) {

        this.categoryID = _activateRouter.snapshot.params['id'];        

        if( this.categoryID ) {
            this._catgService.get(this.categoryID).subscribe( res => {
                this.isPageLoading = false;
                if(res.success) {
                    this.category = res.data;
                   } else {
                    this._commanService.checkAccessToken(res.error);
                }
            }, err => {
                this.isPageLoading = false;
                this._commanService.checkAccessToken(err);
            });
        } else {
            this.isPageLoading = false;
        }
    }

    /*If categoryID exist then will update existing category otherwise will add new category*/
    save() {
        this.isLoading = true;
        if(this.categoryID) {
            this._catgService.update(this.category).subscribe(res => {
                this.response          = res;
                this.isLoading         = false;
                this._cookieService.put('categoryAlert', 'Updated successfully.');
                this._router.navigate(['/category/list']);
            },err => {
                this.isLoading = false;
            })
        } else {
            this._catgService.add(this.category).subscribe(res => {
                this.response          = res;
                this.isLoading         = false;
                this._cookieService.put('categoryAlert', 'Added successfully.');
                this._router.navigate(['/category/list']);
            },err => {
                this.isLoading = false;
            });
            
        }   
    }

    addEelement(){
     if(!this.oBj.vname){
         this.errMessage = "Variety is required." ;
         return false;
     }
        let index = this.category.variety.indexOf(this.oBj.vname);

        if(index >=0 ) {
            
           this.errMessage = "Already exists." ;
           return false;
           
                } else {

                    this.category.variety.push(this.oBj.vname);
                    this.oBj.vname = "";
                    this.errMessage = "" ;
                    return true;

                }      
    }

    removeEelement(index){
        this.category.variety.splice(index,1);
    }






}
