import { Material } from "./material";

export class Ticket {
    constructor (   public nroTicket: number,
                    public nombreCliente: string,
                    public ciudadCliente: string,
                    public observaciones: string,
                    public listaMateriales: Array<Material>){}
}
