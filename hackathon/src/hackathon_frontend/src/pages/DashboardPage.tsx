import { useEffect, useRef } from "react";
import FeatureDashboard from "../components/dashboard/features";
import HeroDashboard from "../components/dashboard/hero";
import { useFineController } from "../controllers/fine-controller";

const DashboardPage = () => {
    return (
        <div>
            <HeroDashboard />
            <FeatureDashboard />
        </div>
    );
}

export default DashboardPage;