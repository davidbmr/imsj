import React, { useState } from "react";
import axios from "axios";
import TableComponent from "../../components/TableComponent/TableComponent";
import styles from "./Dashboard.module.css";
import DetailsView from "../../components/DetailsView/DetailsView";
import { FaSearch } from "react-icons/fa";

const Dashboard: React.FC = () => {
  // const [activeTab, setActiveTab] = useState("myProject");
  const [selectedData, setSelectedData] = useState<{ [key: string]: any } | null>(null);
  const [fechaDesde, setFechaDesde] = useState('2024-04-01');
  const [fechaHasta, setFechaHasta] = useState('2024-04-28');
  const [data, setData] = useState<any[]>([]);

  const columns = [
    { campo: "tipoDocumento", label: "Tipo de Documento" },
    { campo: "paisDocumento", label: "País Documento" },
    { campo: "documento", label: "Documento" },
    { campo: "nombreCompleto", label: "Nombre Completo" },
    { campo: "certificadoDesde", label: "Certificado Desde" },
  ];

  const handleViewClick = (row: { [key: string]: any }) => {
    setSelectedData(row);
  };

  const handleBackClick = () => {
    setSelectedData(null);
  };

  const renderButton = (row: { [key: string]: any }) => (
    <button className={styles.customButton} onClick={() => handleViewClick(row)}>
      <FaSearch size={20} />
    </button>
  );

  const callSoapService = async () => {
    const url = 'https://scs.bps.gub.uy:443/Salud/SENF/IntegracionHCENSNCL/ws/v1/wsCertOrganizaciones';
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://bps.gub.uy/senf/wsCertOrganizaciones/v1">
        <soapenv:Header/>
        <soapenv:Body>
          <v1:obtenerCertificacionesOrganizacion>
            <paramObtenerCertificacionesOrganizacion>
              <nroOrganizacion>0000003500665</nroOrganizacion>
              <idUsuario>IMSJ_P</idUsuario>
              <fechaDesde>${fechaDesde}</fechaDesde>
              <fechaHasta>${fechaHasta}</fechaHasta>
            </paramObtenerCertificacionesOrganizacion>
          </v1:obtenerCertificacionesOrganizacion>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': 'http://bps.gub.uy/senf/wsCertOrganizaciones/v1/obtenerCertificacionesOrganizacion',
      'Authorization': 'Basic ' + btoa('imsj_p:Mn22tp16') // Reemplaza 'your_password' con la contraseña real
    };

    try {
      const { data } = await axios.post(url, soapRequest, { headers });
      console.log(data);
      // Aquí necesitas procesar la respuesta SOAP y actualizar el estado `data` con los resultados adecuados
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const result = xmlDoc.getElementsByTagName("resultObtenerCertificacionesOrganizacion")[0];
      const certificados = result.getElementsByTagName("certificaciones");
      
      const processedData = Array.from(certificados).map(cert => ({
        tipoDocumento: cert.getElementsByTagName("tipoDocumento")[0].textContent,
        paisDocumento: cert.getElementsByTagName("paisDocumento")[0].textContent,
        documento: cert.getElementsByTagName("documento")[0].textContent,
        nombreCompleto: cert.getElementsByTagName("nombreCompleto")[0].textContent,
        certificadoDesde: cert.getElementsByTagName("certificadoDesde")[0].textContent,
      }));
      
      setData(processedData);
    } catch (error) {
      console.error('Error making SOAP request:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Obtener Certificados de Trabajadores</h1>
      <hr />
      <div>
        <label>
          Fecha Desde:
          <input type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
        </label>
        <label>
          Fecha Hasta:
          <input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
        </label>
        <button onClick={callSoapService}>Buscar</button>
      </div>
      {selectedData ? (
        <DetailsView data={selectedData} onBack={handleBackClick} />
      ) : (
        <>
          <TableComponent 
            columns={columns} 
            data={data} 
            renderButton={renderButton} 
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
