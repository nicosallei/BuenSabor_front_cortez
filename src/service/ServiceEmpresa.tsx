import { Empresa } from "./ServiceSucursal";

export interface Empresas {
  id?: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  eliminado?: boolean;
  imagen?: string;
}
const API_URL = import.meta.env.VITE_API_URL;
export const getEmpresas = async (): Promise<Empresas[]> => {
  const endpoint = `${API_URL}/empresa/traer-todo/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  console.log(response);
  return await response.json();
};
export const getTodasEmpresas = async (): Promise<Empresas[]> => {
  const endpoint = `${API_URL}/empresa/traer-todo/eliminado/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  console.log(response);
  return await response.json();
};

export async function crearEmpresa(formData: Empresas, token: string) {
  try {
    const urlServer = `${API_URL}/empresa/`;
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({
        nombre: formData.nombre,
        razonSocial: formData.razonSocial,
        cuil: formData.cuil,
        imagen: formData.imagen,
      }),
    });

    if (!response.ok) {
      // throw new Error(HTTP error! status: ${response.status});
    }
    return await response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
}

export const actualizarEmpresa = async (
  id: number,
  empresa: Empresa,
  token: string
): Promise<Response> => {
  const endpoint = `${API_URL}/empresa/${id}`;
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(empresa),
  });

  return response;
};
export const eliminarEmpresa = async (id: number): Promise<Response> => {
  const endpoint = `${API_URL}/empresa/${id}`;
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    },
  });

  return response;
};
