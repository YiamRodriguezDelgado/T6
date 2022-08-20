import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { WarehousePackage } from 'src/app/models/warehouse-package';
import { User } from 'src/app/models/users';
import { PackagesService } from 'src/app/services/packages.service';
import Swal from 'sweetalert2';
import { ClientsDataService } from 'src/app/services/clients-data.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-packages-admin-dialog',
  templateUrl: './packages-admin-dialog.component.html',
  styleUrls: ['./packages-admin-dialog.component.scss']
})

export class PackagesAdminDialogComponent implements OnInit {
  warehousePackageForm: FormGroup;
  onCreate: boolean = true;
  client_name: FormControl = new FormControl("", [Validators.required]);
  tracking_number: FormControl = new FormControl("", [Validators.required]);
  pounds: FormControl = new FormControl("", [Validators.required]);
  price: FormControl = new FormControl("");
  arrival_date: FormControl = new FormControl("", [Validators.required]);
  images: FormControl = new FormControl([])
  imagesFile =[];
  upload=[];
  selectedFile: ImageSnippet
  private warehouseCrudSubscription: Subscription;
  colectionImages : string[] = [];
  clients: User[]

  imageForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });
 
  private warehousePackage: WarehousePackage
  constructor(
    private dialogRef: MatDialogRef<PackagesAdminDialogComponent>,
    private _warehousePackageCrudService: PackagesService,
    private _clientCrudService: ClientsDataService,
    @Inject(MAT_DIALOG_DATA) private data,
  ) { }

  get formValue(){
    return this.imageForm.controls;
  }

  ngOnInit(): void {
    if (this.data) {
      this.onCreate = false
      this.warehousePackage = this.data.object as WarehousePackage
      this.client_name.setValue(this.warehousePackage.client_name)
      this.tracking_number.setValue(this.warehousePackage.tracking_number)
      this.pounds.setValue(this.warehousePackage.pounds)
      this.price.setValue(this.warehousePackage.price)
      this.arrival_date.setValue(this.warehousePackage.arrival_date)
    }else {
      this.getClients()
    }
    this.warehousePackageForm = new FormGroup({
      client_name: this.client_name,
      tracking_number: this.tracking_number,
      pounds: this.pounds,
      price: this.price,
      arrival_date: this.arrival_date,
      images: this.images
    })
  }

  getClients() {
    this._clientCrudService.getClientsData().subscribe((result) => {
      console.log(result)
      this.clients = result
    })
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = (event:any) => {
            this.colectionImages.push(event.target.result); 
            this.patchValues();
          }
          reader.readAsDataURL(event.target.files[i]);
        }
        this.upload.push(event.target.files[0])
        console.log(this.upload)
    }
  }
  patchValues(){
    this.imageForm.patchValue({
       fileSource: this.colectionImages
    });
  }

  // Remove Image
  removeImage(url:any){
    let position=this.colectionImages.indexOf(url)
    this.colectionImages = this.colectionImages.filter(img => (img != url))
    this.patchValues()
    console.log(this.upload);
    this.upload.splice(position,1)
    console.log(this.upload);
  }
  changeUser(user:any){
    console.log(user);
    this.client_name.setValue(user);
  }
  accept() {
    this.warehousePackageForm.markAllAsTouched()
    if (this.arrival_date.valid) {
      const formData = new FormData()
      if (this.colectionImages){
        this.images.setValue(this.imagesFile)
        for(var i=0;i<this.upload.length;i++){
          formData.append("images", this.upload[i])
        }
      }
      console.log(JSON.stringify(this.warehousePackageForm.value));
      formData.append("warehouseForm", JSON.stringify(this.warehousePackageForm.value))
      /*if (this.onCreate) {
        this.warehouseCrudSubscription = this._warehousePackageCrudService.createWarehousePackage(formData).subscribe(
          (result) => {
            
        },
          (error) => {

          }
         )
    } else {
      this.warehouseCrudSubscription = this._warehousePackageCrudService.updateWarehousePackage(this.warehousePackageForm.value).subscribe(
        (result) => {
          Swal.fire(
            'Eliminado!',
            'success',
            
          )
        },
        (error) => {
          Swal.fire({ 
            title: 'Error', 
            text: 'No se pudo actualizar el paquete', 
            confirmButtonColor: '#FEBE10', 
            icon: 'error', 
            confirmButtonText: 'OK'});
        })
      }
    */}
}
cancel(){
  this.dialogRef.close()
}

}
