import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EditIcon, PlusIcon, QrCodeIcon, ScanQrCodeIcon } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/pagination';
import DeleteButton from '@/components/delete-button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tareas', href: '/tareas' },
];

interface Tarea {
    id: number;
    descripcion: string;
    fecha_entrega: string;
    asignacion_docente: {
        materia: { nombre: string };
        grupo: { nombre: string };
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TareasPagination {
    data: Tarea[];
    links: PaginationLink[];
}

export default function Tareas({ tareas }: { tareas: TareasPagination }) {
    const [filters, setFilters] = useState({
        descripcion: '',
        materia: '',
        grupo: '',
        fecha_entrega: '',
    });

    const filteredData = useMemo(() => {
        return tareas.data.filter((tarea) => {
            return (
                tarea.descripcion.toLowerCase().includes(filters.descripcion.toLowerCase()) &&
                tarea.asignacion_docente.materia.nombre.toLowerCase().includes(filters.materia.toLowerCase()) &&
                tarea.asignacion_docente.grupo.nombre.toLowerCase().includes(filters.grupo.toLowerCase()) &&
                tarea.fecha_entrega.includes(filters.fecha_entrega)
            );
        });
    }, [filters, tareas.data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tareas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                    <h1 className='text-2xl font-bold'>Tareas</h1>
                    <Link href='/tareas/create'>
                        <Button className='cursor-pointer'>
                            <PlusIcon className='w-4 h-4 mr-2' />
                            Agregar Tarea
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Listado de Tareas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pb-4">
                                <Input
                                    placeholder="Buscar descripción..."
                                    value={filters.descripcion}
                                    onChange={(e) =>
                                        setFilters({ ...filters, descripcion: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder="Buscar materia..."
                                    value={filters.materia}
                                    onChange={(e) =>
                                        setFilters({ ...filters, materia: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder="Buscar grupo..."
                                    value={filters.grupo}
                                    onChange={(e) =>
                                        setFilters({ ...filters, grupo: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder="Buscar fecha entrega..."
                                    value={filters.fecha_entrega}
                                    onChange={(e) =>
                                        setFilters({ ...filters, fecha_entrega: e.target.value })
                                    }
                                />
                            </div>

                            <Table>
                                <TableCaption>Listado de tareas registradas</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No.</TableHead>
                                        <TableHead>Descripción</TableHead>
                                        <TableHead>Materia</TableHead>
                                        <TableHead>Grupo</TableHead>
                                        <TableHead>Fecha de Entrega</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-6">
                                                No hay tareas que coincidan con los filtros.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredData.map((tarea) => (
                                            <TableRow key={tarea.id}>
                                                <TableCell>{tarea.id}</TableCell>
                                                <TableCell>{tarea.descripcion}</TableCell>
                                                <TableCell>{tarea.asignacion_docente.materia.nombre}</TableCell>
                                                <TableCell>{tarea.asignacion_docente.grupo.nombre}</TableCell>
                                                <TableCell>{tarea.fecha_entrega}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex gap-2 justify-end flex-wrap">
                                                        <Link href={`/revisiones/create?tarea_id=${tarea.id}`}>
                                                            <Button variant="outline" size="icon" className="cursor-pointer">
                                                                <ScanQrCodeIcon className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/tareas/${tarea.id}/edit`}>
                                                            <Button variant="outline" size="icon">
                                                                <EditIcon className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <DeleteButton resourceName='tarea' deleteUrl={`/tareas/${tarea.id}`} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination links={tareas.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
