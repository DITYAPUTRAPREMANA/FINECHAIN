import { useEffect, useMemo, useRef, useState } from "react";
import TanstackTable from "../components/ui/tanstack-table";

import {
    ColumnDef,
    createColumnHelper,
} from '@tanstack/react-table'
import { useFineController } from "../controllers/fine-controller";

type Fine = {
    letterNumber: string
    institution: string
    address: string
    callCenter: string
}

const FinesPage = () => {
    const { fines, isLoading, handleAddFines } = useFineController();
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;

    const columnHelper = createColumnHelper<Fine>()

    const columns = [
        columnHelper.display({
            id: 'rowNumber',
            header: () => 'Num',
            cell: ({ row }) => row.index + 1,
        }),
        columnHelper.accessor('letterNumber', {
            id: 'letterNumber',
            header: () => 'Letter Number',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('institution', {
            id: 'institution',
            header: () => 'Institution',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('address', {
            id: 'address',
            header: () => 'Address',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('callCenter', {
            id: 'callCenter',
            header: () => 'Call Center',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
    ] as ColumnDef<Fine, unknown>[];

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            // localStorage.clear();
            handleAddFines();
        }
    }, []);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return fines;
        const lower = searchQuery.toLowerCase();
        setPageIndex(0);
        return fines.filter((fine) =>
            Object.values(fine).some((val) =>
                String(val).toLowerCase().includes(lower)
            )
        );
    }, [searchQuery, fines]);

    const paginatedData = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    const maxPage = Math.ceil(filteredData.length / pageSize);

    return (
        <div className="max-w-screen mb-20 space-y-8 w-full py-14 px-8 lg:px-20 bg-gradient-to-br from-[#B4B4B4]/35 to-[#FFE0BD]/35 backdrop-blur-3xl rounded-b-4xl shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between text-[#145374] gap-4">
                <h1 className="font-bold text-3xl">
                    Indonesian Fine List
                </h1>
                <div className="flex justify-end">
                    <form action="" className="flex items-center gap-2">
                        <label className="w-full lg:w-fit text-xl">Search</label>
                        <input type="text" placeholder="Search fines here..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full lg:w-fit py-2 px-3 bg-[#FFF1E2]/65 rounded-lg border-2 border-[#145374] text-xl" />
                    </form>
                </div>
            </div>
            <TanstackTable<Fine> columns={columns} data={filteredData} pageIndex={pageIndex}/>
            <div className={isLoading ? 'flex w-full justify-center py-8' : 'hidden'}>
                <img src="/download.jpeg" alt="" className='size-24 animate-spin' />
            </div>
            <div className="w-full flex items-center justify-between text-[#145374] text-lg md:text-xl font-bold">
                <p className="max-w-28 md:max-w-full">
                    Showing {pageIndex * pageSize + 1} - {pageIndex * pageSize + paginatedData.length} of {filteredData.length} Entries
                </p>
                <div className="flex gap-3 md:gap-8">
                    <button className={pageIndex === 0 ? "opacity-50" : "hover:text-[#284657] cursor-pointer"} disabled={pageIndex === 0} onClick={() => setPageIndex(pageIndex - 1)}>Previos</button>
                    <button className={pageIndex + 1 >= maxPage ? "opacity-50" : "hover:text-[#284657] cursor-pointer"} disabled={pageIndex + 1 >= maxPage} onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default FinesPage;