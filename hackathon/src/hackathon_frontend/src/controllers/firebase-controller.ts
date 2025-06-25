import { hackathon_backend } from 'declarations/hackathon_backend';
import { useState } from 'react';

export function useFirebaseController() {
    type Fine = {
        letterNumber: string;
        institution: string;
        address: string;
        createdAt: bigint;
        callCenter: string;
        name: string;
        date: string;
        penaltyType: string;
        totalFine: bigint;
        TNKB: string;
        vehicleType: string;
        merk: string;
        status: string;
        vehicleColor: string;
    };


    function getLastSyncTime(): bigint {
        const data = localStorage.getItem("lastSync");
        return data ? BigInt(JSON.parse(data).lastSync) : BigInt(0);
    }

    function saveLastSync(timestamp: bigint) {
        localStorage.setItem("lastSync", JSON.stringify({ lastSync: timestamp.toString() }));
    }

    const getFines = async () => {
        await hackathon_backend.getDataFromFirebase();
        const jsonString = await hackathon_backend.getLatestData();

        type FirebaseFine = Record<string, Fine>;
        const parsed = JSON.parse(jsonString) as FirebaseFine;

        const lastSync = getLastSyncTime();

        const fines: Fine[] = Object.values(parsed).map((f: any) => ({
            ...f,
            createdAt: BigInt(f.createdAt),
            totalFine: BigInt(f.totalFine)
        }))
            .filter((fine) => fine.createdAt >= lastSync);

        if (fines.length > 0) {
            const maxCreatedAt = fines.reduce((max, fine) => fine.createdAt > max ? fine.createdAt : max, fines[0].createdAt);
            saveLastSync(maxCreatedAt);
        }

        return fines;
    };

    return {
        getFines
    };
}

