import { hackathon_backend } from 'declarations/hackathon_backend';
import { useEffect, useState } from "react";
import { useFirebaseController } from "../controllers/firebase-controller";

type BackendFine = Awaited<ReturnType<typeof hackathon_backend.getFines>>[number];

export function useFineController() {

    const { getFines } = useFirebaseController();
    const [fines, setFines] = useState<BackendFine[]>([]);
    const [textFines, setTextFines] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleAddFines = async () => {
        setIsLoading(true);

        const firebaseFines = await getFines();

        if (!Array.isArray(firebaseFines)) {
            console.error("Failed to Fetch Firebase.");
            return;
        }

        const backendFines = await hackathon_backend.getFines();

        const existingLetterNumbers = new Set(backendFines.map(f => f.letterNumber));

        const newFines = firebaseFines.filter(f => !existingLetterNumbers.has(f.letterNumber));
        const convertedFines = newFines as BackendFine[];

        await Promise.all(
            convertedFines.map(f => hackathon_backend.addFine(f))
        );

        await fetchFines();
        setIsLoading(false);
    };

    const fetchFines = async () => {
        const result = await hackathon_backend.getFines();
        setFines(result);
    };
    
    const fetchLatestData = async () => {
        await hackathon_backend.getDataFromFirebase();
        const result = await hackathon_backend.getLatestData();
        setTextFines(result);
    };

    const displayFines = async () => {
        const result = await getFines();
        console.log(result);
    };

    return {
        fines,
        textFines,
        isLoading,
        displayFines,
        fetchFines,
        handleAddFines,
        fetchLatestData
    };
}