export class FileItem {
    public archivo: File;
    public nombre: string;
    public url: string;
    public subiendo: boolean;
    public progreso: number;

    constructor(archivo: File) {
        this.archivo = archivo;
        this.nombre = archivo.name,
        this.subiendo = false;
        this.progreso = 0;
    }
}