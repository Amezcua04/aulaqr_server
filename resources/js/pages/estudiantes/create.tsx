import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type FormEventHandler } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, ArrowLeftIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Estudiantes',
        href: '/estudiantes',
    },
    {
        title: 'Crear',
        href: '/estudiantes/create',
    },
];

interface Grupo {
    id: number;
    nombre: string;
}

export default function Create({ grupos }: { grupos: Grupo[] }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        paterno: '',
        materno: '',
        matricula: '',
        celular: '',
        grupo_id: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/estudiantes');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agregar Estudiante" />
            <div className="p-4 flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Crear Estudiante</CardTitle>
                            <Link href='/estudiantes'>
                                <Button className='cursor-pointer' variant='outline'>
                                    <ArrowLeftIcon className='w-4 h-4' />
                                    Regresar
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <Label htmlFor='nombre'>Nombre <span className='text-red-500'>*</span></Label>
                                    <Input
                                        id='nombre'
                                        name='nombre'
                                        type='text'
                                        placeholder='Nombre(s)'
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        required
                                    />
                                    {errors.nombre && <p className='text-sm text-red-500'>{errors.nombre}</p>}
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='paterno'>Apellido paterno <span className='text-red-500'>*</span></Label>
                                    <Input
                                        id='paterno'
                                        name='paterno'
                                        type='text'
                                        placeholder='Apellido paterno'
                                        value={data.paterno}
                                        onChange={(e) => setData('paterno', e.target.value)}
                                        required
                                    />
                                    {errors.paterno && <p className='text-sm text-red-500'>{errors.paterno}</p>}
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='materno'>Apellido materno <span className='text-red-500'>*</span></Label>
                                    <Input
                                        id='materno'
                                        name='materno'
                                        type='text'
                                        placeholder='Apellido materno'
                                        value={data.materno}
                                        onChange={(e) => setData('materno', e.target.value)}
                                        required
                                    />
                                    {errors.materno && <p className='text-sm text-red-500'>{errors.materno}</p>}
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='matricula'>Matrícula <span className='text-red-500'>*</span></Label>
                                    <Input
                                        id='matricula'
                                        name='matricula'
                                        type='text'
                                        placeholder='Matrícula del estudiante'
                                        value={data.matricula}
                                        onChange={(e) => setData('matricula', e.target.value)}
                                        required
                                    />
                                    {errors.matricula && <p className='text-sm text-red-500'>{errors.matricula}</p>}
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='celular'>Celular <span className='text-red-500'>*</span></Label>
                                    <Input
                                        id='celular'
                                        name='celular'
                                        type='tel'
                                        placeholder='Número celular'
                                        value={data.celular}
                                        onChange={(e) => setData('celular', e.target.value)}
                                        required
                                    />
                                    {errors.celular && <p className='text-sm text-red-500'>{errors.celular}</p>}
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='grupo_id'>Grupo <span className='text-red-500'>*</span></Label>
                                    <Select
                                        value={data.grupo_id}
                                        onValueChange={(value) => setData('grupo_id', value)}
                                    >
                                        <SelectTrigger id='grupo_id' className='cursor-pointer'>
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
                                    {errors.grupo_id && <p className='text-sm text-red-500'>{errors.grupo_id}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={processing} className='cursor-pointer'>
                                    {processing ? 'Guardando...' : 'Guardar'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
