"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CloudinaryUploadWidgetInfo } from 'next-cloudinary';

import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    Card,
    CardContent,
} from "~/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

import { toastMsg } from "~/lib/toast-msg";
import MediaUploader from "./MediaUploader";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { MdiWhatsapp } from "../icons/MdiWhatsapp";
import { MdiInstagram } from "../icons/MdiInstagram";
import { MdiFacebook } from "../icons/MdiFacebook";
import { Separator } from "../ui/separator";

const productSchema = z.object({
    id: z.number(),
    nombre: z.string(),
});

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Debe tener al menos 2 caracteres",
    }),
    description: z.string().min(8, {
        message: "Debe tener al menos 8 caracteres",
    }),
    whatsapp: z.string().min(8, {
        message: "Debe tener al menos 8 caracteres",
    }),
    instagram: z.string().nullable(),
    facebook: z.string().nullable(),
    image: z.string().min(2, {
        message: "Imagen requerido.",
    }),
    back_image: z.string().min(2, {
        message: "Imagen portada requerido.",
    }),
    products: z.array(productSchema)
})

interface MenuFormProps {
    isEditMode?: boolean
}

export function MenuForm({ isEditMode = false }: MenuFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
            description: "",
            back_image: "https://res.cloudinary.com/matiass/image/upload/v1731682224/wrxhcndwzbvhcbqojr2u.png",
            whatsapp: "",
            instagram: "",
            facebook: "",
        },
    })
    const { toast } = useToast()

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center flex-1 mt-10">
                                <FormControl>
                                    <MediaUploader
                                        onSuccess={(e) => {
                                            if (e.event === 'success') {
                                                field.onChange((e.info as CloudinaryUploadWidgetInfo).secure_url)
                                                toast(toastMsg.imageUpload.success)
                                            } else {
                                                toast(toastMsg.imageUpload.error)
                                            }
                                        }}
                                        className="flex justify-center"
                                    >
                                        <Avatar className="h-[250px] w-[250px]">
                                            <AvatarImage src={field.value.length > 0 ? field.value : '/camera.png'} className="h-[250px] w-[250px] object-cover m-auto bg-slate-100 dark:bg-slate-950" />
                                            <AvatarFallback></AvatarFallback>
                                        </Avatar>
                                    </MediaUploader>
                                </FormControl>
                                <FormLabel>Imagen de perfil</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex-1 space-y-8">
                        <FormField
                            control={form.control}
                            name="back_image"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>Imagen de portada</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center">
                                            <div className="h-[54px] w-[90px] bg-muted rounded-md relative">
                                                <Image src={field.value} alt="back-image" className="h-[54px] w-full rounded-md object-cover" fill />
                                            </div>

                                            <MediaUploader
                                                onSuccess={(e) => {
                                                    if (e.event === 'success') {
                                                        field.onChange((e.info as CloudinaryUploadWidgetInfo).secure_url)
                                                        toast(toastMsg.imageUpload.success)
                                                    } else {
                                                        toast(toastMsg.imageUpload.error)
                                                    }
                                                }}
                                            >
                                                <Button variant='link'>Cambiar</Button>
                                            </MediaUploader>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Nombre del comercio</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Descripción del comercio</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Contacto del comercio
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="whatsapp"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="flex gap-2 items-center"><MdiWhatsapp width={20} height={20} />Whatsapp</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+15 1123122" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="flex gap-2 items-center"><MdiInstagram width={20} height={20} />Instagram</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="https://www.instagram.com/..." value={field.value ?? ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="facebook"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="flex gap-2 items-center"><MdiFacebook width={20} height={20} />Facebook</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="https://www.facebook.com/..." value={field.value ?? ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* <Button type="submit" variant="secondary">Submit</Button> */}

                <Separator orientation="horizontal" className="my-8" />

                <div className="pb-8">
                    <h3 className="text-lg font-medium">Productos</h3>
                    <p className="text-sm text-muted-foreground">
                        Agregá los productos de tu menu
                    </p>
                </div>

                <div className="flex flex-row space-x-3">
                    <div className="flex-1 flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem className="flex-1 w-full max-w-[520px]">
                                    <FormLabel className="flex gap-2 items-center"><MdiFacebook width={20} height={20} />Facebook</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="https://www.facebook.com/..." value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem className="flex-1 w-full max-w-[520px]">
                                    <FormLabel className="flex gap-2 items-center"><MdiFacebook width={20} height={20} />Facebook</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="https://www.facebook.com/..." value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem className="flex-1 w-full max-w-[520px]">
                                    <FormLabel className="flex gap-2 items-center"><MdiFacebook width={20} height={20} />Facebook</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="https://www.facebook.com/..." value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem className="flex-1 w-full max-w-[520px]">
                                    <FormLabel className="flex gap-2 items-center"><MdiFacebook width={20} height={20} />Facebook</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="https://www.facebook.com/..." value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <Card className="h-full">
                            <CardContent>
                                <Table>
                                    <TableCaption>A list of your recent invoices.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Invoice</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">INV001</TableCell>
                                            <TableCell>Paid</TableCell>
                                            <TableCell>Credit Card</TableCell>
                                            <TableCell className="text-right">$250.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    )
}
