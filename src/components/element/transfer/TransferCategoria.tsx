import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { useSelector } from "react-redux";

interface Sucursal {
  id: string;
  nombre: string;
}

interface Props {
  setSelectedSucursales: (selectedSucs: string[]) => void;
}
const API_URL = import.meta.env.VITE_API_URL;
const AgregarSucursalACatgoria: React.FC<Props> = ({
  setSelectedSucursales,
}) => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const { empresa } = useSelector((state: any) => state);

  useEffect(() => {
    if (empresa && empresa.idEmpresa) {
      fetch(`${API_URL}/sucursal/lista-sucursal/${empresa.idEmpresa}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData: Sucursal[] = data.map((sucursal: any) => ({
            id: sucursal.id,
            nombre: sucursal.nombre,
          }));
          setSucursales(formattedData);
        })
        .catch((error) => console.error("Error fetching sucursales:", error));
    }
  }, [empresa]);

  const handleChange = (selectedSucs: string[]) => {
    console.log("Selected:", selectedSucs);
    setSelectedSucursales(selectedSucs);
  };

  return (
    <Checkbox.Group onChange={handleChange}>
      {sucursales.map((sucursal) => (
        <Checkbox key={sucursal.id} value={sucursal.id}>
          {sucursal.nombre}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};

export default AgregarSucursalACatgoria;
