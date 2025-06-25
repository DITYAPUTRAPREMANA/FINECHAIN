import Array "mo:base/Array";
import Cycles "mo:base/ExperimentalCycles";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
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
    vehicleColor : Text;
    createdAt : Int
  };

  stable var latestData : Text = "";

  stable var fines : [Fine] = [];

  public func addFine(f : Fine) : async () {
    fines := Array.append(fines, [f])
  };

  public query func getFines() : async [Fine] {
    return fines
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

    Cycles.add(2_000_000_000);

    let response = await IC.http_request(http_request);

    let body_text = switch (Text.decodeUtf8(response.body)) {
      case (?text) text;
      case null "Gagal decode body"
    };

    latestData := body_text;

    body_text
  };

  public query func getLatestData() : async Text {
    latestData
  };

}
