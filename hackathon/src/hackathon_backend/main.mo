import Fines "Fines";

actor HackathonBackend {

    public type Fine = Fines.Fine;

    private stable var fines: [Fine] = Fines.initialFines;

    public query func getAllFines() : async [Fine] {
        return fines;
    };
}