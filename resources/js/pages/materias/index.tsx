// resources/js/Pages/Materias/Index.tsx

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
    title: 'Materias',
    href: '/materias',
  },
];

interface Materia {
  id: number;
  nombre: string;
  estado: boolean;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface MateriasPagination {
  data: Materia[];
  links: PaginationLink[];
}

export default function Materias({ materias }: { materias: MateriasPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Materias" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Materias</h1>
          <Link href='/materias/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Agregar Materia
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Materias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Listado de materias registradas</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materias.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        No hay materias registradas.
                      </TableCell>
                    </TableRow>
                  ) : (
                    materias.data.map((materia) => (
                      <TableRow key={materia.id}>
                        <TableCell className="font-medium">{materia.id}</TableCell>
                        <TableCell>{materia.nombre}</TableCell>
                        <TableCell className={materia.estado ? 'text-green-600' : 'text-red-600'}>
                          {materia.estado ? 'Activo' : 'Inactivo'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/materias/${materia.id}/edit`}>
                              <Button variant='outline' size='icon' className='cursor-pointer'>
                                <EditIcon className='w-4 h-4' />
                              </Button>
                            </Link>
                            <DeleteButton resourceName='materia' deleteUrl={`/materias/${materia.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={materias.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}