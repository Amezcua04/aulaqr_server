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


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Carreras',
    href: '/carreras',
  },
];

interface Carrera {
  id: number;
  nombre: string;
  estado: boolean;
}

export default function Carreras({ carreras }: { carreras: Carrera[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Carreras" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Carreras</h1>
          <Link href='/carreras/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Agregar Carrera
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todas las Carreras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de carreras registradas</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">No.</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carreras.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        No hay carreras registradas.
                      </TableCell>
                    </TableRow>
                  ) : (
                    carreras.map((carrera) => (
                      <TableRow key={carrera.id}>
                        <TableCell className="font-medium">{carrera.id}</TableCell>
                        <TableCell>{carrera.nombre}</TableCell>
                        <TableCell className={carrera.estado ? 'text-green-600' : 'text-red-600'}>
                          {carrera.estado ? 'Activo' : 'Inactivo'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/carreras/${carrera.id}/edit`}>
                              <Button variant='outline' size='icon' className='cursor-pointer'>
                                <EditIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteButton resourceName='carrera' deleteUrl={`/carreras/${carrera.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}