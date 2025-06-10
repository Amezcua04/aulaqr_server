import { useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ReporteMateria {
  materia: string;
  docente: string;
  horario: string;
  asistencias: number;
  total_asistencias: number;
  tareas_entregadas: number;
  tareas_asignadas: number;
}

interface ReporteEstudiante {
  nombre: string;
  matricula: string;
  grupo: string;
  fecha_inicio: string;
  fecha_fin: string;
  total_clases: number;
  total_asistencias: number;
  total_faltas: number;
  tareas_asignadas: number;
  tareas_entregadas: number;
  tareas_no_entregadas: number;
  materias: ReporteMateria[];
}

interface Props {
  reportes: ReporteEstudiante[];
  fecha_inicio: string;
  fecha_fin: string;
}

export default function ReportesIndex({ reportes, fecha_inicio, fecha_fin }: Props) {
  const { data, setData, get } = useForm({
    fecha_inicio,
    fecha_fin,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    get(route('reportes.index'));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="space-y-1">
          <Label htmlFor="fecha_inicio">Desde</Label>
          <Input
            type="date"
            id="fecha_inicio"
            value={data.fecha_inicio}
            onChange={(e) => setData('fecha_inicio', e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="fecha_fin">Hasta</Label>
          <Input
            type="date"
            id="fecha_fin"
            value={data.fecha_fin}
            onChange={(e) => setData('fecha_fin', e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button type="submit">Filtrar</Button>
        </div>
      </form>

      {reportes.length === 0 && <p>No hay datos disponibles para el periodo seleccionado.</p>}

      {reportes.map((reporte, index) => (
        <Card key={index} className="shadow-md">
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-lg font-semibold">{reporte.nombre}</h2>
                <p className="text-sm text-muted-foreground">Matrícula: {reporte.matricula}</p>
                <p className="text-sm text-muted-foreground">Grupo: {reporte.grupo}</p>
              </div>
              <div className="text-sm text-muted-foreground md:text-right">
                <p>Del {formatDate(reporte.fecha_inicio)} al {formatDate(reporte.fecha_fin)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <p><strong>Total de clases:</strong> {reporte.total_clases}</p>
              <p><strong>Total de asistencias:</strong> {reporte.total_asistencias}</p>
              <p><strong>Total de faltas:</strong> {reporte.total_faltas}</p>
              <p><strong>Tareas asignadas:</strong> {reporte.tareas_asignadas}</p>
              <p><strong>Tareas entregadas:</strong> {reporte.tareas_entregadas}</p>
              <p><strong>Tareas no entregadas:</strong> {reporte.tareas_no_entregadas}</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm">Información por materia</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm mt-2">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-1 pr-2">Horario</th>
                      <th className="text-left py-1 pr-2">Materia</th>
                      <th className="text-left py-1 pr-2">Docente</th>
                      <th className="text-left py-1 pr-2">Asistencias</th>
                      <th className="text-left py-1 pr-2">Tareas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporte.materias.map((materia, idx) => (
                      <tr key={idx} className="border-b last:border-none">
                        <td className="py-1 pr-2">{materia.horario}</td>
                        <td className="py-1 pr-2">{materia.materia}</td>
                        <td className="py-1 pr-2">{materia.docente}</td>
                        <td className="py-1 pr-2">{materia.asistencias}/{materia.total_asistencias}</td>
                        <td className="py-1 pr-2">{materia.tareas_entregadas}/{materia.tareas_asignadas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}