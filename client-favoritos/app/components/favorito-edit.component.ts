import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
 
import { FavoritoService } from '../services/favorito.service';
import { Favorito } from '../models/favorito';

@Component({
    selector: 'favorito-edit',
    templateUrl: 'app/views/favorito-add.html',
    providers: [FavoritoService]
})
 
export class FavoritoEditComponent implements OnInit { 
	public titleSection: string;
	public favorito: Favorito;
	public errorMessage: any;

	constructor(
		private _favoritoService: FavoritoService,
		private _route: ActivatedRoute,
		private _router: Router,
		){
		this.titleSection = "Crear favorito";
	}

	ngOnInit(){
		this.favorito = new Favorito("", "", "", "");
		console.log(this.favorito);
	}


	getFavorito(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._favoritoService.getFavorito(id).subscribe(
				response => {
					this.favorito = response.favorito;

					if(!this.favorito){
						this._router.navigate(['/']); 
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert('Error en la peticion');
					}
				}
			);
		});	
	}	

	public onSubmit(){
		console.log(this.favorito);

		this._favoritoService.addFavorito(this.favorito).subscribe(
			response => {

				if(!response.favorito){
					alert('Error en el Servidor');
				}else{
					this.favorito = response.favorito;
					this._router.navigate(['/marcador', this.favorito._id]);
				}
			},
			error => {
				this.errorMessage = <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion');
				}
			}
		);
	}

}