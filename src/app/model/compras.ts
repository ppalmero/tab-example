import { Clientes } from "./clientes";
import { Items } from "./items";

export interface Compras {
    idCompra: number,
    precioTotalCompra: number,
    estado: string,
    cliente: Clientes,
    items?: Items[],
}
