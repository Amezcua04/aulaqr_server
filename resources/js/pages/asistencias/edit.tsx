import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

interface Option {
  id: number;
  nombre: string;
}

interface Asistencia {
  id: number;
  estudiante_id: number;
  asignacion_docente_id: number;
  fecha: string;
  estado: 'presente' | 'ausente' | 'tarde' | 'justificado';
}

interface Props {
  asistencia: Asistencia;
  asignaciones: Option[];
  estudiantes: Option[];
}

export default function EditAsistencia({ asistencia, asignaciones, estudiantes }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    estado: asistencia.estado,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/asistencias/${asistencia.id}`, {
      onSuccess: () => toast.success('Asistencia actualizada con éxito'),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Asistencias', href: '/asistencias' },
        { title: 'Editar', href: '#' },
      ]}
    >
      <Head title="Editar Asistencia" />
      <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Editar Asistencia</CardTitle>
              <Link href="/asistencias">
                <Button variant="outline">
                  <ArrowLeftIcon className="w-4 h-4 mr-1" />
                  Regresar
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="estudiante">Estudiante</Label>
                  <Select value={String(asistencia.estudiante_id)} disabled>
                    <SelectTrigger id="estudiante">
                      <SelectValue placeholder="Estudiante" />
                    </SelectTrigger>
                    <SelectContent>
                      {estudiantes.map((e) => (
                        <SelectItem key={e.id} value={String(e.id)}>
                          {e.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="asignacion">Asignación</Label>
                  <Select value={String(asistencia.asignacion_docente_id)} disabled>
                    <SelectTrigger id="asignacion">
                      <SelectValue placeholder="Asignación" />
                    </SelectTrigger>
                    <SelectContent>
                      {asignaciones.map((a) => (
                        <SelectItem key={a.id} value={String(a.id)}>
                          {a.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input id="fecha" value={asistencia.fecha} disabled />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="estado">Estado <span className="text-red-500">*</span></Label>
                  <Select value={data.estado} onValueChange={(value) => setData('estado', value)}>
                    <SelectTrigger id="estado">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presente">Presente</SelectItem>
                      <SelectItem value="ausente">Ausente</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                      <SelectItem value="justificado">Justificado</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Actualizando...' : 'Actualizar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
