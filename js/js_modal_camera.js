//Modal Camera

function searchCamera(event) {
    const obj = event.currentTarget;

    // Trim the values to remove any leading/trailing whitespace
    const manufacturer = obj.dataset.manufacturer.trim();
    const model = obj.dataset.model.trim();
    const pixelSize = obj.dataset.pixel.trim();
    const resolutionX = obj.dataset.resX.trim();
    const resolutionY = obj.dataset.resY.trim();

    aux_camera_model = manufacturer + " " + model;

    // Ensure the values are valid before assigning them to the inputs
    document.getElementById("cam_pixel_x").value = pixelSize;
    document.getElementById("cam_pixel_y").value = pixelSize;
    document.getElementById("cam_resolution_x").value = resolutionX;
    document.getElementById("cam_resolution_y").value = resolutionY;

    $('#modal_cameras').modal("hide");
    document.getElementById("camera_frames").length ? refreshCameraFrame() : insertCameraFrame();
}

const tableBody = document.getElementById("table-body-camera");
getData()

async function getData() {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0753/5280/1565/files/data_cameras.csv')
    const data = await response.text();

    const table = data.split('\n');
    table.forEach((row, index) => {
        const columns = row.split(',')
        const manufacturer = columns[0]
        const model = columns[1]
        const pixel_size = columns[2]
        const resolution_x = columns[3]
        const resolution_y = columns[4]
        const tr = document.createElement("tr");
        tr.dataset.manufacturer = manufacturer;
        tr.dataset.model = model;
        tr.dataset.pixel = pixel_size;
        tr.dataset.resX = resolution_x;
        tr.dataset.resY = resolution_y;
        tr.style.cursor = "pointer";
        tr.addEventListener("click", searchCamera);

        tr.innerHTML = `
					          <td class="align-middle">${manufacturer}</td>
					          <td class="align-middle text-right text-nowrap">${model}</td>
					          <td class="align-middle text-right text-nowrap">${pixel_size} μm</td>
					          <td class="align-middle text-right text-nowrap">${resolution_x} x ${resolution_y} px</td>
							`;

        // finally add the <tr> to the <tbody>
        tableBody.append(tr);
    })
}


//Modal Camera Filter

$(document).ready((function () {
    $("#modal_cameras").on("shown.bs.modal", (function (event) {
            $("#filter_camera").focus()
        })), $("#filter_camera").on("input", (function () {
            var filter = $(this).val().toLowerCase();
            $("#modal_cameras_table tbody tr").each((function () {
                var filter_camera;
                ($(this).data("manufacturer").toString().toLowerCase() + " " + $(this).data("model").toString().toLowerCase()).includes(filter) ? $(this).show() : $(this).hide()
            }))
        }))
}));

