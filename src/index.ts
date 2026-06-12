import { IncidentService } from './services/incident.service';
import { ReportGenerator } from './utils/report-generator';
import { ClassroomReportDTO } from './dtos/incident-report.dto';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const incidentService = new IncidentService();

function preguntar(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pregunta, resolve);
    });
}

async function main() {
    console.log('\n========================================');
    console.log('REGISTRO DE INCIDENTES - SALON C-27');
    console.log('========================================\n');
    
    let continuar = true;
    
    while (continuar) {
        console.log('\n--- NUEVO INCIDENTE ---');
        
        const problema = await preguntar('ESCRIBE EL PROBLEMA: ');
        const nombre = await preguntar('NOMBRE DE LA PERSONA: ');
        
        console.log('\nPRIORIDADES:');
        console.log('1. ALTA');
        console.log('2. MEDIA');
        console.log('3. BAJA');
        
        const opcion = await preguntar('ELIGE PRIORIDAD (1, 2 o 3): ');
        
        let prioridad: 'Alta' | 'Media' | 'Baja' = 'Media';
        if (opcion === '1') prioridad = 'Alta';
        if (opcion === '2') prioridad = 'Media';
        if (opcion === '3') prioridad = 'Baja';
        
        incidentService.createIncident({
            titulo: problema,
            descripcion: 'Reporte del salon C-27',
            reportadoPor: nombre,
            prioridad: prioridad
        });
        
        console.log('\nINCIDENTE REGISTRADO');
        
        const respuesta = await preguntar('\nREGISTRAR OTRO INCIDENTE? (s/n): ');
        if (respuesta.toLowerCase() !== 's') {
            continuar = false;
        }
    }
    
    console.log('\n========================================');
    console.log('REPORTE DEL SALON C-27');
    console.log('========================================');
    
    const report = incidentService.generateClassroomReport('C-27');
    const reportDTO = ClassroomReportDTO.create('C-27', report);
    
    ReportGenerator.printReport(reportDTO);
    
    rl.close();
}

main();