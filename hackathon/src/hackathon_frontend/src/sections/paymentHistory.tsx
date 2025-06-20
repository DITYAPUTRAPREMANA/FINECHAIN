import {useState} from 'react';
import TanstackTable from '../components/tanstack-table';

import {
    ColumnDef,
    createColumnHelper,
} from '@tanstack/react-table'

type PaidFine = {
    letterNumber: string;
    institution: string;
    address: string;
    callCenter: string;
};

const paidFinesData: PaidFine[] = [
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jln. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "081122334455",
    },
];

const columnHelper = createColumnHelper<PaidFine>();
const columns = [
    columnHelper.display({
        id: 'rowNumber',
        header: () => 'Num',
        cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor('letterNumber', {
        header: () => 'Letter Number',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('institution', {
        header: () => 'Institution',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('address', {
        header: () => 'Address',
        cell: info => info.renderValue(),
    }),
    columnHelper.accessor('callCenter', {
        header: () => 'Call Center',
        cell: info => info.renderValue(),
    }),
] as ColumnDef<PaidFine, unknown>[];

const PaymentHistoryDashboard = () => {
    //pagination
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;

    const paginatedData = paidFinesData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    const maxPage = Math.ceil(paidFinesData.length / pageSize);
    return (
        <div className="w-full h-full p-8 md:p-14">
            <div className="w-full h-full py-10 px-8 lg:px-12 bg-gradient-to-br from-[#E0F7FA}/70 to-[#FFF8E1]/70 backdroo-blur-md shadow-lg rounded-3xl space-y-8 border-2 border-white/50">

                {/* Header with search bar */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between text-[#145374] gap-4">
                    <h1 className="font-bold text-3xl">Paid Fines By You</h1>
                    <form action="" className="flex items-center gap-2">
                        <label className="font-semibold text-lg">Search:</label>
                        <input type="text" className="w-full lg:w-fit py-1.5 px-3 bg-white rounded-lg border-2 border-gray-300 focus:border-[#145374] focus:outline-none text-lg"/>
                    </form>
                </div>

                {/* Table with Tanstack */}
                <TanstackTable<PaidFine> columns={columns} data={paidFinesData} pageIndex={pageIndex} />

                {/* Pagination Controls */}

                <div className="w-full flex items-center justify-between text-[#145374] text-base md:text-lg font-semibold">
                    <p>Showing {pageIndex * pageSize + 1} to {pageIndex * pageSize + paginatedData.length} of {paidFinesData.length} Entries</p>
                    <div className="flex gap-4">
                        <button className={"cursor-pointer " + (pageIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:underline")} disabled={pageIndex === 0} onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
                        <button className={"cursor-pointer " + (pageIndex + 1 >= maxPage ? "opacity-50 cursor-not-allowed" : "hover:underline")} disabled={pageIndex + 1 >= maxPage} onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentHistoryDashboard;