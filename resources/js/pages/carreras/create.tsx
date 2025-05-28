import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Docentes',
    href: '/docentes',
  },
  {
    title: 'Crear',
    href: '/docentes/create',
  },
];

export default function CreateDocente() {

  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    paterno: '',
    materno: '',
    estado: 'true'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/docentes', {
      onSuccess: () => {
        toast.success('Docente creado con éxito');
      }
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Docente" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Crear Docente</CardTitle>
              <Link href='/docentes'>
                <Button className='cursor-pointer' variant='outline'>
                  <ArrowLeftIcon className='w-4 h-4' />
                  Regresar
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex flex-1 flex-col space-y-2'>
                  <Label htmlFor='nombre'>Nombre <span className='text-red-500'>*</span></Label>
                  <Input
                    id='nombre'
                    name='nombre'
                    type='text'
                    placeholder='Ingresa un nombre'
                    required
                    value={data.nombre}
                    onChange={(e) => setData('nombre', e.target.value)}
                  />
                  {errors.nombre && <p className='text-sm text-red-500'>{errors.nombre}</p>}
                </div>
                <div className='flex flex-1 flex-col space-y-2'>
                  <Label htmlFor='estado'>Estado <span className='text-red-500'>*</span></Label>
                  <Select
                    value={data.estado}
                    onValueChange={(value) => setData('estado', value)}
                  >
                    <SelectTrigger id="estado" className='cursor-pointer'>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.estado && <p className='text-sm text-red-500'>{errors.estado}</p>}
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
    </AppLayout>
  );
}
