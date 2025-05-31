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
    title: 'Grupos',
    href: '/grupos',
  },
];

interface Grupo {
  id: number;
  nombre: string;
  estado: boolean;
  carrera: {
    nombre: string;
  };
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface GruposPagination {
  data: Grupo[];
  links: PaginationLink[];
}

export default function Grupos({ grupos }: { grupos: GruposPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Grupos" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Grupos</h1>
          <Link href='/grupos/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Agregar Grupo
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Grupos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de grupos registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Carrera</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grupos.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        No hay grupos registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    grupos.data.map((grupo) => (
                      <TableRow key={grupo.id}>
                        <TableCell className="font-medium">{grupo.id}</TableCell>
                        <TableCell>{grupo.nombre}</TableCell>
                        <TableCell>{grupo.carrera?.nombre ?? 'Sin carrera'}</TableCell>
                        <TableCell className={grupo.estado ? 'text-green-600' : 'text-red-600'}>
                          {grupo.estado ? 'Activo' : 'Inactivo'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/grupos/${grupo.id}/edit`}>
                              <Button variant='outline' size='icon' className='cursor-pointer'>
                                <EditIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteButton resourceName='grupo' deleteUrl={`/grupos/${grupo.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={grupos.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}