//Modal Telescope

function searchTelescope(event) {
    const obj = event.currentTarget;

    // Trim the values to remove any leading/trailing whitespace
    const opt_aperture = obj.dataset.opt_aperture.trim();
    const opt_focal = obj.dataset.opt_focal.trim();

    // Ensure the values are valid before assigning them to the inputs
    document.getElementById("opt_aperture").value = opt_aperture;
    document.getElementById("opt_focal").value = opt_focal;

    $('#modal_telescopes').modal("hide");
    document.getElementById("camera_frames").length ? refreshCameraFrame() : insertCameraFrame();
}

const tableBodyTelescope = document.getElementById("table-body-telescope");
getData();

async function getData() {
    const target = `https://cdn.shopify.com/s/files/1/0753/5280/1565/files/data_telescopes.csv`; //file
        //const target = `https://SOME_DOMAIN.com/api/data/log_csv?$"queryString"`; //target can also be api with req.query

        const response = await fetch(target, {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
                //'Authorization': //in case you need authorisation
            }
        });
        const data = await response.text();
    //const response = await fetch('https://cdn.shopify.com/s/files/1/0753/5280/1565/files/data_telescopes.csv')
    //const data = await response.text();
    const table = data.split('\n');
    table.forEach((row, index) => {
        const columns = row.split(',')
        const manufacturer = columns[0]
        const model = columns[1]
        const opt_aperture = columns[2]
        const opt_focal = columns[3]
        const tr = document.createElement("tr");

        tr.dataset.manufacturer = manufacturer;
        tr.dataset.model = model;
        tr.dataset.opt_aperture = opt_aperture;
        tr.dataset.opt_focal = opt_focal;

        tr.style.cursor = "pointer";
        tr.addEventListener("click", searchTelescope);

        tr.innerHTML = `
					          <td class="align-middle">${manufacturer}</td>
					          <td class="align-middle text-right text-nowrap">${model}</td>
					          <td class="align-middle text-right text-nowrap">${opt_aperture} mm</td>
					          <td class="align-middle text-right text-nowrap">${opt_focal} mm</td>
							`;
        // finally add the <tr> to the <tbody>
        tableBodyTelescope.append(tr);
    })
}

//Modal Telescope Filter

$(document).ready((function () {
    $("#modal_telescopes").on("shown.bs.modal", (function (event) {
        $("#filter_telescopes").focus()
    })), $("#filter_telescopes").on("input", (function () {
        var filter = $(this).val().toLowerCase();
        $("#modal_telescope_table tbody tr").each((function () {
            var filter_telescope;
            ($(this).data("manufacturer").toString().toLowerCase() + " " + $(this).data("model").toString().toLowerCase()).includes(filter) ? $(this).show() : $(this).hide()
        }))
    }))
}));