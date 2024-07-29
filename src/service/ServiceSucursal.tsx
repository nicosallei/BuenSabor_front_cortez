export interface Sucursal {
  id?: number;
  eliminado?: boolean;
  nombre: string;
  horaApertura: string;
  horaCierre: string;
  calle: string;
  cp: string;
  numero: string;
  localidad?: string;
  provincia: string;
  pais: string;
  imagen?: string;
  idEmpresa: string;
  empresa?: Empresa;
  file?: File;
  domicilio?: Domicilio;
}

export interface Empresa {
  id?: number;
  eliminado?: boolean;
  nombre?: string;
  razonSocial?: string;
  cuil?: number;
}
export interface Domicilio {
  id?: number;
  eliminado?: boolean;
  calle?: string;
  numero?: string;
  cp?: number;
}
const API_URL = import.meta.env.VITE_API_URL;
export const getSucursalId = async (id: number): Promise<Sucursal[]> => {
  const endpoint = `${API_URL}/sucursal/lista-todo-sucursal/${id}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  console.log(response);

  const sucursales: Sucursal[] = await response.json();
  return sucursales;
};

export async function crearSucursal(formData: Sucursal, token: string) {
  try {
    const response = await fetch(`${API_URL}/sucursal/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({
        nombre: formData.nombre,
        horaApertura: formData.horaApertura,
        horaCierre: formData.horaCierre,
        imagen: formData.imagen,
        calle: formData.calle,
        cp: formData.cp,
        numero: formData.numero,
        localidad: formData.localidad,
        provincia: formData.provincia,
        pais: formData.pais,
        idEmpresa: formData.idEmpresa,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function eliminarSucursal(id: string, token: string) {
  const urlServer = `${API_URL}/sucursal/${id}`;
  await fetch(urlServer, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
}
export async function activarSucursal(id: string) {
  const urlServer = `${API_URL}/sucursal/reactivate${id}`;
  await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
}
export async function getSucursalXId(id: string) {
  const urlServer = `${API_URL}/sucursal/${id}`;
  console.log(urlServer);
  const response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });

  return await response.json();
}
export async function actualizarSucursal(
  id: number,
  formData: Sucursal,
  token: string
) {
  console.log("estoy en el actualizarSucursal");

  try {
    console.log("estoy en el fetch");

    console.log(formData);

    const urlServer = `${API_URL}/sucursal/${id}`;

    const response = await fetch(urlServer, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({
        id: id,
        imagen: formData.imagen,
        nombre: formData.nombre,
        horaApertura: formData.horaApertura,
        horaCierre: formData.horaCierre,
        calle: formData.calle,
        cp: formData.cp,
        numero: formData.numero,
        localidad: formData.localidad,
        provincia: formData.provincia,
        pais: formData.pais,
        idEmpresa: formData.idEmpresa,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export const getSucursal = async (id: string): Promise<Sucursal[]> => {
  const endpoint = `${API_URL}/sucursal/lista-sucursal/${id}`;
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
export const getSucursalTodas = async (id: string): Promise<Sucursal[]> => {
  const endpoint = `${API_URL}/sucursal/lista-todo-sucursal/${id}`;
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
export const obtenerSucursalesActivas = async (): Promise<Sucursal[]> => {
  const endpoint = `${API_URL}/sucursal/traerSucursales/`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener sucursales activas:", error);
    throw error;
  }
};
