import * as CryptoJS from "crypto-js";
export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  eliminado: boolean;
  imagen: string;
  fechaNacimiento: string;
  //domicilios: Domicilio[];
}
const API_URL = import.meta.env.VITE_API_URL;
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await fetch(`${API_URL}/cliente/listar`);
  if (!response.ok) {
    throw new Error("Error al obtener los CLIENTES");
  }
  return response.json();
};

export const actualizarPasswordCliente = async (
  cambioPasswordDto: { id: number; nuevaPassword: string; username: string },
  token: string
): Promise<void> => {
  try {
    const encryptedPasswordNueva = CryptoJS.SHA256(
      cambioPasswordDto.nuevaPassword
    ).toString();
    const body = JSON.stringify({
      id: cambioPasswordDto.id,
      nuevaPassword: encryptedPasswordNueva,
      username: cambioPasswordDto.username,
    });

    const response = await fetch(
      `${API_URL}/usuario/cliente/actualizarPassword/${cambioPasswordDto.id}`,
      {
        method: "PUT", // Método HTTP
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Indica el tipo de contenido que se está enviando
        },
        body: body, // Convierte la nueva contraseña a una cadena JSON
      }
    );

    if (!response.ok) {
      // Si el servidor envía un mensaje de error en el cuerpo de la respuesta
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cambiar la contraseña");
    }
  } catch (error: any) {
    console.error("Error al cambiar la contraseña:", error.message);
    throw error;
  }
};

export const cambiarPasswordCliente = async (
  cambioPasswordDto: {
    username: string;
    passwordActual: string;
    nuevaPassword: string;
  },
  token: string
): Promise<void> => {
  try {
    const encryptedPasswordActual = CryptoJS.SHA256(
      cambioPasswordDto.passwordActual
    ).toString();
    const encryptedPasswordNueva = CryptoJS.SHA256(
      cambioPasswordDto.nuevaPassword
    ).toString();
    const body = JSON.stringify({
      username: cambioPasswordDto.username,
      passwordActual: encryptedPasswordActual,
      nuevaPassword: encryptedPasswordNueva,
    });

    const response = await fetch(
      `${API_URL}/usuario/cambiar-password-cliente`,
      {
        method: "POST", // Asegúrate de usar el método correcto (POST para este caso)
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }
    );

    if (!response.ok) {
      // Si el servidor envía un mensaje de error en el cuerpo de la respuesta
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cambiar la contraseña");
    }
  } catch (error: any) {
    console.error("Error al cambiar la contraseña:", error.message);
    throw error; // Re-lanzar el error para manejarlo en otra parte de tu aplicación
  }
};
