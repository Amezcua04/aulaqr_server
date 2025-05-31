import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EditIcon, PlusIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteButton from '@/components/delete-button';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Asignaciones',
    href: '/asignaciones',
  },
];

interface Asignacion {
  id: number;
  docente: {
    nombre: string;
    paterno: string;
    materno: string;
  };
  materia: {
    nombre: string;
  };
  grupo: {
    nombre: string;
  };
  horario_dia: {
    dia: {
      nombre: string;
    };
    horario: {
      hora_inicio: string;
      hora_fin: string;
    }
  };
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface AsignacionesPagination {
  data: Asignacion[];
  links: PaginationLink[];
}

export default function Asignaciones({ asignaciones }: { asignaciones: AsignacionesPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Asignaciones" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Asignaciones</h1>
          <Link href='/asignaciones/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Nueva Asignación
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todas las Asignaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de asignaciones docentes</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Docente</TableHead>
                    <TableHead>Materia</TableHead>
                    <TableHead>Grupo</TableHead>
                    <TableHead>Horario</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asignaciones.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No hay asignaciones registradas.
                      </TableCell>
                    </TableRow>
                  ) : (
                    asignaciones.data.map((asignacion) => (
                      <TableRow key={asignacion.id}>
                        <TableCell className="font-medium">{asignacion.id}</TableCell>
                        <TableCell>{`${asignacion.docente.nombre} ${asignacion.docente.paterno} ${asignacion.docente.materno}`}</TableCell>
                        <TableCell>{asignacion.materia.nombre}</TableCell>
                        <TableCell>{asignacion.grupo.nombre}</TableCell>
                        <TableCell>{asignacion.horario_dia
                          ? `${asignacion.horario_dia.dia?.nombre ?? 'Día'} (${asignacion.horario_dia.horario?.hora_inicio.slice(0, 5) ?? ''} - ${asignacion.horario_dia.horario?.hora_fin.slice(0, 5) ?? ''})`
                          : 'Sin horario'} </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/asignaciones/${asignacion.id}/edit`}>
                              <Button variant='outline' size='icon' className='cursor-pointer'>
                                <EditIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteButton resourceName='asignacion' deleteUrl={`/asignaciones/${asignacion.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={asignaciones.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
