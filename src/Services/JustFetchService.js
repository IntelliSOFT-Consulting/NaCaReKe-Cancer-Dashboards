let DHIS_USERNAME = process.env.DHIS_USERNAME;
let DHIS_PASSWORD = process.env.DHIS_PASSWORD;
let REACT_APP_ENV = process.env.REACT_APP_ENV;
let justFetch = async (endpoint, postoptions) => {
  let showLoading = postoptions.showLoading;
//   if (showLoading != "false") {
//     $(".graph").html(
//       `<div class="col-md-12 text-center p-t-15">${loading_template_plain}</div>`
//     );
//   }
  if (endpoint == null || endpoint.length < 4) {
    return { error: true, type: "url", message: "Invalid endpoint URL" };
  }
  let options = postoptions || {};
  let req_method = options.method || "GET"; //PUT //POST //DELETE etc.
  let req_hd = {};
  let headers = {};
  if (REACT_APP_ENV == 'dev' || REACT_APP_ENV == 'development') {
    headers.authorization =
      'Basic ' +
      Buffer.from(DHIS_USERNAME + ':' + DHIS_PASSWORD).toString('base64');
  }
  req_hd.headers = headers;
  req_hd.method = req_method;
  //body for POST/PUT requests
  if (req_method != 'GET') {
    req_hd.body = JSON.stringify(options.body); //Stringify here, not in source
  }
  let final_endpoint = endpoint;
  // if (!window.location.hostname.includes("127.0.0.1") || REACT_APP_ENV == 'dev' || REACT_APP_ENV == 'development') {
  //   let encurl = window.encodeURIComponent(window.btoa(endpoint));
  //   // console.log("encurl = " + encurl);
  //   final_endpoint = "http://127.0.0.1:5600/request/" + encurl;
  //   // console.log("final end", final_endpoint);
  // }
  req_hd.headers = headers; 
  req_hd.method = req_method;
  req_hd.Accept = "application/json";

  // console.log(`justFetch: ${final_endpoint} with headers: ${JSON.stringify(req_hd)}`);
  try {
    let result = await window.fetch(final_endpoint, req_hd);
    let result_json = await result.json();
    if (result_json.status === "ERROR") {
      throw result_json;
    }
    return result_json;
  } catch (err) {
    return { error: true, msg: err.message };
  }
};

export { justFetch };
