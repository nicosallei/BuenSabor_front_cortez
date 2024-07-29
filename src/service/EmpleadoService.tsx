export interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
  rol: string;
  imagen: string;
  email: string;
  sucursales: Sucursal[];
  eliminado: boolean;
}
export interface Sucursal {
  id?: number;
  nombre?: string;
  eliminado?: boolean;
}
const API_URL = import.meta.env.VITE_API_URL;
export const getEmpleados = async (sucursalId: string): Promise<Empleado[]> => {
  const response = await fetch(`${API_URL}/empleado/sucursal/${sucursalId}`);
  if (!response.ok) {
    throw new Error("Error al obtener los empleados");
  }
  return response.json();
};
