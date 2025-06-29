// Fines.mo
module {
    public type Fine = {
        letterNumber: Text;
        institution: Text;
        address: Text;
        callCenter: Text;
    };

    public let initialFines: [Fine] = [
        {
            letterNumber = "BKND01-A1B2C3";
            institution = "KN. JAKARTA PUSAT";
            address = "Jl. Medan Merdeka No. 1";
            callCenter = "0213842021";
        },
        {
            letterNumber = "BKND02-D4E5F6";
            institution = "KN. BANDUNG";
            address = "Jl. Diponegoro No. 22";
            callCenter = "0227206249";
        },
        {
            letterNumber = "BKND03-G7H8I9";
            institution = "KN. SURABAYA";
            address = "Jl. Pahlawan No. 110";
            callCenter = "0313528829";
        }
    ];
}