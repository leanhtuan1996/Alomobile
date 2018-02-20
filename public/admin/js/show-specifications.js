var showSpecification = (elementId, category) => {
    if ($('.specifications-block').length) {
        $('.specifications-block').remove();
    } switch (category) {
        case "may-tinh-xach-tay":
            $(elementId).after(spec_laptop);
            break;
        case "may-tinh-bang": $(elementId).after(spec_phone_tablet); break;
        case "dien-thoai": $(elementId).after(spec_phone_tablet); break;
        case "phu-kien-may-tinh": break;
        case "phu-kien-dien-thoai":
            break;
        case "thiet-bi-am-thanh": break;
        default: break;
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
                        <input type="text" class="form-control" placeholder="OLED">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Độ phân giải</label>
                        <input type="text" class="form-control" placeholder="1125 x 2436 Pixels">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Màn hình rộng</label>
                        <input type="text" class="form-control" placeholder="5.8 inch">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Mặt kính cảm ứng</label>
                        <input type="text" class="form-control" placeholder="Kính oleophobic (ion cường lực)">
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
                        <input type="text" class="form-control" placeholder="7 MP">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Đèn flash</label>
                        <input type="text" class="form-control" placeholder="Không hỗ trợ">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Video call</label>
                        <input type="text" class="form-control" placeholder="Có">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Khác</label>
                        <textarea class="form-control" placeholder="Camera góc rộng, Selfie ngược sáng HDR, Nhận diện khuôn mặt, Quay video Full HD"></textarea>
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
                        <input type="text" class="form-control" placeholder="Không có">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Bộ nhớ trong</label>
                        <input type="text" class="form-control" placeholder="256 GB">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Bộ nhớ khả dụng</label>
                        <input type="text" class="form-control" placeholder="Khoảng 249 GB">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Bộ nhớ ram</label>
                        <input type="text" class="form-control" placeholder="3 GB">
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
                        <input type="text" class="form-control" placeholder="2 camera 12 MP">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Đèn flash</label>
                        <input type="text" class="form-control" placeholder="4 đèn LED (2 tông màu)">
                    </div>
                </div>
            </div>
            <div style="margin-top: 10px; margin-bottom: 10px;"></div>
            <div class="row">
                <div class="col-sm-6">
                    <label class="control-label mb-10">Quay phim</label>
                    <input type="text" class="form-control" placeholder="Quay phim 4K 2160p@60fps">
                </div>
                <div class="col-sm-6">
                    <label class="control-label mb-10">Khác</label>
                    <textarea type="text" class="form-control" placeholder="Lấy nét dự đoán, Chụp ảnh xóa phông, Tự động lấy nét, Chạm lấy nét, Nhận diện khuôn mặt, HDR, Panorama, Chống rung quang học (OIS)."></textarea>
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
                        <input type="text" class="form-control" placeholder="Apple A11 Bionic 6 nhân">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Hãng sản xuất</label>
                        <input type="text" class="form-control" placeholder="Apple">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Tốc độ</label>
                        <input type="text" class="form-control" placeholder="2.39 GHz">
                    </div>
                </div>
                <div class="clearfix" style="margin: 20px;"></div>
                <div class="row">
                    <h6 class="mb-20" style="text-align: center;">GPU</h6>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Chipset</label>
                        <input type="text" class="form-control" placeholder="Apple GPU 3 nhân">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Hãng sản xuất</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Tốc độ</label>
                        <input type="text" class="form-control">
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
                        <input type="text" class="form-control" placeholder="3G, 4G LTE Cat 16">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Sim</label>
                        <input type="text" class="form-control" placeholder="1 Nano SIM">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Wifi</label>
                        <input type="text" class="form-control" placeholder="Wi-Fi 802.11 a/b/g/n/ac, Dual-band, Wi-Fi hotspot">
                    </div>
                </div>
            </div>
            <div style="margin-top: 10px; margin-bottom: 10px;"></div>
            <div class="row">
                <div class="col-sm-4">
                    <label class="control-label mb-10">GPS</label>
                    <input type="text" class="form-control" placeholder="A-GPS, GLONASS">
                </div>
                <div class="col-sm-4">
                    <label class="control-label mb-10">Bluetooth</label>
                    <input type="text" class="form-control" placeholder="v5.0, A2DP, LE, EDR">
                </div>
                <div class="col-sm-4">
                    <label class="control-label mb-10">Cổng kết nối/sạc</label>
                    <input type="text" class="form-control" placeholder="Lightning">
                </div>
            </div>
            <div style="margin-top: 10px; margin-bottom: 10px;"></div>
            <div class="row">
                <div class="col-sm-4">
                    <label class="control-label mb-10">Jack tai nghe</label>
                    <input type="text" class="form-control" placeholder="Lightning">
                </div>
                <div class="col-sm-8">
                    <label class="control-label mb-10">Các kết nối khác</label>
                    <input type="text" class="form-control" placeholder="NFC, OTG">
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
                        <input type="text" class="form-control" placeholder="Nguyên khối">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Chất liệu</label>
                        <input type="text" class="form-control" placeholder="Khung kim loại + mặt kính cường lực">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <h6 class="mb-20" style="text-align: center; margin-bottom: 10px;">Kích thước</h6>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Dài</label>
                        <input type="text" class="form-control" placeholder="143.6 mm">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Ngang</label>
                        <input type="text" class="form-control" placeholder="70.9 mm">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Dày</label>
                        <input type="text" class="form-control" placeholder="7.7 mm">
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
                        <input type="text" class="form-control" placeholder="32716 mAh">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Loại pin</label>
                        <input type="text" class="form-control" placeholder="Pin chuẩn Li-Ion">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Công nghệ pin</label>
                        <input type="text" class="form-control" placeholder="Sạc pin nhanh, Sạc pin không dây, Tiết kiệm pin">
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
                        <input type="text" class="form-control" placeholder="Nhận diện khuôn mặt Face ID">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label mb-10">Tính năng đặc biệt</label>
                        <input type="text" class="form-control" placeholder="Kháng nước, kháng bụi
                                                                        3D Touch">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Ghi âm</label>
                        <input type="text" class="form-control" placeholder="Có, microphone chuyên dụng chống ồn">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Radio</label>
                        <input type="text" class="form-control" placeholder="Có">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label mb-10">Xem phim/ Nghe nhạc</label>
                        <textarea type="text" class="form-control" placeholder="H.265, 3GP, MP4, AVI, WMV, H.263, H.264(MPEG4-AVC), Midi, Lossless, MP3, WAV, WMA9, WMA, AAC, AAC+, AAC++, eAAC+"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="form-group">
                <h6 class="mb-20">Hệ điều hành</h6>
                <div class="row">
                    <div class="col-sm-4">
                        <input type="text" class="form-control" placeholder="iOS 11">
                    </div>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                <div class="row">
                    <h5 class="mb-20" style="text-align: center;">Các thông số khác</h5>
                    <div class="col-sm-12">
                        <textarea class="form-control" placeholder="Thời điểm ra mắt: 9/2017"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- /ROW -->

    </div> `;

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
                            <input type="text" class="form-control" placeholder="LED Backlit">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Độ phân giải</label>
                            <input type="text" class="form-control" placeholder="HD (1366 x 768)">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Kích thuước màn hình</label>
                            <input type="text" class="form-control" placeholder="15.6 inch">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Màn hình cảm ứng</label>
                            <input type="text" class="form-control" placeholder="Có">
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
                            <input type="text" class="form-control" placeholder="Intel Pentium">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Loại CPU</label>
                            <input type="text" class="form-control" placeholder="N3710">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tốc độ CPU</label>
                            <input type="text" class="form-control" placeholder="1.60 GHz">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Tốc độ tối đa</label>
                            <textarea class="form-control" placeholder="Burst Frequency 2.56 GHz"></textarea>
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
                            <input type="text" class="form-control" placeholder="4 GB">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Loại RAM</label>
                            <input type="text" class="form-control" placeholder="DDR3L (1 khe RAM)">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Tốc độ Bus RAM</label>
                            <input type="text" class="form-control" placeholder="1600 MHz">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Hỗ trợ RAM tối đa</label>
                            <input type="text" class="form-control" placeholder="8 GB">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Ổ cứng</label>
                            <input type="text" class="form-control" placeholder="HDD: 500 GB">
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
                            <input type="text" class="form-control" placeholder="Card đồ họa tích hợp">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Card đồ họa</label>
                            <input type="text" class="form-control" placeholder="Intel® HD Graphics 405">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-12">
                            <label class="control-label mb-10">Công nghệ âm thanh</label>
                            <input type="text" class="form-control" placeholder="Loa kép (2 kênh), Dolby Home Theater">
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
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Cổng giao tiếp</label>
                            <input type="text" class="form-control" placeholder="HDMI, LAN (RJ45), USB 2.0, USB 3.0">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Kết nối không dây</label>
                            <input type="text" class="form-control" placeholder="Bluetooth v4.0, Wi-Fi 802.11 a/b/g/n/ac">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Khe đọc thẻ nhớ</label>
                            <input type="text" class="form-control" placeholder="SD, SDHC, SDXC">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Ổ đĩa quang</label>
                            <input type="text" class="form-control" placeholder="Không">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Webcam</label>
                            <input type="text" class="form-control" placeholder="0.3 MP, VGA Webcam">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Đèn bàn phím</label>
                            <input type="text" class="form-control" placeholder="Không">
                        </div>
                        <div class="col-sm-3">
                            <label class="control-label mb-10">Tính năng khác</label>
                            <input type="text" class="form-control" placeholder="Multi TouchPad, AccuType Keyboard">
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
                            <input type="text" class="form-control" placeholder="Card đồ họa tích hợp">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Card đồ họa</label>
                            <input type="text" class="form-control" placeholder="Intel® HD Graphics 405">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <div class="col-sm-12">
                            <label class="control-label mb-10">Công nghệ âm thanh</label>
                            <input type="text" class="form-control" placeholder="Loa kép (2 kênh), Dolby Home Theater">
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
                            <input type="text" class="form-control" placeholder="2.2 Kg">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label mb-10">Chất liệu</label>
                            <input type="text" class="form-control" placeholder="Vỏ nhựa">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <h6 class="mb-20" style="text-align: center; margin-bottom: 10px;">Kích thước</h6>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dài</label>
                            <input type="text" class="form-control" placeholder="143.6 mm">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Ngang</label>
                            <input type="text" class="form-control" placeholder="70.9 mm">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Dày</label>
                            <input type="text" class="form-control" placeholder="7.7 mm">
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
                            <input type="text" class="form-control" placeholder="32716 mAh">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Loại pin</label>
                            <input type="text" class="form-control" placeholder="PIN liền">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label mb-10">Công nghệ pin</label>
                            <input type="text" class="form-control" placeholder="">
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
                            <input type="text" class="form-control" placeholder="Windows 10">
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;"></div>
                    <div class="row">
                        <h5 class="mb-20" style="text-align: center;">Các thông số khác</h5>
                        <div class="col-sm-12">
                            <textarea class="form-control" placeholder=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /ROW -->
        </div>
        <!-- /specifications-block -->
        <div class="form-actions" style="padding-bottom: 20px;">
            <button class="btn btn-success btn-icon left-icon mr-10 pull-left">
                <i class="fa fa-check"></i>
                <span>Lưu lại</span>
            </button>
            <button type="button" class="btn btn-warning pull-left">Huỷ bỏ</button>
            <div class="clearfix"></div>
        </div>
    </div>
`;