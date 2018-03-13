var showSpecification = (elementId, category) => {
    if ($('.specifications-block').length) {
        $('.specifications-block').remove();
    } 
    
    switch (category) {
        case "laptop": $(elementId).after(spec_laptop); break;
        case "dien-thoai": 
        case "may-tinh-bang": $(elementId).after(spec_phone_tablet); break;
        case "tai-nghe": $(elementId).after(spec_ears_phone); break;
        case "tai-nghe-khong-day": $(elementId).after(spec_ears_phone_wireless); break;
        case "op-lung": $(elementId).after(spec_oplung); break;
        case "sac-du-phong": $(elementId).after(spec_sacduphong); break;
        case "loa":
        case "loa-khong-day": $(elementId).after(spec_loa); break;
        case "ba-lo-tui-xach": $(elementId).after(spec_balotuixach); break;
        case "chuot": $(elementId).after(spec_chuot); break;
        case "ban-phim": $(elementId).after(spec_banphim); break;
        case "cap-sac": $(elementId).after(spec_capsac); break;
        case "cu-sac": $(elementId).after(spec_cusac); break;
        case "thiet-bi-luu-tru": $(elementId).after(spec_thietbiluutru); break;
        case "dong-ho-thong-minh": $(elementId).after(spec_donghothongminh); break;
        case "gay-tu-suong": $(elementId).after(spec_gaytusuong); break;        
        default: 
            if ($('.specifications-block').length) {
                $('.specifications-block').remove();
            } 
        break;
    }
};

var spec_phone_tablet = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr" />

        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Màn hình</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Công nghệ màn hình</label>
                            <input type="text" class="form-control" placeholder="OLED" id="display_technology">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ phân giải</label>
                            <input type="text" class="form-control" placeholder="1125 x 2436 Pixels" id="display_resolution">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Màn hình rộng</label>
                            <input type="text" class="form-control" placeholder="5.8 inch" id="display_wideScreen">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Mặt kính cảm ứng</label>
                            <input type="text" class="form-control" placeholder="Kính oleophobic (ion cường lực)" id="display_glass">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Camera trước</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ phân giải</label>
                            <input type="text" class="form-control" placeholder="7 MP" id="camera_front_resolution">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Đèn flash</label>
                            <input type="text" class="form-control" placeholder="Không hỗ trợ" id="camera_front_flash">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Video call</label>
                            <input type="text" class="form-control" placeholder="Có" id="camera_front_video_call">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Khác</label>
                            <textarea class="form-control" placeholder="Camera góc rộng, Selfie ngược sáng HDR, Nhận diện khuôn mặt, Quay video Full HD" id="camera_front_other"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- /ROW -->
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Bộ nhớ & lưu trữ</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Bộ nhớ ngoài</label>
                            <input type="text" class="form-control" placeholder="Không có" id="storage_internal">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Bộ nhớ trong</label>
                            <input type="text" class="form-control" placeholder="256 GB" id="storage_external">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Bộ nhớ khả dụng</label>
                            <input type="text" class="form-control" placeholder="Khoảng 249 GB" id="storage_available">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Bộ nhớ ram</label>
                            <input type="text" class="form-control" placeholder="3 GB" id="storage_ram">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Camera sau</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ phân giải</label>
                            <input type="text" class="form-control" placeholder="2 camera 12 MP" id="camera_back_resolution">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Đèn flash</label>
                            <input type="text" class="form-control" placeholder="4 đèn LED (2 tông màu)" id="camera_back_flash">
                        </div>
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Quay phim</label>
                        <input type="text" class="form-control" placeholder="Quay phim 4K 2160p@60fps" id="camera_back_film">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Khác</label>
                        <textarea type="text" class="form-control" placeholder="Lấy nét dự đoán, Chụp ảnh xóa phông, Tự động lấy nét, Chạm lấy nét, Nhận diện khuôn mặt, HDR, Panorama, Chống rung quang học (OIS)." id="camera_back_other"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Bộ xử lý</h6>
                    <div class="row">
                        <h6 class="mb-20" style="text-align: center;">CPU</h6>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Chipset</label>
                            <input type="text" class="form-control" placeholder="Apple A11 Bionic 6 nhân" id="processor_cpu_chipset">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Hãng sản xuất</label>
                            <input type="text" class="form-control" placeholder="Apple" id="processor_cpu_manufacturer">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tốc độ</label>
                            <input type="text" class="form-control" placeholder="2.39 GHz" id="processor_cpu_speed">
                        </div>
                    </div>
                    <div class="clearfix" style="margin: 20px;"></div>
                    <div class="row">
                        <h6 class="mb-20" style="text-align: center;">GPU</h6>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Chipset</label>
                            <input type="text" class="form-control" placeholder="Apple GPU 3 nhân" id="processor_gpu_chipset">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Hãng sản xuất</label>
                            <input type="text" class="form-control" id="processor_gpu_manufacturer">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tốc độ</label>
                            <input type="text" class="form-control" id="processor_gpu_speed">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Kết nối</h6>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Mạng di động</label>
                            <input type="text" class="form-control" placeholder="3G, 4G LTE Cat 16" id="connective_mobile_network">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Sim</label>
                            <input type="text" class="form-control" placeholder="1 Nano SIM" id="connective_sim">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Wifi</label>
                            <input type="text" class="form-control" placeholder="Wi-Fi 802.11 a/b/g/n/ac, Dual-band, Wi-Fi hotspot" id="connective_wifi">
                        </div>
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-4">
                        <label class="control-label mb-10">GPS</label>
                        <input type="text" class="form-control" placeholder="A-GPS, GLONASS" id="connective_gps">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Bluetooth</label>
                        <input type="text" class="form-control" placeholder="v5.0, A2DP, LE, EDR" id="connective_bluetooth">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Cổng kết nối/sạc</label>
                        <input type="text" class="form-control" placeholder="Lightning" id="connective_connector_charger">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Jack tai nghe</label>
                        <input type="text" class="form-control" placeholder="Lightning" id="connective_jack">
                    </div>
                    <div class="col-sm-8">
                        <label class="control-label mb-10">Các kết nối khác</label>
                        <input type="text" class="form-control" placeholder="NFC, OTG" id="connective_other">
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Thiết kế & Trọng lượng</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Thiết kế</label>
                            <input type="text" class="form-control" placeholder="Nguyên khối" id="design_style">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Chất liệu</label>
                            <input type="text" class="form-control" placeholder="Khung kim loại + mặt kính cường lực" id="design_material">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <h6 class="mb-20" style="text-align: center; margin-bottom: 10px;">Kích thước</h6>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dài</label>
                            <input type="text" class="form-control" placeholder="143.6 mm" id="size_long">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Ngang</label>
                            <input type="text" class="form-control" placeholder="70.9 mm" id="size_horizontal">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dày</label>
                            <input type="text" class="form-control" placeholder="7.7 mm" id="size_thick">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <h6 class="mb-20" style="text-align: center; margin-bottom: 10px;">Pin</h6>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dung lượng pin</label>
                            <input type="text" class="form-control" placeholder="32716 mAh" id="battery_capcity">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Loại pin</label>
                            <input type="text" class="form-control" placeholder="Pin chuẩn Li-Ion" id="battery_type">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Công nghệ pin</label>
                            <input type="text" class="form-control" placeholder="Sạc pin nhanh, Sạc pin không dây, Tiết kiệm pin" id="battery_tech">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Tiện ích</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Bảo mật nâng cao</label>
                            <input type="text" class="form-control" placeholder="Nhận diện khuôn mặt Face ID" id="util_advanced_security">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tính năng đặc biệt</label>
                            <input type="text" class="form-control" placeholder="Kháng nước, kháng bụi 3D Touch" id="util_special_features">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Ghi âm</label>
                            <input type="text" class="form-control" placeholder="Có, microphone chuyên dụng chống ồn" id="util_record">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Radio</label>
                            <input type="text" class="form-control" placeholder="Có" id="util_radio">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Xem phim/ Nghe nhạc</label>
                            <textarea type="text" class="form-control" placeholder="H.265, 3GP, MP4, AVI, WMV, H.263, H.264(MPEG4-AVC), Midi, Lossless, MP3, WAV, WMA9, WMA, AAC, AAC+, AAC++, eAAC+" id="util_entertainment"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Hệ điều hành</h6>
                    <div class="row">
                        <div class="col-sm-4">
                            <input type="text" class="form-control" placeholder="iOS 11" id="os">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <h5 class="mb-20" style="text-align: center;">Các thông số khác</h5>
                        <div class="col-sm-12">
                            <textarea class="form-control" placeholder="Thời điểm ra mắt: 9/2017" id="other"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div> 
`;

var spec_laptop = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Màn hình</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Công nghệ màn hình</label>
                            <input type="text" class="form-control" placeholder="LED Backlit" id="display_technology">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ phân giải</label>
                            <input type="text" class="form-control" placeholder="HD (1366 x 768)" id="display_resolution">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Kích thuước màn hình</label>
                            <input type="text" class="form-control" placeholder="15.6 inch" id="display_width">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Màn hình cảm ứng</label>
                            <input type="text" class="form-control" placeholder="Có" id="display_touch_screen">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Bộ xử lý</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Công nghệ CPU</label>
                            <input type="text" class="form-control" placeholder="Intel Pentium" id="processor_cpu_tech">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Loại CPU</label>
                            <input type="text" class="form-control" placeholder="N3710" id="processor_cpu_type">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tốc độ CPU</label>
                            <input type="text" class="form-control" placeholder="1.60 GHz" id="processor_cpu_speed">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tốc độ tối đa</label>
                            <textarea class="form-control" placeholder="Burst Frequency 2.56 GHz" id="processor_cpu_max_speed"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Bộ nhớ, RAM &amp; Ổ cứng</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">RAM</label>
                            <input type="text" class="form-control" placeholder="4 GB" id="storage_ram">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Loại RAM</label>
                            <input type="text" class="form-control" placeholder="DDR3L (1 khe RAM)" id="storage_ram_type">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Tốc độ Bus RAM</label>
                            <input type="text" class="form-control" placeholder="1600 MHz" id="storage_ram_bus">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Hỗ trợ RAM tối đa</label>
                            <input type="text" class="form-control" placeholder="8 GB" id="storage_ram_max">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Ổ cứng</label>
                            <input type="text" class="form-control" placeholder="HDD: 500 GB" id="storage_hard_drive">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Đồ họa và Âm thanh</h6>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Thiết kế card</label>
                            <input type="text" class="form-control" placeholder="Card đồ họa tích hợp" id="graphics_design">
                        </div>
                        <div class="col-sm-8">
                            <label class="control-label mb-10">Card đồ họa</label>
                            <input type="text" class="form-control" placeholder="Intel® HD Graphics 405" id="graphics_card_name">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-12">
                            <label class="control-label mb-10">Công nghệ âm thanh</label>
                            <input type="text" class="form-control" placeholder="Loa kép (2 kênh), Dolby Home Theater" id="sound_tech">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <h6 class="mb-20">Cổng kết nối & tính năng mở rộng</h6>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Cổng giao tiếp</label>
                            <input type="text" class="form-control" placeholder="HDMI, LAN (RJ45), USB 2.0, USB 3.0" id="connective_port" >
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Kết nối không dây</label>
                            <input type="text" class="form-control" placeholder="Bluetooth v4.0, Wi-Fi 802.11 a/b/g/n/ac" id="connective_wireless">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Khe đọc thẻ nhớ</label>
                            <input type="text" class="form-control" placeholder="SD, SDHC, SDXC" id="connective_card_reader">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-3">
                                    <label class="control-label mb-10">Ổ đĩa quang</label>
                                    <input type="text" class="form-control" placeholder="Không" id="connective_optical_drive">
                                </div>
                                <div class="col-sm-3">
                                    <label class="control-label mb-10">Webcam</label>
                                    <input type="text" class="form-control" placeholder="0.3 MP, VGA Webcam" id="connective_webcam">
                                </div>
                                <div class="col-sm-6">
                                    <label class="control-label mb-10">Đèn bàn phím</label>
                                    <input type="text" class="form-control" placeholder="Không" id="connective_light_keyboard">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tính năng khác</label>
                            <input type="text" class="form-control" placeholder="Multi TouchPad, AccuType Keyboard" id="connective_other">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Kích thước &amp; trọng lượng</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Trọng lượng</label>
                            <input type="text" class="form-control" placeholder="2.2 Kg" id="design_weight">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Chất liệu</label>
                            <input type="text" class="form-control" placeholder="Vỏ nhựa" id="design_material">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <h6 class="mb-20" style="text-align: center; margin-bottom: 10px;" >Kích thước</h6>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dài</label>
                            <input type="text" class="form-control" placeholder="143.6 mm" id="size_long">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Ngang</label>
                            <input type="text" class="form-control" placeholder="70.9 mm" id="size_horizontal">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dày</label>
                            <input type="text" class="form-control" placeholder="7.7 mm" id="size_thick">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <h6 class="mb-20" style="text-align: center; margin-bottom: 10px;">Pin</h6>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dung lượng pin</label>
                            <input type="text" class="form-control" placeholder="32716 mAh" id="battery_capacity">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Loại pin</label>
                            <input type="text" class="form-control" placeholder="PIN liền" id="battery_style">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Công nghệ pin</label>
                            <input type="text" class="form-control" placeholder="" id="battery_tech">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <h6 class="mb-20">Hệ điều hành</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="Windows 10" id="os">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <h5 class="mb-20" style="text-align: center;">Các thông số khác</h5>
                        <div class="col-sm-12">
                            <textarea class="form-control" placeholder="" id="other"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /ROW -->
        </div>
        <!-- /specifications-block -->
    </div>
`;

var spec_ears_phone = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Jack cắm</label>
                            <input type="text" class="form-control" placeholder="3.5 mm" id="product_jack">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ dài dây</label>
                            <input type="text" class="form-control" placeholder="1.2 m" id="product_wire_length">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Phím điều khiển</label>
                            <input type="text" class="form-control" placeholder="Mic thoại, Nghe/nhận cuộc gọi, Phát/dừng chơi nhạc, Chuyển bài hát, Tăng/giảm âm lượng" id="product_button_control">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Bộ bán hàng</label>
                            <input type="text" class="form-control" placeholder="Tai nghe, 2 cặp đệm tai nghe" id="product_box">
                        </div>
                    </div>                                                            
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;

var spec_ears_phone_wireless = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Jack cắm</label>
                            <input type="text" class="form-control" placeholder="Đầu sạc Micro USB" id="product_jack">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tương thích</label>
                            <input type="text" class="form-control" placeholder="1.2 m" id="product_compatible">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Phím điều khiển</label>
                            <input type="text" class="form-control" placeholder="Mic thoại, Nghe/nhận cuộc gọi, Phát/dừng chơi nhạc, Chuyển bài hát, Tăng/giảm âm lượng" id="product_button_control">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Bộ bán hàng</label>
                            <input type="text" class="form-control" placeholder="Tai nghe, 2 cặp đệm tai nghe" id="product_box">
                        </div>
                    </div>                                                            
                </div>
            </div>
        </div>
        <!-- /ROW -->

        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Khả năng kết nối</label>
                            <input type="text" class="form-control" placeholder="2 máy" id="product_connection">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Dung lượng pin</label>
                            <input type="text" class="form-control" placeholder="70 mAh" id="product_battery">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Thời gian sạc</label>
                            <input type="text" class="form-control" placeholder="2 giờ" id="product_time_charge">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Thời gian dùng</label>
                            <input type="text" class="form-control" placeholder="4 giờ" id="product_time_use">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Xuất xứ</label>
                            <input type="text" class="form-control" placeholder="Trung Quốc " id="product_source">
                        </div>
                    </div>   
                </div>
            </div>
        </div>
        <!-- /ROW -->

    </div>
`;

var spec_balotuixach = ``;

var spec_loa = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Model</label>
                            <input type="text" class="form-control" placeholder="U213A" id="product_model">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ dài dây</label>
                            <input type="text" class="form-control" placeholder="1.2 m" id="product_length">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Kích thước loa vệ tinh</label>
                            <input type="text" class="form-control" placeholder="Cao 11 cm - ngang 7 cm - dày 8.3 cm" id="product_size">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Trọng lượng vệ tinh</label>
                            <input type="text" class="form-control" placeholder="550 g" id="product_weight">
                        </div>
                    </div>   
                </div>
            </div>
        </div>
        <!-- /ROW -->

        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10"> Tổng công suất</label>
                            <input type="text" class="form-control" placeholder="3.6 W" id="product_total_power">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Công suất loa vệ tinh</label>
                            <input type="text" class="form-control" placeholder="3.6 W" id="product_power">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Pin (loa không dây)</label>
                            <input type="text" class="form-control" placeholder="1200 mAh" id="product_battery">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Cách kết nối</label>
                            <input type="text" class="form-control" placeholder="Jack cắm 3.5 mm" id="product_connection">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Phím điều khiển</label>
                            <input type="text" class="form-control" placeholder="Tăng/giảm âm lượng" id="product_remote">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Bộ bán hàng chuẩn</label>
                            <input type="text" class="form-control" placeholder="Loa" id="product_box">
                        </div>
                    </div>   
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;

var spec_gaytusuong = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Kiểu kết nối</label>
                            <input type="text" class="form-control" placeholder="Dùng dây 3.5 mm" id="product_type_connection">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Độ dài tối thiểu</label>
                            <input type="text" class="form-control" placeholder="18 cm" id="product_min_long">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Độ dài tối đa</label>
                            <input type="text" class="form-control" placeholder="72 cm" id="product_max_long">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tương thích</label>
                            <input type="text" class="form-control" placeholder="Điện thoại dưới 6 inch" id="product_compatible">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Xuất xứ</label>
                            <input type="text" class="form-control" placeholder="Trung Quốc" id="product_carrier">
                        </div>
                    </div>     
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;

var spec_donghothongminh = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr" />

        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Màn hình</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Công nghệ màn hình</label>
                            <input type="text" class="form-control" placeholder="OLED" id="display_technology">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ phân giải</label>
                            <input type="text" class="form-control" placeholder="1125 x 2436 Pixels" id="display_resolution">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Màn hình rộng</label>
                            <input type="text" class="form-control" placeholder="5.8 inch" id="display_wideScreen">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Mặt kính</label>
                            <input type="text" class="form-control" placeholder="Kính oleophobic (ion cường lực)" id="display_glass">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
            <div class="form-group">
                <h6 class="mb-20">Cấu hình chi tiết</h6>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Hệ điều hành</label>
                        <input type="text" class="form-control" placeholder="Android Wear OS" id="os">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">RAM</label>
                        <input type="text" class="form-control" placeholder="256 MB" id="ram">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">CPU</label>
                        <input type="text" class="form-control" placeholder="1.2GHz Quad-Core" id="cpu">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">ROM</label>
                        <input type="text" class="form-control" placeholder="2 GB" id="rom">
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->

        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Giải trí</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Camera</label>
                            <input type="text" class="form-control" placeholder="Không có" id="camera">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Ứng dụng camera</label>
                            <input type="text" class="form-control" placeholder="Không có" id="camera_app">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Quay phim</label>
                            <input type="text" class="form-control" placeholder="Có" id="record_video">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Loa</label>
                            <input type="text" class="form-control" placeholder="Có" id="speaker">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tính năng khác</label>
                            <input type="text" class="form-control" placeholder="Nhắn tin, Mail, Ra lệnh bằng giọng nói, Máy nghe nhạc" id="feature_others">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <h6 class="mb-20">Kết nối</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Thiết bị kết nối</label>
                            <input type="text" class="form-control" placeholder="MicroUSB" id="connective">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Bluetooth</label>
                            <input type="text" class="form-control" placeholder="Bluetooth v4.0" id="bluetooth">
                        </div>
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Wifi</label>
                        <input type="text" class="form-control" placeholder="802.11 b/g/n (2.4 GHz)" id="wifi">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Kết nối khác</label>
                        <textarea type="text" class="form-control" placeholder="NFC, GPS" id="connection_others"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->       
        
        <div class="clearfix" style="margin: 20px;"></div>
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <h6 class="mb-20">Thông số vật lý</h6>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Kích thước</label>
                            <input type="text" class="form-control" placeholder="Dày 51 mm - Rộng 36 mm - Dày 10 mm" id="size">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Trọng lượng</label>
                            <input type="text" class="form-control" placeholder="76g" id="weight">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Chất liệu</label>
                            <input type="text" class="form-control" placeholder="Thép không gỉ" id="material">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Chống nước</label>
                            <input type="text" class="form-control" placeholder="Có" id="guard_water">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Công suất pin</label>
                            <input type="text" class="form-control" placeholder="420 mAh" id="battery">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Thời gian sử dụng pin khác</label>
                            <input type="text" class="form-control" placeholder="Chờ: 96 h. Sử dụng: 48 h" id="battery_wait">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->    

    </div> 
`;

var spec_thietbiluutru = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Loại thiết bị</label>
                            <input type="text" class="form-control" placeholder="Ổ cứng di động" id="product_type">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Dung lượng</label>
                            <input type="text" class="form-control" placeholder="250GB" id="product_capacity">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tốc độ đọc</label>
                            <input type="text" class="form-control" placeholder="500 MB/s" id="product_speed_read">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tốc độ ghi</label>
                            <input type="text" class="form-control" placeholder="450 MB/s" id="product_speed_write">
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;

var spec_capsac = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Jack cắm</label>
                            <input type="text" class="form-control" placeholder="Micro USB" id="product_jack">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tính năng</label>
                            <input type="text" class="form-control" placeholder="Sạc, truyền dữ liệu" id="product_feature">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dòng sạc tối đa</label>
                            <input type="text" class="form-control" placeholder="2.4 A" id="product_max_charge">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Độ dài dây</label>
                            <input type="text" class="form-control" placeholder="Trung Quốc" id="product_max_long">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Xuất xứ</label>
                            <input type="text" class="form-control" placeholder="Trung Quốc" id="product_carrier">
                        </div>                        
                    </div>   
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;

var spec_cusac = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Jack cắm</label>
                            <input type="text" class="form-control" placeholder="Hỗ trợ tất cả" id="product_power">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tính năng</label>
                            <input type="text" class="form-control" placeholder="Sạc nhanh" id="product_feature">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Dòng sạc tối đa</label>
                            <input type="text" class="form-control" placeholder="1A" id="product_max_charge">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Xuất xứ</label>
                            <input type="text" class="form-control" placeholder="Trung Quốc" id="product_carrier">
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    <!-- /ROW -->
    </div>
`;

var spec_chuot = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Nhà sản xuất</label>
                            <input type="text" class="form-control" placeholder="Trung Quốc" id="product_carrier">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Model</label>
                            <input type="text" class="form-control" placeholder="M115" id="product_model">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ phân giải quang học</label>
                            <input type="text" class="form-control" placeholder="1000 dpi" id="product_optical_resolution">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Cách kết nối</label>
                            <input type="text" class="form-control" placeholder="Cổng USB" id="product_connection">
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        <!-- /ROW -->

        <!-- ROW -->
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Độ dài dây/ Khoãng cách kết nối</label>
                            <input type="text" class="form-control" placeholder="100 cm" id="product_length_cab">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Kích thước</label>
                            <input type="text" class="form-control" placeholder="Dài 9 cm - ngang 4.8 cm - cao 3.2 cm" id="product_size">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Trọng lượng</label>
                            <input type="text" class="form-control" placeholder="200g" id="product_weight">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;

var spec_banphim = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Nhà sản xuất</label>
                            <input type="text" class="form-control" placeholder="Trung Quốc" id="product_carrier">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Model</label>
                            <input type="text" class="form-control" placeholder="M115" id="product_model">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Số phím</label>
                            <input type="text" class="form-control" placeholder="104 phím thường + 11 phím FN" id="product_number_key">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Cách kết nối</label>
                            <input type="text" class="form-control" placeholder="Cổng USB" id="product_connection">
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        <!-- /ROW -->

        <!-- ROW -->
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Độ dài dây/ Khoãng cách kết nối</label>
                            <input type="text" class="form-control" placeholder="100 cm" id="product_long">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Kích thước</label>
                            <input type="text" class="form-control" placeholder="Dài 9 cm - ngang 4.8 cm - cao 3.2 cm" id="product_size">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Trọng lượng</label>
                            <input type="text" class="form-control" placeholder="200g" id="product_weight">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;

var spec_oplung = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Chất liệu</label>
                            <input type="text" class="form-control" placeholder="Nhựa dẽo" id="product_material">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Kiểu dáng/ thiết kế</label>
                            <input type="text" class="form-control" placeholder="" id="product_style">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;

var spec_sacduphong = `
    <div class="specifications-block">
        <h6 class="txt-dark capitalize-font">
            <i class="zmdi zmdi-calendar-note mr-10"></i>Thông số kỹ thuật
        </h6>
        <hr class="light-grey-hr">
        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Thời gian sạc</label>
                            <input type="text" class="form-control" placeholder="9-10 giờ với củ sạc 1A, 7-8 giờ với củ sạc 2.1A" id="product_charge_time">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Cổng giao tiếp</label>
                            <input type="text" class="form-control" placeholder="5V - 2.1A" id="product_port">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Hiệu suất sạc</label>
                            <input type="text" class="form-control" placeholder="80%" id="product_charging_performance">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Dung Lượng</label>
                            <input type="text" class="form-control" placeholder="10000 mAh" id="product_battery">
                        </div>
                    </div>                                                            
                </div>
            </div>
        </div>
        <!-- /ROW -->

        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Đèn led báo hiệu</label>
                            <input type="text" class="form-control" placeholder="Có" id="product_led_alert">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Nhà sản xuất</label>
                            <input type="text" class="form-control" placeholder="Crawford Technology Group(HK) Co.,Ltd" id="product_carrier">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Nguồn vào</label>
                            <input type="text" class="form-control" placeholder="5V - 2A" id="product_input">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Trọng lượng</label>
                            <input type="text" class="form-control" placeholder="450g" id="product_weight">
                        </div>
                    </div>                                                            
                </div>
            </div>
        </div>
        <!-- /ROW -->

        <!-- ROW -->
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-12">
                            <label class="control-label mb-10">Kích thước</label>
                            <input type="text" class="form-control" placeholder="135 (L) x 75 (W) x 18 (H) mm" id="product_size">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-12">
                            <label class="control-label mb-10">Bảo hành</label>
                            <input type="text" class="form-control" placeholder="12 tháng" id="product_warranty">
                        </div>
                    </div>                                                            
                </div>
            </div>
        </div>
        <!-- /ROW -->
    </div>
`;