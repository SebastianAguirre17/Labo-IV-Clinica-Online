import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item.class';

@Directive({
    selector: '[appNgDropFile]'
})
export class NgDropFileDirective {

    @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
    @Input() archivos: FileItem[] = [];

    constructor() { }

    @HostListener('dragover', ['$event'])
    public onDragEnter(event: any) {
        this.mouseSobre.emit(true);
        this._prevenirDetener(event);
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(event: any) {
        this.mouseSobre.emit(false);
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: any) {
        
        const transferencia = this._getTransferencia(event);
        if(!transferencia)
            return;
        
        this._extraerArchivos(transferencia.files);
        this._prevenirDetener(event);
        this.mouseSobre.emit(false);
    }

    private _getTransferencia(event: any) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }

    private _extraerArchivos(archivosLista: FileList) {
        for(const propieadad in Object.getOwnPropertyNames(archivosLista)) {
            const archivoTemporal = archivosLista[propieadad];
            if(this._archivoPuedeSerCargado(archivoTemporal) && this.archivos.length < 2) {
                const nuevoArchivo = new FileItem(archivoTemporal);
                this.archivos.push(nuevoArchivo);
            }
        }
    }

    // Validaciones
    private _archivoPuedeSerCargado(archivo: File): boolean {
        if(!this._archivoYaFueDropeado(archivo.name) && this._esImagen(archivo.type))
            return true;
        return false;
    }

    private _prevenirDetener(event: any) {
        event.preventDefault();
        event.stopPropagation();
    }
        
    private _archivoYaFueDropeado(nombreArchivo: string): boolean {
        for(const archivo of this.archivos) {
            if(archivo.nombre === nombreArchivo) {
                console.log('Archivo existe');
                return true;
            }
        }
        return false;
    }

    private _esImagen(tipoArchivo: string): boolean {
        return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
    }
}