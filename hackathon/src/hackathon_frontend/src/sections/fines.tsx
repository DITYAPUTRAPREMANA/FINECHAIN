import { useState } from "react";
import TanstackTable from "../components/tanstack-table";

import {
    ColumnDef,
    createColumnHelper,
} from '@tanstack/react-table'

type Fine = {
    letterNumber: string
    institution: string
    address: string
    callCenter: string
}

const defaultData: Fine[] = [
    {
        letterNumber: "ABCD1234NZZ001",
        institution: "KN. ACEH BARAT",
        address: "Jl. Dr. Sutomo No. 16 Gampong Suak Indrapuri Kec. Johan Pahlawan Kab. Aceh Barat",
        callCenter: "0",
    },
    {
        letterNumber: "ABCD1234NZZ002",
        institution: "KN. ACEH BARAT DAYA",
        address: "Jl.Bukit Hijau No.65 Komplek Perkantoran,Mata Ie,Blang Pidie,Kabupaten Aceh Barat Daya",
        callCenter: "085379167725",
    },
    {
        letterNumber: "ABCD1234NZZ003",
        institution: "KN. ACEH BESAR",
        address: "Jl. T. Bachtiar P. Polem SH Kab. Kota Jantho",
        callCenter: "0",
    },
    {
        letterNumber: "ABCD1234NZZ004",
        institution: "KN. ACEH JAYA",
        address: "Jln. Adhyaksa No. 02 Dayah Baro",
        callCenter: "081290361811",
    },
    {
        letterNumber: "ABCD1234NZZ005",
        institution: "KN. ACEH SELATAN",
        address: "-",
        callCenter: "0",
    },
    {
        letterNumber: "ABCD1234NZZ006",
        institution: "KN. ACEH SINGKIL",
        address: "-",
        callCenter: "0",
    },
    {
        letterNumber: "ABCD1234NZZ007",
        institution: "KN. ACEH TAMIANG",
        address: "Jln. Ir. H. Djuanda Desa Kebun Tanah Terban Kec. Karang Baru Kab. Aceh Tamiang",
        callCenter: "082275448124",
    },
    {
        letterNumber: "ABCD1234NZZ008",
        institution: "KN. ACEH TENGAH",
        address: "Jl. Lebe Kader No. 25 Kecamatan Bebesen, 24552, Kabupaten Aceh Tengah, Provinsi Aceh",
        callCenter: "0",
    },
    {
        letterNumber: "ABCD1234NZZ009",
        institution: "KN. ACEH TENGGARA",
        address: "Jln,Cut Nyakdien No.203 Kutacane, Aceh Tenggara",
        callCenter: "08116786349",
    },
    {
        letterNumber: "ABCD1234NZZ010",
        institution: "KN. ACEH TIMUR",
        address: "Jl. Petuah Husein No. 06 Gampong Jawa",
        callCenter: "0",
    },
    {
        letterNumber: "ABCD1234NZZ011",
        institution: "KN. ACEH UTARA",
        address: "Jln.Medan_Banda Aceh Desa Alue Buket Kec. Lhoksukon",
        callCenter: "0",
    },
    {
        letterNumber: "ABCD1234NZZ012",
        institution: "KN. AGAM",
        address: "-",
        callCenter: "0",
    },
    {
        letterNumber: "ABCD1234NZZ013",
        institution: "KN. ALOR",
        address: "Jalan Diponegoro No. 58, Teluk Mutiara, Kalabahi, Alor, NTT",
        callCenter: "0",
    },
];

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
        id: 'age',
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

const FinesDashboard = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;

    const paginatedData = defaultData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    const maxPage = Math.ceil(defaultData.length / pageSize);

    return (
        <div className="max-w-screen my-24 space-y-8 w-full py-14 px-8 lg:px-20 bg-gradient-to-br from-[#B4B4B4]/35 to-[#FFE0BD]/35 backdrop-blur-3xl shadow-lg">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between text-[#145374] gap-4">
                <h1 className="font-bold text-3xl">
                    Indonesian Fine List
                </h1>
                <div className="flex justify-end">
                    <form action="" className="flex gap-1">
                        <label className="w-full lg:w-fit">Search</label>
                        <input type="text" placeholder="Search fines here..." className="w-full lg:w-fit py-2 px-3 bg-[#FFF1E2]/65 rounded-lg border-2 border-[#145374] text-xl" />
                    </form>
                </div>
            </div>
            {/* <Table /> */}
            <TanstackTable<Fine> columns={columns} data={defaultData} pageIndex={pageIndex} />
            <div className="w-full flex items-center justify-between text-[#145374] text-lg md:text-xl font-bold">
                <p className="max-w-28 md:max-w-full">
                    Showing {pageIndex * pageSize + paginatedData.length} of {defaultData.length} Entries
                </p>
                <div className="flex gap-3 md:gap-8">
                    <button className={pageIndex === 0 ? "opacity-50" : "" + "cursor-pointer"} disabled={pageIndex === 0} onClick={() => setPageIndex(pageIndex - 1)}>Previos</button>
                    <button className={pageIndex + 1 >= maxPage ? "opacity-50" : "" + "cursor-pointer"} disabled={pageIndex + 1 >= maxPage} onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default FinesDashboard;