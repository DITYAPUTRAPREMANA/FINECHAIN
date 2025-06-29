import Array "mo:base/Array";
import Cycles "mo:base/ExperimentalCycles";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Option "mo:base/Option";
import IC "ic:aaaaa-aa";

actor {

  public type Fine = {
    letterNumber : Text;
    institution : Text;
    address : Text;
    callCenter : Text;
    name : Text;
    date : Text;
    penaltyType : Text;
    totalFine : Int;
    TNKB : Text;
    vehicleType : Text;
    merk : Text;
    status : Text;
    transactionId : Text;
    vehicleColor : Text;
    createdAt : Int
  };

  stable var fines : [Fine] = [];

  public func addFine(f : Fine) : async () {
    fines := Array.append(fines, [f])
  };

  public query func getFines() : async [Fine] {
    return fines
  };

  stable var latestData : Text = "";

  public query func getLatestData() : async Text {
    latestData
  };

  public query func transform(arg : { context : Blob; response : IC.http_request_result }) : async IC.http_request_result {
    arg.response
  };

  public shared ({ caller }) func getDataFromFirebase() : async Text {
    let firebaseHost : Text = "finechain-df267-default-rtdb.firebaseio.com";
    let firebasePath : Text = "/fines.json";
    let url : Text = "https://" # firebaseHost # firebasePath;

    let request_headers = [
      { name = "User-Agent"; value = "motoko-canister" },
    ];

    let http_request : IC.http_request_args = {
      url = url;
      max_response_bytes = null;
      headers = request_headers;
      body = null;
      method = #get;
      transform = ?{
        function = transform;
        context = Blob.fromArray([])
      }
    };

    Cycles.add(30_000_000_000);

    let response = await IC.http_request(http_request);

    let body_text = switch (Text.decodeUtf8(response.body)) {
      case (?text) text;
      case null "Gagal decode body"
    };

    latestData := body_text;

    body_text
  };

  public query func getFineDetail(letterNumber : Text) : async ?Fine {
    for (fine in fines.vals()) {
      if (fine.letterNumber == letterNumber) {
        return ?fine
      }
    };
    return null
  };

  public type ChangeLog = {
    letterNumber : Text;
    fieldChanged : Text;
    oldStatus : Text;
    newStatus : Text;
    oldTrans : Text;
    newTrans : Text;
    updatedAt : Int
  };

  stable var changeLogs : [ChangeLog] = [];

  public func updateFineStatus(letterNumber : Text, newStatus : Text, newTransactionId : Text) : async Bool {
    var updated = false;
    let currentTime = Time.now() / 1_000_000;
    var changed = "status";

    if (newTransactionId == "empty") {
      changed := "status and transaction id"
    };

    var updatedFines = Array.map<Fine, Fine>(
      fines,
      func(f : Fine) {
        if (f.letterNumber == letterNumber) {
          if (f.status != newStatus) {
            changeLogs := Array.append(changeLogs, [{ letterNumber = f.letterNumber; fieldChanged = changed; oldStatus = f.status; newStatus = newStatus; oldTrans = f.transactionId; newTrans = newTransactionId; updatedAt = currentTime }]);

            updated := true;

            return {
              letterNumber = f.letterNumber;
              institution = f.institution;
              address = f.address;
              callCenter = f.callCenter;
              name = f.name;
              date = f.date;
              penaltyType = f.penaltyType;
              totalFine = f.totalFine;
              TNKB = f.TNKB;
              vehicleType = f.vehicleType;
              merk = f.merk;
              status = newStatus;
              transactionId = newTransactionId;
              vehicleColor = f.vehicleColor;
              createdAt = f.createdAt
            }
          }
        };
        return f
      },
    );

    if (updated) {
      fines := updatedFines
    };

    return updated
  };

}
