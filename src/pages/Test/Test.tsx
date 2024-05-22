import { useEffect } from "react";
import { generateSoapHeaders, soapApi } from "../../helpers/soapService";

export const Test = () => {
	const url =
		"https://scs.bps.gub.uy/Salud/SENF/IntegracionHCENSNCL/ws/v1/wsCertOrganizaciones?wsdl";

	// const url = "https://wap.nuestrafamilia.com.pe/Estilos.AppPagos/EstilosTiendaVirtual.svc";
	// const soapAction = "http://tempuri.org/IEstilosTiendaVirtual/ConsultaObtenerSaldo";

	// 	const soapXML = `
	//   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
	//    <soapenv:Header/>
	//    <soapenv:Body>
	//       <tem:ConsultaObtenerSaldo>
	//          <!--Optional:-->
	//          <tem:tcTarjeta>?</tem:tcTarjeta>
	//          <!--Optional:-->
	//          <tem:tcCuenta>300000</tem:tcCuenta>
	//       </tem:ConsultaObtenerSaldo>
	//    </soapenv:Body>
	// </soapenv:Envelope>`;
	const soapXML = `
	  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://bps.gub.uy/senf/wsCertOrganizaciones/v1">
	  <soapenv:Header/>
	  <soapenv:Body>
	     <v1:obtenerCertificacionesOrganizacion>
	        <paramObtenerCertificacionesOrganizacion>
	           <nroOrganizacion> 0000003500665</nroOrganizacion>
	           <idUsuario>IMSJ_P</idUsuario>
	           <fechaDesde>2024-04-01</fechaDesde>
	           <fechaHasta>2024-04-28</fechaHasta>
	        </paramObtenerCertificacionesOrganizacion>
	     </v1:obtenerCertificacionesOrganizacion>
	  </soapenv:Body>
	</soapenv:Envelope>`;

	useEffect(() => {
		const headers = generateSoapHeaders("obtenerCertificacionesOrganizacion");
		// const headers = generateSoapHeaders(
		// 	"https://scst.bps.gub.uy:8443/Prestaciones/wsCertificacionesEmpresas"
		// );

		const promiseSoap = async () => {
			const result = await soapApi(url, soapXML, headers);
			// console.log(result);
		};

		promiseSoap();
	}, []);

	return (
		<>
			<div>Test</div>
		</>
	);
};
