var aladin, container_w, container_h, fov, size, frame_w_px, frame_h_px, frame_x, frame_y,
    opt_focal_effective, res_fov_d_x, res_fov_d_y, res_fov_diag, frame_rotation, frame_color_line, frame_circle_color,
    frame_line_color, frame_line_opacity, aux_camera_model = "", debug = !1,
    targets = ["M 1", "M 17", "M 27", "M 51", "M 65", "M 78", "M 83", "M 104", "NGC 104", "NGC 253", "NGC 1399", "NGC 2070", "NGC 4755"],
    target_select = targets[Math.floor(Math.random() * targets.length)];

function calculateValues() {
    var validacion;
    if (validar("table_input")) {
        var opt_aperture = $("#opt_aperture").val(), opt_focal = $("#opt_focal").val(),
            opt_reductor = $("#opt_reductor").val(), cam_resolution_x = $("#cam_resolution_x").val(),
            cam_resolution_y = $("#cam_resolution_y").val(), cam_pixel_x = $("#cam_pixel_x").val(),
            cam_pixel_y = $("#cam_pixel_y").val(), cam_binning = $("#cam_binning").val();
        fov = aladin.getFov(), size = aladin.getSize(), opt_focal_effective = opt_focal * opt_reductor, $("#res_eff_focal").text(Math.round(opt_focal_effective) + " mm");
        var res_focalratio = Math.round(opt_focal_effective / opt_aperture).toFixed(1);
        $("#res_focalratio").text("F / " + res_focalratio), res_fov_d_x = 57.3 / opt_focal_effective * (cam_pixel_x / 1e3 * cam_resolution_x), res_fov_d_y = 57.3 / opt_focal_effective * (cam_pixel_y / 1e3 * cam_resolution_y), res_fov_diag = Math.sqrt(res_fov_d_x ** 2 + res_fov_d_y ** 2), $("#res_fov_d").text(res_fov_d_x.toFixed(2) + "º x " + res_fov_d_y.toFixed(2) + "º"), $("#res_fov_diag").text(res_fov_diag.toFixed(2) + "º"), $("#frame_1_circle_text").text("⌀ " + res_fov_diag.toFixed(2) + "º");
        var res_resolution_x = cam_pixel_x / opt_focal_effective * 206.265 * cam_binning,
            res_resolution_y = cam_pixel_y / opt_focal_effective * 206.265 * cam_binning;
        $("#res_resolution").text(res_resolution_x.toFixed(2) + '" x ' + res_resolution_y.toFixed(2) + '" per px');
        var rayleigh_resolution = 138 / opt_aperture;
        $("#rayleigh_resolution").text(rayleigh_resolution.toFixed(3) + '"');
        var dawes_resolution = 116 / opt_aperture;
        $("#dawes_resolution").text(dawes_resolution.toFixed(3) + '"'), frame_w_px = Math.round(res_fov_d_x * size[0] / fov[0]), frame_h_px = Math.round(res_fov_d_y * size[1] / fov[1]), frame_x = Math.round(container_w / 2 - frame_w_px / 2), frame_y = Math.round(container_h / 2 - frame_h_px / 2), debug && console.log(fov, size, frame_w_px, frame_h_px, frame_x, frame_y), frame_rotation = $("#frame_rotation").val(), frame_color_line = $("#frame_color_line").val(), frame_circle_color = $("#frame_circle_color").val(), frame_line_color = $("#frame_line_color").val(), frame_line_opacity = $("#frame_line_opacity").val(), $("#frame_rotation_txt").val($("#frame_rotation").val() + "º"), $("#frame_line_opacity_txt").val($("#frame_line_opacity").val())
    }
}

function refreshCameraFrame() {
    if (!$("#camera_frames").length) return !1;
    switch (calculateValues(), $("#frame_1_rect").attr("width", frame_w_px), $("#frame_1_rect").attr("height", frame_h_px), $("#frame_1_rect").attr("x", frame_x), $("#frame_1_rect").attr("y", frame_y), $("#frame_1_principal").css("transform", "rotate(" + frame_rotation + "deg)"), $("#frame_1_rect").css("stroke", frame_color_line), $("#frame_1_text").attr("x", frame_x), $("#frame_1_text").attr("y", frame_y + frame_h_px + 20), $("#frame_1_text").text(res_fov_d_x.toFixed(2) + "º x " + res_fov_d_y.toFixed(2) + "º (F = " + Math.round(opt_focal_effective) + " mm)"), $("#frame_1_text").attr("fill", frame_color_line), $("#frame_1_text_camera").attr("fill", frame_color_line), $("#frame_1_text_camera").attr("x", frame_x), $("#frame_1_text_camera").attr("y", frame_y - 10), "" != aux_camera_model ? ($("#frame_1_text_camera").css("opacity", 1), $("#frame_1_text_camera").text(aux_camera_model)) : $("#frame_1_text_camera").css("opacity", 0), $("#frame_1_circle").attr("cx", Math.round(container_w / 2)), $("#frame_1_circle").attr("cy", Math.round(container_h / 2)), $("#frame_1_circle").attr("r", Math.round(Math.sqrt(frame_w_px ** 2 + frame_h_px ** 2) / 2)), $("#frame_1_circle").css("stroke", frame_circle_color), $("#frame_1_circle_text").css("fill", frame_circle_color), $("#frame_1_circle_text").attr("x", Math.round(container_w / 2)), $("#frame_1_circle_text").attr("y", Math.round(container_h / 2 + Math.sqrt(frame_w_px ** 2 + frame_h_px ** 2) / 2) + 15), $("#frame_circle_1").is(":checked") ? $("#frame_1_circle_g").css("opacity", 1) : $("#frame_1_circle_g").css("opacity", 0), $("#frame_1_disk").attr("cx", Math.round(container_w / 2)), $("#frame_1_disk").attr("cy", Math.round(container_h / 2)), $("#frame_1_disk").attr("r", Math.round(.5 * size[0] / fov[0] / 2)), $("#frame_1_disk_text").attr("x", Math.round(container_w / 2)), $("#frame_1_disk_text").attr("y", Math.round(container_h / 2 + Math.round(.5 * size[0] / fov[0] / 2)) + 20), $("#frame_disk").is(":checked") ? $("#frame_1_disk_g").css("opacity", 1) : $("#frame_1_disk_g").css("opacity", 0), $("#frame_1_third").attr("stroke", frame_line_color), $("#frame_1_diagonales").attr("stroke", frame_line_color), $("#frame_1_phi").attr("stroke", frame_line_color), $("#frame_1_third").css("transform", "rotate(" + frame_rotation + "deg)"), $("#frame_1_third_h1").attr("x1", Math.round(frame_x + frame_w_px / 3)), $("#frame_1_third_h1").attr("x2", Math.round(frame_x + frame_w_px / 3)), $("#frame_1_third_h1").attr("y1", frame_y), $("#frame_1_third_h1").attr("y2", frame_y + frame_h_px), $("#frame_1_third_h2").attr("x1", Math.round(frame_x + frame_w_px / 3 * 2)), $("#frame_1_third_h2").attr("x2", Math.round(frame_x + frame_w_px / 3 * 2)), $("#frame_1_third_h2").attr("y1", frame_y), $("#frame_1_third_h2").attr("y2", frame_y + frame_h_px), $("#frame_1_third_v1").attr("x1", frame_x), $("#frame_1_third_v1").attr("x2", frame_x + frame_w_px), $("#frame_1_third_v1").attr("y1", Math.round(frame_h_px / 3 + frame_y)), $("#frame_1_third_v1").attr("y2", Math.round(frame_h_px / 3 + frame_y)), $("#frame_1_third_v2").attr("x1", frame_x), $("#frame_1_third_v2").attr("x2", frame_x + frame_w_px), $("#frame_1_third_v2").attr("y1", Math.round(frame_h_px / 3 * 2 + frame_y)), $("#frame_1_third_v2").attr("y2", Math.round(frame_h_px / 3 * 2 + frame_y)), $("#frame_1_diagonales").css("transform", "rotate(" + frame_rotation + "deg)"), $("#frame_1_diagonales_d1").attr("x1", frame_x), $("#frame_1_diagonales_d1").attr("x2", frame_x + frame_h_px), $("#frame_1_diagonales_d1").attr("y1", frame_y), $("#frame_1_diagonales_d1").attr("y2", frame_y + frame_h_px), $("#frame_1_diagonales_d2").attr("x1", frame_x + frame_w_px), $("#frame_1_diagonales_d2").attr("x2", Math.round(container_w / 2 + frame_w_px / 2 - frame_h_px)), $("#frame_1_diagonales_d2").attr("y1", frame_y), $("#frame_1_diagonales_d2").attr("y2", frame_y + frame_h_px), $("#frame_1_diagonales_d3").attr("x1", Math.round(container_w / 2 + frame_w_px / 2 - frame_h_px)), $("#frame_1_diagonales_d3").attr("x2", frame_x + frame_w_px), $("#frame_1_diagonales_d3").attr("y1", frame_y), $("#frame_1_diagonales_d3").attr("y2", Math.round(container_h / 2 + frame_h_px / 2)), $("#frame_1_diagonales_d4").attr("x1", frame_x), $("#frame_1_diagonales_d4").attr("x2", frame_x + frame_h_px), $("#frame_1_diagonales_d4").attr("y1", frame_y + frame_h_px), $("#frame_1_diagonales_d4").attr("y2", frame_y), $("#frame_1_phi").css("transform", "rotate(" + frame_rotation + "deg)"), $("#frame_1_phi_h1").attr("x1", Math.round(container_w / 2 - frame_w_px / 2 + .618 * frame_w_px)), $("#frame_1_phi_h1").attr("x2", Math.round(container_w / 2 - frame_w_px / 2 + .618 * frame_w_px)), $("#frame_1_phi_h1").attr("y1", frame_y), $("#frame_1_phi_h1").attr("y2", frame_y + frame_h_px), $("#frame_1_phi_h2").attr("x1", Math.round(container_w / 2 - frame_w_px / 2 + frame_w_px - .618 * frame_w_px)), $("#frame_1_phi_h2").attr("x2", Math.round(container_w / 2 - frame_w_px / 2 + frame_w_px - .618 * frame_w_px)), $("#frame_1_phi_h2").attr("y1", frame_y), $("#frame_1_phi_h2").attr("y2", frame_y + frame_h_px), $("#frame_1_phi_v1").attr("x1", frame_x), $("#frame_1_phi_v1").attr("x2", frame_x + frame_w_px), $("#frame_1_phi_v1").attr("y1", Math.round(container_h / 2 - frame_h_px / 2 + frame_h_px - .618 * frame_h_px)), $("#frame_1_phi_v1").attr("y2", Math.round(container_h / 2 - frame_h_px / 2 + frame_h_px - .618 * frame_h_px)), $("#frame_1_phi_v2").attr("x1", frame_x), $("#frame_1_phi_v2").attr("x2", frame_x + frame_w_px), $("#frame_1_phi_v2").attr("y1", Math.round(container_h / 2 - frame_h_px / 2 + .618 * frame_h_px)), $("#frame_1_phi_v2").attr("y2", Math.round(container_h / 2 - frame_h_px / 2 + .618 * frame_h_px)), $("input[name=frame_line]:checked").val()) {
        case"frame_line_off":
            $("#frame_1_third, #frame_1_diagonales, #frame_1_phi").css("opacity", 0);
            break;
        case"frame_line_third":
            $("#frame_1_third").css("opacity", frame_line_opacity), $("#frame_1_diagonales").css("opacity", 0), $("#frame_1_phi").css("opacity", 0);
            break;
        case"frame_line_diag":
            $("#frame_1_third").css("opacity", 0), $("#frame_1_diagonales").css("opacity", frame_line_opacity), $("#frame_1_phi").css("opacity", 0);
            break;
        case"frame_line_phi":
            $("#frame_1_third").css("opacity", 0), $("#frame_1_diagonales").css("opacity", 0), $("#frame_1_phi").css("opacity", frame_line_opacity)
    }
}

function insertCameraFrame() {
    if ($("#camera_frames").length) return !1;
    if (calculateValues(), $("#btn_adjust_fov").attr("disabled", !1), (res_fov_diag > fov[0] || res_fov_diag > fov[1]) && adjust_fov(), $("#frame_circle_1").is(":checked")) var frame_1_circle_opacity = 1; else var frame_1_circle_opacity = 0;
    if ($("#frame_disk").is(":checked")) var frame_1_disk_opacity = 1; else var frame_1_disk_opacity = 0;
    if ("" != aux_camera_model) var frame_1_text_camara_opacity = 1; else var frame_1_text_camara_opacity = 0;
    switch ($("input[name=frame_line]:checked").val()) {
        case"frame_line_off":
            frame_line_opacity_third = 0, frame_line_opacity_diagonales = 0, frame_line_opacity_phi = 0;
            break;
        case"frame_line_third":
            frame_line_opacity_third = frame_line_opacity, frame_line_opacity_diagonales = 0, frame_line_opacity_phi = 0;
            break;
        case"frame_line_diag":
            frame_line_opacity_third = 0, frame_line_opacity_diagonales = frame_line_opacity, frame_line_opacity_phi = 0;
            break;
        case"frame_line_phi":
            frame_line_opacity_third = 0, frame_line_opacity_diagonales = 0, frame_line_opacity_phi = frame_line_opacity
    }
    var camera_frame_html = "";
    camera_frame_html += '<div id="camera_frames" style="position: absolute; pointer-events: none;">', camera_frame_html += '  <svg id="camera_frame_1" fill="transparent" xmlns="http://www.w3.org/2000/svg" width="' + container_w + '" height="' + container_h + '">', camera_frame_html += '    <g id="frame_1_principal" style="transform: rotate(' + frame_rotation + 'deg); transform-origin: center;">', camera_frame_html += '      <rect id="frame_1_rect" style="stroke-width: 2; stroke: ' + frame_color_line + ';" width="' + frame_w_px + '" height="' + frame_h_px + '" x="' + frame_x + '" y="' + frame_y + '"></rect>', camera_frame_html += '      <text id="frame_1_text" x="' + frame_x + '" y="' + (frame_y + frame_h_px + 20) + '" fill="' + frame_color_line + '" style="font-weight: bold; font-size: 1rem;">' + res_fov_d_x.toFixed(2) + "º x " + res_fov_d_y.toFixed(2) + "º (F = " + Math.round(opt_focal_effective) + " mm)</text>", camera_frame_html += '      <text id="frame_1_text_camera" x="' + frame_x + '" y="' + (frame_y - 10) + '" fill="' + frame_color_line + '" style="font-weight: bold; font-size: 1rem; opacity: ' + frame_1_text_camara_opacity + '">' + aux_camera_model + "</text>", camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_circle_g" style="opacity: ' + frame_1_circle_opacity + ';">', camera_frame_html += '      <circle id="frame_1_circle" style="stroke-width: 1; stroke: ' + frame_circle_color + ';" cx="' + Math.round(container_w / 2) + '" cy="' + Math.round(container_h / 2) + '" r="' + Math.round(Math.sqrt(frame_w_px ** 2 + frame_h_px ** 2) / 2) + '"></circle>', camera_frame_html += '      <text id="frame_1_circle_text" text-anchor="middle" x="' + Math.round(container_w / 2) + '" y="' + Math.round(container_h / 2 + Math.sqrt(frame_w_px ** 2 + frame_h_px ** 2) / 2) + '15" fill="' + frame_circle_color + '" style="font-weight: bold; font-size: 0.8rem;">⌀ ' + res_fov_diag.toFixed(2) + "º</text>", camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_disk_g" style="opacity: ' + frame_1_disk_opacity + ';">', camera_frame_html += '      <circle id="frame_1_disk" style="stroke-width: 1; stroke: #ffd138" fill="#ffd138" fill-opacity="0.2" cx="' + Math.round(container_w / 2) + '" cy="' + Math.round(container_h / 2) + '" r="' + Math.round(.5 * size[0] / fov[0] / 2) + '"></circle>', camera_frame_html += '      <text id="frame_1_disk_text" text-anchor="middle" x="' + Math.round(container_w / 2) + '" y="' + Math.round(container_h / 2 + Math.round(.5 * size[0] / fov[0] / 2)) + '20" fill="#ffd138" style="font-weight: bold; font-size: 0.8rem;">0.5º</text>', camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_third" stroke="#ffffff" style="opacity: ' + frame_line_opacity_third + "; transform: rotate(" + frame_rotation + 'deg); transform-origin: center;">', camera_frame_html += '      <line id="frame_1_third_h1" x1="' + Math.round(frame_x + frame_w_px / 3) + '" x2="' + Math.round(frame_x + frame_w_px / 3) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_third_h2" x1="' + Math.round(frame_x + frame_w_px / 3 * 2) + '" x2="' + Math.round(frame_x + frame_w_px / 3 * 2) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_third_v1" x1="' + frame_x + '" x2="' + (frame_x + frame_w_px) + '" y1="' + Math.round(frame_h_px / 3 + frame_y) + '" y2="' + Math.round(frame_h_px / 3 + frame_y) + '"></line>', camera_frame_html += '      <line id="frame_1_third_v2" x1="' + frame_x + '" x2="' + (frame_x + frame_w_px) + '" y1="' + Math.round(frame_h_px / 3 * 2 + frame_y) + '" y2="' + Math.round(frame_h_px / 3 * 2 + frame_y) + '"></line>', camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_diagonales" stroke="#ffffff" style="opacity: ' + frame_line_opacity_diagonales + "; transform: rotate(" + frame_rotation + 'deg); transform-origin: center;">', camera_frame_html += '      <line id="frame_1_diagonales_d1" x1="' + frame_x + '" x2="' + (frame_x + frame_h_px) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_diagonales_d2" x1="' + (frame_x + frame_w_px) + '" x2="' + Math.round(container_w / 2 + frame_w_px / 2 - frame_h_px) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_diagonales_d3" x1="' + Math.round(container_w / 2 + frame_w_px / 2 - frame_h_px) + '" x2="' + (frame_x + frame_w_px) + '" y1="' + frame_y + '" y2="' + Math.round(container_h / 2 + frame_h_px / 2) + '"></line>', camera_frame_html += '      <line id="frame_1_diagonales_d4" x1="' + frame_x + '" x2="' + (frame_x + frame_h_px) + '" y1="' + (frame_y + frame_h_px) + '" y2="' + frame_y + '"></line>', camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_phi" stroke="#ffffff" style="opacity: ' + frame_line_opacity_phi + "; transform: rotate(" + frame_rotation + 'deg); transform-origin: center;">', camera_frame_html += '      <line id="frame_1_phi_h1" x1="' + Math.round(container_w / 2 - frame_w_px / 2 + .618 * frame_w_px) + '" x2="' + Math.round(container_w / 2 - frame_w_px / 2 + .618 * frame_w_px) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_phi_h2" x1="' + Math.round(container_w / 2 - frame_w_px / 2 + frame_w_px - .618 * frame_w_px) + '" x2="' + Math.round(container_w / 2 - frame_w_px / 2 + frame_w_px - .618 * frame_w_px) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_phi_v1" x1="' + frame_x + '" x2="' + (frame_x + frame_w_px) + '" y1="' + Math.round(container_h / 2 - frame_h_px / 2 + frame_h_px - .618 * frame_h_px) + '" y2="' + Math.round(container_h / 2 - frame_h_px / 2 + frame_h_px - .618 * frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_phi_v2" x1="' + frame_x + '" x2="' + (frame_x + frame_w_px) + '" y1="' + Math.round(container_h / 2 - frame_h_px / 2 + .618 * frame_h_px) + '" y2="' + Math.round(container_h / 2 - frame_h_px / 2 + .618 * frame_h_px) + '"></line>', camera_frame_html += "    </g>", camera_frame_html += "  </svg>", camera_frame_html += "</div>", $(camera_frame_html).insertBefore(".aladin-reticle")
}

function adjust_fov() {
    null != res_fov_diag && aladin.setFov(res_fov_diag + 40 * res_fov_diag / 100)
}

function validar(container) {
    return validacion = !0, $("#" + container + " > input[type=number], #" + container + " > input[type=text]").each((function () {
        var input_id = $(this).attr("id"), validity = document.getElementById(input_id).checkValidity();
        debug && console.info(input_id + ": " + validity), $("#" + input_id).removeClass("is-invalid"), validity || ($("#" + input_id).addClass("is-invalid"), validacion = !1)
    })), validacion
}

$("#aladin_search").val(target_select), A.init.then(() => {
    if (aladin = A.aladin("#aladin-lite-div", {
        survey: $("#aladin_survey").val(),
        fov: 3,
        target: target_select,
        showZoomControl: !0,
        showFullscreenControl: !1,
        showProjectionControl: !1,
        showLayersControl: !1,
    }), 0 == $("#aladin-lite-div").data("mobile")) {
        const observer = new MutationObserver(() => {
            refreshCameraFrame(), debug && console.log("Change of FOV - desktop")
        });
        observer.observe($(".aladin-fov")[0], {childList: !0, subtree: !0})
    } else {
        var fov_aux = 0;
        const mobile_fov_update = setInterval((function () {
            fov_aux != fov && (fov_aux = fov, refreshCameraFrame(), debug && console.log("Change of FOV - mobile"))
        }), 500)
    }
    $("#frame_reticle").on("change", (function () {
        $("#frame_reticle").is(":checked") ? aladin.reticle._show(!0) : aladin.reticle._show(!1)
    }))
}), $(document).ready((function () {
    $("#btn_adjust_fov").attr("disabled", !0), container_w = $("#aladin-lite-div").width(), container_h = $("#aladin-lite-div").height(), $(window).on("resize", $.debounce(500, (function () {
        0 == $("#aladin-lite-div").data("mobile") ? (container_w = $("#aladin-lite-div").width(), container_h = $("#aladin-lite-div").height()) : (container_h = container_w = $("#aladin-lite-div").width(), $("#aladin-lite-div").height(container_h)), $("#camera_frame_1").attr("width", container_w), $("#camera_frame_1").attr("height", container_h), refreshCameraFrame()
    }))), $("#btn_calculate").on("click", (function () {
        $("#camera_frames").length ? refreshCameraFrame() : insertCameraFrame();
        adjust_fov();
    })), $("#opt_aperture, #opt_focal").on("input", (function () {
        $("#camera_frames").length && refreshCameraFrame()
    })), $("#cam_resolution_x, #cam_resolution_y, #cam_pixel_x, #cam_pixel_y").on("input", (function () {
        aux_camera_model = "", $("#camera_frames").length && refreshCameraFrame()
    })), $("#opt_reductor, #cam_binning").on("change", (function () {
        $("#camera_frames").length && refreshCameraFrame()
    })), $("#frame_rotation, #frame_color_line, #frame_circle_color, #frame_line_color, #frame_line_opacity").on("input", (function () {
        $("#frame_rotation_txt").val($("#frame_rotation").val() + "º"), $("#frame_line_opacity_txt").val($("#frame_line_opacity").val()), $("#camera_frames").length && refreshCameraFrame()
    })), $("#frame_circle_1").on("change", (function () {
        $("#camera_frames").length && refreshCameraFrame()
    })), $("#frame_disk").on("change", (function () {
        $("#camera_frames").length && refreshCameraFrame()
    })), $("input[name=frame_line]").on("change", (function () {
        $("#camera_frames").length && refreshCameraFrame()
    })), $("#frame_rotation_reset").on("click", (function () {
        $("#frame_rotation").val(0), refreshCameraFrame()
    })), $("#aladin_survey").on("change", (function () {
        aladin.setImageSurvey($("#aladin_survey").val())
    })), $("#aladin_search").on("keypress", (function (e) {
        if (13 === e.which) {
            var search_val = $("#aladin_search").val();
            "" != search_val && aladin.gotoObject(search_val)
        }
    })), $("#btn_adjust_fov").on("click", (function () {
        adjust_fov()
    })), $("input[type='text'], input[type='number'], input[type='search']").on("focus", (function () {
        $(this).select()
    }))
}));