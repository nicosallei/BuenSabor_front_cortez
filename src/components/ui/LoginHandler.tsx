import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import EmpleadoService from "../../service/auth0Service/EmpleadoService";
import SucursalService from "../../service/auth0Service/SucursalService";
import { RolEmpleado } from "../../types/usuario/Usuario";
import ClienteService from "../../service/auth0Service/ClienteService";

const LoginHandler: React.FC = () => {
  const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const navigate = useNavigate();
  const empleadoService = new EmpleadoService();
  const clienteService = new ClienteService();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsuario = async () => {
      if (isAuthenticated && user?.email) {
        try {
          localStorage.removeItem("rol");
          localStorage.removeItem("email");
          localStorage.removeItem("auth_token");
          localStorage.removeItem("id");
          const sucursalService = new SucursalService();
          const token = await getAccessTokenSilently();
          localStorage.setItem("auth_token", token);

          const empleado = await empleadoService.getEmpleadoByEmail(
            `${url}`,
            user.email,
            token
          );
          console.log("--------------------------->" + empleado);

          if (empleado) {
            if (empleado.rol === RolEmpleado.ADMINISTRADOR) {
              localStorage.removeItem("email");
              localStorage.removeItem("sucursal_id");
              localStorage.removeItem("selectedSucursalNombre");
              localStorage.removeItem("empresa_id");
              localStorage.removeItem("id");
              localStorage.setItem("rol", empleado.rol);
              localStorage.setItem("id", empleado.id.toString());
              localStorage.setItem("email", empleado.email);
              navigate("/unidadMedida");
            } else if (
              empleado.rol === RolEmpleado.EMPLEADO_COCINA ||
              empleado.rol === RolEmpleado.EMPLEADO_REPARTIDOR ||
              empleado.rol == RolEmpleado.EMPLEADO_CAJA
            ) {
              localStorage.setItem("rol", empleado.rol);
              localStorage.setItem(
                "sucursal_id",
                empleado.sucursal.id.toString()
              );
              localStorage.setItem("id", empleado.id.toString());
              localStorage.setItem(
                "empresa_id",
                empleado.sucursal.empresa.id.toString()
              );
              localStorage.setItem("email", empleado.email);

              const sucursal = await sucursalService.getById(
                `${url}`,
                empleado.sucursal.id,
                token
              );

              localStorage.setItem("selectedSucursalNombre", sucursal.nombre);
              localStorage.setItem(
                "selectedEmpresaNombre",
                empleado.sucursal.empresa.nombre
              );
              navigate("/productos");
            }
          } else {
            const cliente = await clienteService.getClienteByEmail(
              `${url}`,
              user.email,
              token
            );

            if (cliente) {
              localStorage.removeItem("sucursal_id");
              localStorage.removeItem("selectedSucursalNombre");
              localStorage.removeItem("empresa_id");
              localStorage.removeItem("id");

              localStorage.setItem("email", cliente.email);
              localStorage.setItem("rol", cliente.rol);
              localStorage.setItem("id", cliente.id.toString()); // Asumiendo que quieres marcar el rol en localStorage
              // Aquí puedes agregar más lógica específica para clientes
              navigate("/perfil"); // Redirige a la ruta específica para clientes
            } else {
              throw new Error("Usuario no encontrado");
            }
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          logout(); // Redirige al login de Auth0
        }
      } else {
        navigate("/");
      }
    };

    fetchUsuario();
  }, [isAuthenticated, user, getAccessTokenSilently, navigate, logout]);

  return <div>Cargando...</div>;
};

export default LoginHandler;
