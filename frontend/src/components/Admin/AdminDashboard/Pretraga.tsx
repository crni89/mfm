import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import logo from '../../../template/Logo.png';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default function Pretraga() {
  
  const docDefinition: TDocumentDefinitions = {
    // pageSize: 'A4',
    // pageMargins: [ 40, 60, 40, 60 ],
    content: [
      {
        image: `${logo}`,
        width:200,
        height:200,
      },
      {
        text: "TEST"
      },
    ]
  };

const handleClick = () => {
  pdfMake.createPdf(docDefinition).download("test.pdf");
};

  return (
  <button onClick={handleClick}>
    Generate PDF
  </button>
  );

}