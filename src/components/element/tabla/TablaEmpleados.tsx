import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Switch, Table, Popconfirm } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Empleado, getEmpleados } from "../../../service/EmpleadoService";
import FormularioEmpleadoModificar from "../formularios/FormularioEmpleadoModificar";

import userImage from "../../../assets/user_imagen.jpg";
import { useAuth0 } from "@auth0/auth0-react";

type DataIndex = keyof Empleado;
type TablaEmpleadosProps = {
  sucursalId: string;
  reload: boolean;
};
const URL_IMG = import.meta.env.VITE_URL_IMG;
const API_URL = import.meta.env.VITE_API_URL;
const TablaEmpleados: React.FC<TablaEmpleadosProps> = ({
  sucursalId,
  reload,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<Empleado[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    fetchData();
  }, [sucursalId, reload]);

  const fetchData = async () => {
    try {
      const empleadosData = await getEmpleados(sucursalId);
      setData(empleadosData);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Empleado> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters || (() => {}))}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleEdit = (record: Empleado) => {
    if (record.id) {
      setSelectedEmpleado(record);
      setIsModalVisible(true);
    } else {
      console.error("El ID del empleado es nulo o no está definido.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/empleado/eliminar/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el empleado");
      }

      const updatedData = await getEmpleados(sucursalId);
      setData(updatedData);
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
    }
  };

  const handleModalClose = async () => {
    setIsModalVisible(false);
    setSelectedEmpleado(null);

    try {
      const updatedData = await getEmpleados(sucursalId);
      setData(updatedData);
    } catch (error) {
      console.error("Error al obtener los empleados actualizados:", error);
    }
  };

  const columns: TableColumnsType<Empleado> = [
    {
      title: "Imagen",
      dataIndex: "imagen",
      key: "imagen",
      render: (text) => {
        const defaultImage = `${URL_IMG}/images/default.jpg`;
        const imageUrl = text
          ? `${URL_IMG}/images/${text.split("\\").pop()}`
          : userImage || defaultImage;
        return <img src={imageUrl} style={{ width: "50px" }} alt="Empleado" />;
      },
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      ...getColumnSearchProps("nombre"),
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      ...getColumnSearchProps("apellido"),
      sorter: (a, b) => a.apellido.localeCompare(b.apellido),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      ...getColumnSearchProps("telefono"),
      sorter: (a, b) => a.telefono.localeCompare(b.telefono),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol",
      ...getColumnSearchProps("rol"),
      sorter: (a, b) => a.rol.localeCompare(b.rol),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Acción",
      key: "action",
      render: (_text: string, record: Empleado) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EditOutlined />
          </a>
          <Popconfirm
            title="¿Está seguro de eliminar este empleado?"
            onConfirm={() => handleDelete(record.id.toString())}
            okText="Sí"
            cancelText="No"
          >
            <Switch
              checked={!record.eliminado}
              // onChange={(checked) => handleSwitchChange(checked, record)}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        pagination={{
          pageSizeOptions: ["5", "10", "20", "30", "50", "100"],
          showSizeChanger: true,
        }}
      />
      {isModalVisible && selectedEmpleado && (
        <FormularioEmpleadoModificar
          visible={isModalVisible}
          onClose={handleModalClose}
          onSubmit={(values) => {
            console.log("Submitted values:", values);
            handleModalClose();
          }}
          initialValues={selectedEmpleado}
          sucursalId={sucursalId}
          empleadoId={selectedEmpleado.id.toString()}
        />
      )}
    </>
  );
};

export default TablaEmpleados;
