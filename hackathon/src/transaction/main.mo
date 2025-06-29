import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import IC "ic:aaaaa-aa";

actor Transactor {
  // Dummy datas
  type Ticket = {
    id : Text;
    name : Text;
    amount : Int;
    tnkb : Text;
    penalty : Text;
    date : Int
  };

  let ticket = {
    id : Text = Int.toText(Time.now());
    name : Text = "Gus Ryan";
    amount : Int = 100000;
    tnkb : Text = "DK1121AX";
    penalty : Text = "DUI";
    date : Int = 1750823978
  };

  public query func getTicket() : async Ticket {
    return ticket
  };

  type Transaction = {
    id : Text;
    amount : Nat;
    xendit_id : Text;
    ticket_id : Text;
    status : Text;
    created_at : Nat;
    updated_at : Nat;
    expiry_date : Nat
  };

  var transactions : TrieMap.TrieMap<Text, Transaction> = TrieMap.TrieMap(Text.equal, Text.hash);

  public func addTransaction(t : Transaction) : async () {
    transactions.put(t.id, t)
  };

  public query func getTransactionById(id : Text) : async ?Transaction {
    return transactions.get(id)
  };

  public query func getTransactions() : async [Transaction] {
    return Iter.toArray(transactions.vals())
  };

  //function to transform the response
  public query func transform({
    context : Blob;
    response : IC.http_request_result
  }) : async IC.http_request_result {
    {
      response with headers = []; // not intersted in the headers
    }
  };

  //PULIC METHOD
  //This method sends a POST request to a URL with a free API we can test.
  public func craeteInvoice({ id : Text; amount : Text; payment_method : Text }) : async Text {

    //1. SETUP ARGUMENTS FOR HTTP GET request

    // 1.1 Setup the URL and its query parameters
    //This URL is used because it allows us to inspect the HTTP request sent from the canister
    let host : Text = "xendit.co";
    let url = "https://api.xendit.co/v2/invoices"; //HTTP that accepts IPV6

    // 1.2 prepare headers for the system http_request call

    //idempotency keys should be unique so we create a function that generates them.
    // let idempotency_key : Text = generateUUID();
    let request_headers = [
      { name = "User-Agent"; value = "http_post_sample" },
      { name = "Content-Type"; value = "application/json" },
      {
        name = "Authorization";
        value = "Basic eG5kX2RldmVsb3BtZW50X2FXZzhnRFZieUFmZVE5SURQWTNyY2ZoN3Qxc1VZZDlyT0dCYUM4a1htWm1yNFlXRnJBMHF0bTZpZVI2ZWI5Og=="
      },
      // { name = "Idempotency-Key"; value = idempotency_key },
    ];

    // The request body is a Blob, so we do the following:
    // 1. Write a JSON string
    // 2. Convert Text into a Blob
    let request_body_json : Text = "{\"external_id\":\"" # id #
    "\",\"amount\":" # amount #
    ",\"payer_email\":\"customer@domain.com\""
    # ",\"description\":\"InvoiceDemo#123\""
    # ",\"payment_methods\":[\"" # payment_method # "\"]"
    # ",\"currency\":\"IDR\""
    # ",\"success_redirect_url\":\"http://uzt4z-lp777-77774-qaabq-cai.localhost:4943/history-detail/" # id # "\"}";

    let request_body = Text.encodeUtf8(request_body_json);

    // 1.3 The HTTP request
    let http_request : IC.http_request_args = {
      url = url;
      max_response_bytes = null; //optional for request
      headers = request_headers;
      //note: type of `body` is ?Blob so we pass it here as "?request_body" instead of "request_body"
      body = ?request_body;
      method = #post;
      transform = ?{
        function = transform;
        context = Blob.fromArray([])
      }
    };

    //2. ADD CYCLES TO PAY FOR HTTP REQUEST

    //IC management canister will make the HTTP request so it needs cycles
    //See: https://internetcomputer.org/docs/current/motoko/main/cycles

    //The way Cycles.add() works is that it adds those cycles to the next asynchronous call
    //See:
    // - https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    // - https://internetcomputer.org/docs/current/references/https-outcalls-how-it-works#pricing
    // - https://internetcomputer.org/docs/current/developer-docs/gas-cost
    Cycles.add<system>(230_850_258_000);

    //3. MAKE HTTPS REQUEST AND WAIT FOR RESPONSE
    let http_response : IC.http_request_result = await IC.http_request(http_request);

    //4. DECODE THE RESPONSE

    //As per the type declarations, the BODY in the HTTP response
    //comes back as Blob. Type signature:

    //public type http_request_result = {
    //     status : Nat;
    //     headers : [HttpHeader];
    //     body : Blob;
    // };

    //We need to decode that Blob that is the body into readable text.
    //To do this, we:
    //  1. Use Text.decodeUtf8() method to convert the Blob to a ?Text optional
    //  2. We use a switch to explicitly call out both cases of decoding the Blob into ?Text
    let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
      case (null) { "No value returned" };
      case (?y) { y }
    };

    //5. RETURN RESPONSE OF THE BODY
    let result : Text = decoded_text;
    result
  }
}
