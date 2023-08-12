import { Clientes } from "./clientes";
import { Empleados } from "./empleados";
import { Items } from "./items";
import { Sucursales } from "./sucursales";

export interface Compras {
    idCompra: number,
    precioTotalCompra: number,
    estado: string,
    fechaCompra: number;
    fleteCompra: number,
    fleteValorCompra: number,
    incrementoCompra: number,
    cliente: Clientes,
    items?: Items[],
    empleado: Empleados,
    sucursal: Sucursales
}
