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
} from "@/components/ui/table";
import DeleteButton from '@/components/delete-button';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Estudiantes',
    href: '/estudiantes',
  },
];

interface Estudiante {
  id: number;
  nombre: string;
  paterno: string;
  materno: string;
  matricula: string;
  celular: string;
  grupo: {
    nombre: string;
  };
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface EstudiantesPagination {
  data: Estudiante[];
  links: PaginationLink[];
}

export default function Estudiantes({ estudiantes }: { estudiantes: EstudiantesPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Estudiantes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Estudiantes</h1>
          <Link href='/estudiantes/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Agregar Estudiante
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Estudiantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de estudiantes registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Nombre completo</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Celular</TableHead>
                    <TableHead>Grupo</TableHead>
                    {/* <TableHead>Estado</TableHead> */}
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estudiantes.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No hay estudiantes registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    estudiantes.data.map((estudiante) => (
                      <TableRow key={estudiante.id}>
                        <TableCell className="font-medium">{estudiante.id}</TableCell>
                        <TableCell>{`${estudiante.nombre} ${estudiante.paterno} ${estudiante.materno}`}</TableCell>
                        <TableCell>{estudiante.matricula}</TableCell>
                        <TableCell>{estudiante.celular}</TableCell>
                        <TableCell>{estudiante.grupo?.nombre ?? 'Sin grupo'}</TableCell>
                        {/* <TableCell className={estudiante?.estado ? 'text-green-600' : 'text-red-600'}>
                          {estudiante.estado ? 'Activo' : 'Inactivo'}
                        </TableCell> */}
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/estudiantes/${estudiante.id}/edit`}>
                              <Button variant='outline' size='icon' className='cursor-pointer'>
                                <EditIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteButton resourceName='estudiante' deleteUrl={`/estudiantes/${estudiante.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={estudiantes.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
