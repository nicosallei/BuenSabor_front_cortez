import { Button, Switch, Table, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import {
  cargarUnidadMedida,
  actualizarUnidadMedida,
  toggleActiveUnidadMedida,
  traerTodoUnidadMedida,
} from "../../../service/UnidadMedidaService";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

interface UnidadMedida {
  id: number;
  denominacion: string;
  eliminado: boolean;
}

const UnidadMedida: React.FC = () => {
  const [unidades, setUnidades] = useState<UnidadMedida[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [unidadSeleccionada, setUnidadSeleccionada] =
    useState<UnidadMedida | null>(null);
  const [form] = Form.useForm();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    traerTodoUnidadMedida().then(setUnidades);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await traerTodoUnidadMedida();
      console.log("Datos recibidos:", data);
      setUnidades(data);
    } catch (error) {
      console.error("Error al obtener los insumos:", error);
    }
  };

  const abrirModal = (unidad?: UnidadMedida) => {
    setUnidadSeleccionada(unidad || null);
    form.setFieldsValue(unidad || { denominacion: "", eliminado: false });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setUnidadSeleccionada(null);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const token = await getAccessTokenSilently();
      if (unidadSeleccionada) {
        await actualizarUnidadMedida(unidadSeleccionada.id, values, token);
      } else {
        await cargarUnidadMedida(values, token);
      }
      cerrarModal();
      traerTodoUnidadMedida().then(setUnidades);
    } catch (error) {
      toast.error("Debe ingresar un nombre o el nombre ya existe.");
    }
  };

  const handleToggleActive = async (id: number, checked: boolean) => {
    const token = await getAccessTokenSilently();
    await toggleActiveUnidadMedida(id, token);

    const updatedUnidades = unidades.map((unidad) =>
      unidad.id === id ? { ...unidad, eliminado: !checked } : unidad
    );
    setUnidades(updatedUnidades);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "denominacion",
      key: "denominacion",
    },
    {
      title: "Modificar",
      key: "modificar",
      render: (_text: string, record: UnidadMedida) => (
        <Button onClick={() => abrirModal(record)} disabled={record.eliminado}>
          Modificar
        </Button>
      ),
    },
    {
      title: "Habilitado",
      key: "habilitado",
      render: (_text: string, record: UnidadMedida) => (
        <Switch
          checked={!record.eliminado}
          onChange={(checked) => handleToggleActive(record.id, checked)}
        />
      ),
    },
  ];

  return (
    <div>
      <h1>Unidad de Medida</h1>
      <Button
        type="primary"
        style={{ float: "right", marginBottom: "10px" }}
        onClick={() => abrirModal()}
      >
        Agregar Unidad de Medida
      </Button>
      <Table
        dataSource={unidades}
        columns={columns}
        rowKey="id"
        rowClassName={(record) => (record.eliminado ? "disabled-row" : "")}
      />
      <Modal visible={modalVisible} onCancel={cerrarModal} onOk={handleSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre"
            name="denominacion"
            rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UnidadMedida;
