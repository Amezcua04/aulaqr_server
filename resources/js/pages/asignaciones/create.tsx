import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Asignaciones',
    href: '/asignaciones',
  },
  {
    title: 'Crear',
    href: '/asignaciones/create',
  },
];

interface Option {
  id: number;
  nombre: string;
}

interface HorarioDia {
  id: number;
  horario: {
    hora_inicio: string;
    hora_fin: string;
  };
  dia: {
    nombre: string;
  };
}

interface Props {
  docentes: Option[];
  materias: Option[];
  grupos: Option[];
  horarios: HorarioDia[];
}

export default function CreateAsignacion({ docentes, materias, grupos, horarios }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    docente_id: '',
    materia_id: '',
    grupo_id: '',
    horario_dia_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/asignaciones', {
      onSuccess: () => {
        toast.success('Asignación creada con éxito');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Asignación" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Crear Asignación</CardTitle>
              <Link href="/asignaciones">
                <Button className="cursor-pointer" variant="outline">
                  <ArrowLeftIcon className="w-4 h-4" />
                  Regresar
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="docente">Docente <span className="text-red-500">*</span></Label>
                  <Select
                    value={data.docente_id}
                    onValueChange={(value) => setData('docente_id', value)}
                  >

                    <SelectTrigger id="docente_id" className='cursor-pointer'>
                      <SelectValue placeholder="Selecciona un docente" />
                    </SelectTrigger>
                    <SelectContent>
                      {docentes.map((docente) => (
                        <SelectItem key={docente.id} value={String(docente.id)}>
                          {docente.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.docente_id && <p className="text-sm text-red-500">{errors.docente_id}</p>}
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="materia">Materia <span className="text-red-500">*</span></Label>
                  <Select
                    value={data.materia_id}
                    onValueChange={(value) => setData('materia_id', value)}
                  >

                    <SelectTrigger id="materia_id" className='cursor-pointer'>
                      <SelectValue placeholder="Selecciona una materia" />
                    </SelectTrigger>
                    <SelectContent>
                      {materias.map((materia) => (
                        <SelectItem key={materia.id} value={String(materia.id)}>
                          {materia.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.materia_id && <p className="text-sm text-red-500">{errors.materia_id}</p>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="grupo">Grupo <span className="text-red-500">*</span></Label>
                  <Select
                    value={data.grupo_id}
                    onValueChange={(value) => setData('grupo_id', value)}
                  >
                    <SelectTrigger id="grupo_id" className='cursor-pointer'>
                      <SelectValue placeholder="Selecciona un grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      {grupos.map((grupo) => (
                        <SelectItem key={grupo.id} value={String(grupo.id)}>
                          {grupo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.grupo_id && <p className="text-sm text-red-500">{errors.grupo_id}</p>}
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="horario">Horario <span className="text-red-500">*</span></Label>
                <Select
                  value={data.horario_dia_id}
                  onValueChange={(value) => setData('horario_dia_id', value)}
                >
                  <SelectTrigger id="horario_dia_id" className='cursor-pointer'>
                    <SelectValue placeholder="Selecciona un horario" />
                  </SelectTrigger>
                  <SelectContent>
                    {horarios.map((h) => (
                      <SelectItem key={h.id} value={String(h.id)}>
                        {h.dia?.nombre ?? 'Día desconocido'} - {h.horario?.hora_inicio} a {h.horario?.hora_fin}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.horario_dia_id && <p className="text-sm text-red-500">{errors.horario_dia_id}</p>}
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={processing} className='cursor-pointer'>
                {processing ? 'Guardando...' : "Guardar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </AppLayout >
  );
}
