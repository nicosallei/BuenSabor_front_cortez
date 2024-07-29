export interface Imagen {
  id: number;
  url: string;
}

export interface unidadMedida {
  id: number;
  denominacion: string;
}
export interface sucursal {
  id: number;
  nombre: string;
}
export interface ArticuloInsumo {
  id: number;
  denominacion: string;
  codigo: string;
  precioCompra: number;
  precioVenta: number;
  stockActual: number;
  stockMaximo: number;
  esParaElaborar: boolean;
  imagenes: Imagen[];
  unidadMedida: unidadMedida;
}

export interface ArticuloManufacturadoDetalle {
  id: number;
  cantidad: number;
  articuloInsumo: ArticuloInsumo;
}

export interface ArticuloProducto {
  id: number;
  denominacion: string;
  descripcion?: string;
  codigo: string;
  precioVenta: number;
  imagenes: Imagen[];
  unidadMedida: unidadMedida;
  tiempoEstimadoMinutos?: number;
  preparacion?: string;
  articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[];
  sucursal: sucursal;
  categoria: Categoria;
}
interface Categoria {
  id: number;
  denominacion: string;
}
const API_URL = import.meta.env.VITE_API_URL;
export async function crearManufacturado(
  formData: ArticuloProducto,
  token: string
) {
  try {
    const urlServer = `${API_URL}/articulos/manufacturados/`;
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({
        codigo: "M-" + formData.codigo,
        categoria: {
          id: formData.categoria.id,
        },
        denominacion: formData.denominacion,
        descripcion: formData.descripcion || "sin descripcion",
        precioVenta: formData.precioVenta,
        imagenes: formData.imagenes,
        unidadMedida: formData.unidadMedida,
        tiempoEstimadoMinutos: formData.tiempoEstimadoMinutos || 0,
        preparacion: formData.preparacion || "sin preparacion",
        sucursal: formData.sucursal,
        articuloManufacturadoDetalles: formData.articuloManufacturadoDetalles,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error crear producto manufacturado"
      );
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error al crear producto manufacturado:", error.message);
    throw error;
  }
}

export async function getProductoXSucursal(id: string) {
  const urlServer = `${API_URL}/local/articulo/manufacturado/sucursal/${id}`;
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

export const getProductoXId = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/articulos/manufacturados/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los detalles de la promoción");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getProductoXIdBase = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/articulos/manufacturados/imagenBase64/${id}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener los detalles de la promoción");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export async function modificarProductoId(
  formData: any,
  id: number,
  token: string
) {
  try {
    const urlServer = `${API_URL}/articulos/manufacturados/${id}`;
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
        codigo: formData.codigo,
        denominacion: formData.denominacion,
        descripcion: formData.descripcion || "sin descripcion",
        precioVenta: formData.precioVenta,
        imagenes: formData.imagenes,
        unidadMedida: formData.unidadMedida,
        tiempoEstimadoMinutos: formData.tiempoEstimadoMinutos || 0,
        preparacion: formData.preparacion || "sin preparacion",
        sucursal: formData.sucursal,
        articuloManufacturadoDetalles: formData.articuloManufacturadoDetalles,
        categoria: formData.categoria,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al editar el producto manufacturado"
      );
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error al editar el  Producto Manufacturado:", error.message);
    throw error;
  }
}
export async function deleteProductoXId(id: string, token: string) {
  const urlServer = `${API_URL}/articulos/manufacturados/${id}`;
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
export async function activarProductoXId(id: string, token: string) {
  const urlServer = `${API_URL}/articulos/manufacturados/reactivate/${id}`;
  await fetch(urlServer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
}

export async function getCategoria(id: number) {
  const urlServer = `${API_URL}/local/traerTodo/${id}`;
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
