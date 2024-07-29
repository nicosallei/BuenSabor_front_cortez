export interface Pais {
  id?: string;
  nombre: string;
}
export interface Provincia {
  id?: string;
  nombre: string;
  pais: Pais;
}
export interface Localidad {
  id?: string;
  nombre: string;
  provincia: Provincia;
}
const API_URL = import.meta.env.VITE_API_URL;
export const getPais = async (): Promise<any> => {
  const endpoint = `${API_URL}/pais/traer-todo/`;
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
};

export const getProvincia = async (): Promise<any> => {
  const endpoint = `${API_URL}/provincia/traer-todo/`;
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
};
export const getLocalidad = async (): Promise<any> => {
  const endpoint = `${API_URL}/localidad/traer-todo/`;
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
};

export const getPaisPorId = async (id: string): Promise<any> => {
  const endpoint = `${API_URL}/pais/${id}`;
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
};

export const getProvinciaPorId = async (id: string): Promise<any> => {
  const endpoint = `${API_URL}/provincia/${id}`;
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
};

export const getLocalidadPorId = async (id: number): Promise<any> => {
  const endpoint = `${API_URL}/localidad/${id}`;
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
};

export const getLocalidadesByProvincia = async (
  provinciaId: number
): Promise<Localidad[]> => {
  const response = await fetch(
    `${API_URL}/localidad/provincia/${provinciaId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
