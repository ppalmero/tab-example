import { Compras } from "./compras"
import { Materiales } from "./materiales"

export interface TicketCompra {
    idItemCompra: number,
    cantidadItemCompra: number,
    incrementoPrecioItemCompra: number,
    precioEspecialItemCompra: number,
    compra: Compras,
    material: Materiales,
}
