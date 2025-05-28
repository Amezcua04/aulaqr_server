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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Docentes',
    href: '/docentes',
  },
];

interface Docente {
  id: number;
  nombre: string;
  paterno: string;
  materno: string;
  estado: boolean;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface DocentesPagination {
  data: Docente[];
  links: PaginationLink[];
}

export default function Docentes({ docentes }: { docentes: DocentesPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Docentes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Docentes</h1>
          <Link href='/docentes/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Agregar Docente
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Docentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de docentes registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {docentes.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6">
                        No hay docentes registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    docentes.data.map((docente) => (
                      <TableRow key={docente.id}>
                        <TableCell className="font-medium">{docente.id}</TableCell>
                        <TableCell>{`${docente.nombre} ${docente.paterno} ${docente.materno}`}</TableCell>
                        <TableCell className={docente.estado ? 'text-green-600' : 'text-red-600'}>
                          {docente.estado ? 'Activo' : 'Inactivo'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/docentes/${docente.id}/edit`}>
                              <Button variant='outline' size='icon' className='cursor-pointer'>
                                <EditIcon className='w-4 h-4' />
                              </Button>
                            </Link>
                            <DeleteButton resourceName='docente' deleteUrl={`/docentes/${docente.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-4 flex-wrap gap-2">
              {docentes.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url ?? '#'}
                  className={`px-3 py-1 rounded text-sm border ${link.active
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                    } ${!link.url && 'pointer-events-none opacity-50'}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}