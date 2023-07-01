import { Clientes } from "./clientes";
import { Items } from "./items";

export interface Compras {
    idCompra: number,
    precioTotalCompra: number,
    estado: string,
    fechaCompra: number;
    cliente: Clientes,
    items?: Items[],
}
