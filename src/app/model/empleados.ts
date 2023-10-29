import { Sucursales } from "./sucursales";

export interface Empleados {
    idEmpleado: number,
    dniEmpleado: number,
    nombreEmpleado: string,
    apellidoEmpleado: string,
    telefonoEmpleado: string,
    usuarioEmpleado: string,
    contraseniaEmpleado: string,
    permisoEmpleado: string,
    sucursal?: Sucursales
}
