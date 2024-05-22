import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";


import styles from "./DetailsView.module.css";
import InputField from "../InputField/InputField";
import RadioInput from "../RadioInput/RadioInput";

interface DetailsViewProps {
  data: { [key: string]: any };
  onBack: () => void;
}

const DetailsView: React.FC<DetailsViewProps> = ({ data, onBack }) => {
  return (
    <div className={styles.detailsContainer}>
      <button className={styles.backButton} onClick={onBack}>
        <FaArrowLeftLong size={25}/>
        Volver
      </button>
      <h2>Detalle de Certificado de Trabajador</h2>
      <div className={styles.form}>
        <div style={{ display: "flex", gap: "20px" ,width:"50%"}}>
          <InputField label="Código País" value={data.codigoPais || ""} />
          <InputField label="País" value={data.paisDocumento || ""} />
        </div>

        <div style={{ display: "flex", gap: "20px",width:"80%" }}>
          <InputField label="Código Documento" value={data.codigoDocumento || ""} />
          <InputField label="Tipo Documento" value={data.tipoDocumento || ""} />
          <InputField label="Nro Documento" value={data.nroDocumento || ""} />
          <InputField label="Nombre Completo" value={data.nombreCompleto || ""} />
        </div>
        <div style={{ display: "flex", gap: "20px",width:"80%" }}>
          <InputField label="Código País" value={data.codigoPais || ""} />
          <InputField label="País" value={data.paisDocumento || ""} />
          <InputField label="Tipo de documento del médico" value={data.tipoDocumentoMedico || ""} />
          <InputField label="Nro documento del médico" value={data.nroDocumentoMedico || ""} />
        </div>
        <div style={{ display: "flex", gap: "20px" ,width:"70%"}}>
          <InputField label="Certificado desde" value={data.certificadoDesde || ""} />
          <InputField label="Certificado hasta" value={data.certificadoHasta || ""} />
          <InputField label="Fecha de actuación" value={data.fechaActuacion || ""} />
          <InputField label="Nombre completo del médico" value={data.nombreCompletoMedico || ""} />
        </div>

        <div style={{ display: "flex", gap: "20px" ,width:"60%"}}>
          <InputField label="Fecha de vigencia" value={data.fechaVigencia || ""} />
          <InputField label="Institución" value={data.institucion || ""} />
          <InputField label="Estado" value={data.estado || ""} />
        </div>
        <div style={{ display: "flex", gap: "20px" ,width:"70%"}}>
          <InputField label="Fecha egreso int." value={data.fechaEgresoInternacion || ""} />
          <InputField label="Patología" value={data.patologia || ""} />
          <RadioInput
            options={[
              { label: "Es Excepción", checked: data.esExcepcion || false },
              { label: "Internación", checked: data.internacion || false },
            ]}
          />
        </div>

        <div style={{ display: "flex", gap: "20px" ,width:"40%" }}>
          <InputField label="Fecha de Reintegro" value={data.fechaReintegro || ""} />
          <RadioInput options={[{ label: "Reintegro anticipado", checked: data.reintegroAnticipado || false }]} />
        </div>
      </div>
      <button className={styles.exportButton}>
        <FaFilePdf size={25} color="white"/>
        Exportar a PDF</button>
    </div>
  );
};

export default DetailsView;
