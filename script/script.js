import { omk } from "./omk.js";
import { params } from "./authParams.js";

const user = new omk(params);

user.getUser((u) => console.log(u));

function addData(e, d) {
    const data = {};
    d["o:resource_template_property"].forEach((p) => {
        const prop = user.getPropTerm(p["o:property"]["o:id"]);
        data[prop] = "new item";
    });
    user.createRessource(data);
    console.log("item successfully added");
}

function loadRT() {
    const tableRT = d3.select("#tableRT");
    user.getRT((res) => {
        const rows = tableRT.selectAll("tr").data(res).enter().append("tr");

        rows
            .append("td")
            .append("a")
            .attr("href", (d) => d["@id"])
            .attr("target", "_blank")
            .text((d) => d["o:label"]);


            
        rows
            .append("td")
            .append("button")
            .attr("type", "button")
            .attr("class", "btn btn-success mx-5")
            .html('<i class="bi bi-plus-square-dotted"></i>')
            .on("click", function (d) {
                addData(d, d);
            });
    });
}

//loadRT();

function showItems(query, cb = false) {
    let url = me.api + "items?per_page=" + perPage + "&" + query + "&page=",
      fin = false,
      rs = [],
      data,
      page = 1;
    while (!fin) {
      data = syncRequest(url + page);
      fin = data.length ? false : true;
      rs = rs.concat(data);
      page++;
    }
    if (cb) cb(rs);
    return rs;
  };

showItems();