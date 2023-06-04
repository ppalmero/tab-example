import { Material } from "./material";

export class Ticket {
    constructor (   public nroTicket: number,
                    public nombreCliente: string,
                    public dniCliente: string,
                    public telefonoCliente: string,
                    public listaMateriales: Array<Material>){}
}
