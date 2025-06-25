import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React from 'react';

type TableProps<T> = {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    pageIndex: number;
};


function TanstackTable<T>({ columns, data, pageIndex }: TableProps<T>) {
    const [pageSize, setPageSize] = React.useState(10);

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(data.length / pageSize),
        state: {
            pagination: {
                pageSize,
                pageIndex: pageIndex,
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <div className='rounded-2xl md:rounded-3xl overflow-hidden border-3 border-white overflow-x-scroll scrollbar-hide'>
            <table className='w-full text-xl rounded-2xl md:rounded-3xl overflow-hidden border-4 border-white text-[#145374]'>
                <thead className='bg-[#FC9F44]/50 backdrop-blur-lg'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className='border-3 border-white p-2 md:p-4' key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                            <th className='border-3 border-white p-2 md:p-4'>Action</th>
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className='border-3 border-white p-2 md:p-4 bg-white/5 backdrop-blur-md truncate max-w-64 md:max-w-96' key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            <td className='border-3 border-white p-2 md:p-4 bg-white/5 backdrop-blur-md'>
                                <button className='flex items-center gap-0.5 md:gap-2 rounded-2xl bg-[#145374] p-1 md:py-2 md:pl-2 md:pr-3 text-white hover:bg-[#145374]/70 cursor-pointer'>
                                    <InformationCircleIcon className="size-6 md:size-8" />
                                    <span>Detail</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

export default TanstackTable;