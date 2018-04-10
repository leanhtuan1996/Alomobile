(function (product) {
    function showSpecifications(product) {

        var specElement = `<ul class="specifications" style="display: block; position: relative; overflow: hidden; background: #fff; padding-top: 10px;">`;

        var specifications = product.specifications;

        switch (product.type.alias) {

            case 'may-tinh-bang':
            case 'dien-thoai':
                var screen = specifications.screen,
                    os = specifications.os,
                    backCamera = specifications.backCamera,
                    frontCamera = specifications.frontCamera,
                    cpu = specifications.processor.cpu,
                    ram = specifications.storage.ram,
                    storage = specifications.storage,
                    sim = specifications.connections.sim,
                    battery = specifications.battery;

                if (screen) {
                    var tech = screen.displayTechnology,
                        resolution = screen.resolution,
                        width = screen.width,
                        touch = screen.touch;

                    var content = "";

                    if (tech) {
                        content += tech + ", ";
                    }

                    if (resolution) {
                        content += resolution + ", ";
                    }

                    if (width) {
                        content += width + ", ";
                    }

                    if (touch) {
                        content += touch + ".";
                    }

                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Màn hình:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>
                            </li>
                            `

                } else {
                    specElement = `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Màn hình:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                if (os) {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Hệ điều hành:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${os}
                                </div>
                            </li> `
                } else {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Hệ điều hành:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                if (backCamera) {
                    if (backCamera.resolution) {
                        specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Camera sau:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${backCamera.resolution}
                                </div>
                            </li> `
                    } else {
                        specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Camera sau:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                    }
                } else {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Camera sau:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                if (frontCamera) {
                    if (frontCamera.resolution) {
                        specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Camera trước:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${frontCamera.resolution}
                                </div>
                            </li> `
                    } else {
                        specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Camera trước:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                    }
                } else {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Camera trước:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                if (cpu) {
                    var content = ``;

                    if (cpu.chipset) {
                        content = cpu.chipset + ", ";
                    }

                    if (cpu.speed) {
                        content += cpu.speed + ".";
                    }

                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        CPU
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>
                            </li> `


                } else {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        CPU
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                if (ram) {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        RAM
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${ram || ""}
                                </div>
                            </li> `
                } else {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        RAM
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                if (storage) {
                    var content = ``;

                    if (storage.internal) {
                        content = "Bộ nhớ trong: " + storage.internal + " ,";
                    }

                    if (storage.external) {
                        content = "Bộ nhớ ngoài: " + storage.external + "."
                    }

                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Bộ nhớ trong
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>
                            </li> `

                } else {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Bộ nhớ trong
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                if (sim) {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        SIM
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${sim || ""}
                                </div>
                            </li> `
                } else {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        SIM
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                if (battery) {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Pin
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${battery.capacity || ""}
                                </div>
                            </li> `
                } else {
                    specElement += `
                            <li class="os" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                        Pin
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    
                                </div>
                            </li> `
                }

                break;

            case 'laptop':
                var screen = specifications.screen,
                    processor = specifications.processor,
                    storage = specifications.storage,
                    graphicsAudio = specifications.graphicsAudio,
                    connectionAndUtils = specifications.connectionAndUtils,
                    sizeAndWeight = specifications.sizeAndWeight,
                    os = specifications.os;

                if (processor) {
                    var content = ``;
                    if (processor.tech) {
                        content += processor.tech + ", ";
                    }

                    if (processor.type) {
                        content += processor.type + ", ";
                    }

                    if (processor.speed) {
                        content += processor.speed + ", ";
                    }

                    if (processor.maxSpeed) {
                        content += processor.maxSpeed;
                    }

                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    CPU:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>
                            </li>`

                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    CPU:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (storage) {
                    var content = "";
                    if (storage.ram) {
                        content += storage.ram + ", "
                    }

                    if (storage.type) {
                        content += storage.type + ", "
                    }

                    if (storage.bus) {
                        content += storage.bus + ", "
                    }

                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    RAM:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>
                            </li>`

                    if (storage.hardDrive) {
                        specElement += `
                        <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                            <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Ổ cứng:
                            </span>
                            <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                ${storage.hardDrive}
                            </div>
                        </li>`
                    }

                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    RAM:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Ổ cứng:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>
                            `
                }

                if (screen) {
                    var content = "";
                    if (screen.width) {
                        content += screen.width + " ,"
                    }

                    if (screen.resolution) {
                        content += screen.resolution + " ,"
                    }

                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Màn hình:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>
                            </li>`


                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Màn hình:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (graphicsAudio) {

                    var content = "";
                    if (graphicsAudio.design) {
                        content += graphicsAudio.design + ", ";
                    }

                    if (graphicsAudio.cardName) {
                        content += graphicsAudio.cardName + ", ";
                    }

                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Card màn hình:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>                                        
                            </li>`
                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Card màn hình:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (connectionAndUtils) {

                    var content = "";
                    if (connectionAndUtils.connectivePort) {
                        content += connectionAndUtils.connectivePort + ", ";
                    }

                    if (connectionAndUtils.connectiveWireless) {
                        content += connectionAndUtils.connectiveWireless + ", ";
                    }

                    if (connectionAndUtils.otherUtils) {
                        content += connectionAndUtils.otherUtils + ", ";
                    }


                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Cổng kết nối:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>
                            </li>`
                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Cổng kết nối:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (os) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Hệ điều hành:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${os}
                        </div>
                    </li>`
                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Hệ điều hành:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (sizeAndWeight.meterial) {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Thiết kế:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${sizeAndWeight.meterial}
                                </div>
                            </li>`
                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Thiết kế:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (sizeAndWeight.size) {
                    var content = '';

                    if (sizeAndWeight.size.long && sizeAndWeight.size.horizontal && sizeAndWeight.size.thick) {
                        content += `Dài ${sizeAndWeight.size.long}, ngang ${sizeAndWeight.size.horizontal}, dày ${sizeAndWeight.size.thick}`
                    }

                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Kích thước:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                    ${content}
                                </div>
                            </li>`

                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Kích thước:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                break;
            case "tai-nghe":

                if (specifications.jack) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Jack cắm:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.jack}
                        </div>
                    </li>`
                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Jack cắm:
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (specifications.wireLength) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Độ dài: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.wireLength}
                        </div>
                    </li>`
                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Độ dài: 
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (specifications.buttonControl) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Nút điều khiển:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.buttonControl}
                        </div>
                    </li>`
                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Nút điều khiển: 
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }

                if (specifications.box) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Trong hộp có: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.box}
                        </div>
                    </li>`
                } else {
                    specElement += `
                            <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                                <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                    Trong hộp có: 
                                </span>
                                <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                                </div>
                            </li>`
                }
                break;

            case "tai-nghe-khong-day":

                if (specifications.jack) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Jack cắm: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.jack}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Jack cắm: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.compatible) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Tương thích:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.compatible}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Tương thích: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.buttonControl) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Phím điều khiển:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.buttonControl}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Phím điều khiển: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.connection) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Kết nối: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.connection}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kết nối: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.battery) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Dung lượng pin: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.battery}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Dung lượng pin:  
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.timeCharge) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Thời gian sạc
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.timeCharge}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Thời gian sạc:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.timeUse) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Thời gian sử dụng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.timeUse}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Thời gian sử dụng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.box) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Trong hộp có:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.box}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Trong hộp có:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.source) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.source}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;

            case "op-lung":
                if (specifications.material) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Loại vỏ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.material}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Loại vỏ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.style) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Kiểu:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.style}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Kiểu:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;
            case "sac-du-phong":
                if (specifications.chargeTime) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Thời gian sạc:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.chargeTime}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Thời gian sạc:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.port) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Cổng kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.port}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Cổng kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.battery) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Dung lượng pin:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.battery}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Dung lượng pin:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.ledAlert) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Đèn cảnh báo:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.ledAlert}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Đèn cảnh báo:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.carrier) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Nhà sản xuất:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.carrier}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Nhà sản xuất:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.weight) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Trọng lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.weight}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Trọng lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;
            case "loa":
            case "loa-khong-day":
                if (specifications.model) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Model:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.model}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Model:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.length) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Chiều dài:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.length}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Chiều dài
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.size) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Kích thước:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.size}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kích thước:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.weight) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Trọng lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.weight}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Trọng lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.totalPower) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Tổng hiệu xuất:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.totalPower}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Tổng hiệu xuất:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.power) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Công suất loa vệ tinh:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.power}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Công suất loa vệ tinh:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.connection) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.connection}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.remote) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Nút điều khiển:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.remote}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Nút điều khiển:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.battery) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Pin (loa không dây)
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.battery}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Pin (loa không dây)
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.box) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Trong hộp có:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.box}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Trong hộp có:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;

            case "chuot":
                if (specifications.model) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Model:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.model}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Model:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.opticalResolution) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Độ phân giải quang học:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.opticalResolution}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Độ phân giải quang học:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.connection) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.connection}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.lengthCab) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Độ dài dây / Khoảng cách kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.lengthCab}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Độ dài dây / Khoảng cách kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.size) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kích thước:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.size}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kích thước:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.carrier) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.carrier}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.weight) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Trọng lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.weight}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Trọng lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;

            case "ban-phim":

                if (specifications.carrier) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.carrier}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.model) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Model:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.model}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Model:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.numberKey) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Số phím:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.numberKey}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Số phím:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.connection) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Cách kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.connection}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Cách kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.long) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Độ dài dây / Khoảng cách kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.long}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Độ dài dây / Khoảng cách kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.size) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kích thước:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.size}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kích thước:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.weight) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Trọng lượng: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.weight}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Trọng lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;

            case "cap-sac":

                if (specifications.jack) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Jack cắm:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.jack}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Jack cắm:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.feature) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Tính năng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.feature}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Tính năng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.maxCharge) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Sạc tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.maxCharge}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Sạc tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.maxLong) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Chiều dài tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.maxLong}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Chiều dài tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.carrier) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.carrier}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;

            case "cu-sac":

                if (specifications.power) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Jack cắm:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.power}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Jack cắm:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.feature) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Tính năng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.feature}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Tính năng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.maxCharge) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Công xuất tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.maxCharge}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Công xuất tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.carrier) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.carrier}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;

            case "thiet-bi-luu-tru":

                if (specifications.type) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Loại thiết bị:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.type}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Loại thiết bị:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.capacity) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Dung lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.capacity}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Dung lượng:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.speedRead) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Tốc độ đọc tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.speedRead}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Tốc độ đọc tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.speedWrite) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Tốc độ ghi tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.speedWrite}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Tốc độ ghi tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;

            case "dong-ho-thong-minh":
                if (specifications.screen) {
                    if (specifications.screen.displayTechnology) {
                        specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Công nghệ màn hình:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.screen.displayTechnology}
                        </div>
                    </li>`
                    } else {
                        specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Công nghệ màn hình:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.screen.displayTechnology}
                        </div>
                    </li>`
                    }

                    if (specifications.screen.resolution && specifications.screen.wide) {
                        var content = "";
                        if (specifications.screen.resolution) {
                            content += specifications.screen.resolution + ", "
                        }

                        if (specifications.screen.wide) {
                            content += specifications.screen.wide;
                        }

                        specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Độ phân giải và kích thước:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${content}
                        </div>
                    </li>`


                    } else {
                        specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Độ phân giải và kích thước:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                    }
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Màn hình:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.screen.displayTechnology}
                        </div>
                    </li>`
                }

                if (specifications.detailConfiguration.ram) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            RAM:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.detailConfiguration.ram}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                RAM:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.detailConfiguration.cpu) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            CPU:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.detailConfiguration.cpu}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                CPU:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.detailConfiguration.os) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Hệ điều hành:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.detailConfiguration.os}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Hệ điều hành:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.physicalParameters.material) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Chất liệu:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.physicalParameters.material}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Chất liệu:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                if (specifications.physicalParameters.guardWater) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Chống nước: 
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.physicalParameters.guardWater}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Chất liệu:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            Không
                        </div>
                    </li>`
                }

                if (specifications.physicalParameters.battery) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Pin:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.physicalParameters.battery}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Pin:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            Không
                        </div>
                    </li>`
                }

                if (specifications.physicalParameters.batteryWait) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Thời gian chờ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.physicalParameters.batteryWait}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Thời gian chờ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            Không
                        </div>
                    </li>`
                }

                if (specifications.connection) {

                    var content = "";

                    if (specifications.connection.connectiveDevice) {
                        content += "Tương thích: " + specifications.connection.connectiveDevice + ", ";
                    }

                    if (specifications.connection.bluetooth) {
                        content += specifications.connection.bluetooth + ", ";
                    }

                    if (specifications.connection.wifi) {
                        content += specifications.connection.wifi + ", ";
                    }

                    if (specifications.connection.connection_others) {
                        content += specifications.connection.connection_others;
                    }


                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${content}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                        </div>
                    </li>`
                }

                break;

            case "gay-tu-suong":

                if (specifications.typeConnection) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Loại kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.typeConnection}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Loại kết nối:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            Không
                        </div>
                    </li>`
                }

                if (specifications.minLong) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Chiều dài tối thiểu:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.minLong}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Chiều dài tối thiểu:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            Không
                        </div>
                    </li>`
                }

                if (specifications.maxLong) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Chiều dài tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.maxLong}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Chiều dài tối đa:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            Không
                        </div>
                    </li>`
                }

                if (specifications.compatible) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Tương thích:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.compatible}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Tương thích:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            Không
                        </div>
                    </li>`
                }

                if (specifications.carrier) {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                            Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            ${specifications.carrier}
                        </div>
                    </li>`
                } else {
                    specElement += `
                    <li class="screen" style="display: table; background: #fff; width: 100%; border-top: 1px solid #eee; padding: 5px 0;">
                        <span style="display: table-cell; width: 40%;vertical-align: top;padding: 5px 0;font-size: 14px;color: #666;">
                                Xuất xứ:
                        </span>
                        <div style="display: table-cell;width: auto;vertical-align: top;padding: 6px 5px;font-size: 14px;color: #333;">
                            Không
                        </div>
                    </li>`
                }

                break;

            default:
                break;
        }

        specElement += `</ul>`
        //specElement += `<button type="button" class="btn btn-primary btn-rounded  btn-outline" style="text-align: center; width: 100%; margin-top: 5px;" id="view-detail-spec">Xem cấu hình chi tiết</button>`

        $('.tableparameter').append(specElement);
    }

    if (!product.specifications) {
        var p = `<p>Không có</p>`
        $('.tableparameter').append(p);
    } else {
        showSpecifications(product);
    }

    $('.price').each((index, price) => {
        if ($(price).html().match(/^[0-9]{1,}$/g)) {
            $(price).html(numberWithCommas($(price).html() + " VNĐ"));
        }
    });

    $.get('/api/v1/product/get-products-by-category/', {
        idRootCategory: product.category.idRootCategory._id,
        idCategory: product.category.idCategory
    }, (data) => {
        var products = data.products;
        if (products && products.length > 0) {
            var items = ``;
            products.forEach(product => {

                var details = product.details.find(element => {
                    return element.quantity > 0
                });

                items += `
                    <article class="js-product-miniature" data-id-product="${product._id}" itemscope itemtype="http://schema.org/Product">
                        <div class="img_block">
                            <a href="/${product.alias}-${product._id}" class="thumbnail product-thumbnail">
                                <img class="owl-lazy" src="${product.images[0].url}" alt="${product.images[0].alt}"
                                    data-full-size-image-url="${product.images[0].url} ">
                                <img class="img-responsive second-image animation1" src="${product.images[1].url}" alt="" itemprop="image" />
                            </a>
                            <ul class="product-flag">
                                <li class="new">New</li>
                            </ul>
                        </div>
                        <div class="product_desc">
                            <div class="desc_info">
                                <h4>
                                    <a href="/${product.alias}-${product._id}"
                                        title="${product.name}" itemprop="name" class="product_name">${product.name}
                                    </a>
                                </h4>
                                <div class="hook-reviews">
                                    <div itemtype="http://schema.org/AggregateRating" itemscope="" itemprop="aggregateRating" class="comments_note">
                                        <div class="star_content clearfix">`

                                        if (product.reviews && product.reviews.length > 0) {
                                            var totalStar = 0;
                                            var avg = 0;
                                            product.reviews.forEach(r => {
                                                totalStar+= r.star;
                                            });

                                            avg = Math.round(totalStar / product.reviews.length);

                                            for (let i = 1; i <= 5; i++) {
                                                if (i <= avg) {
                                                    items+= `<div class="star star_on"></div>`
                                                } else {
                                                    items+= `<div class="star"></div>`
                                                }                                      
                                            }

                                        } else {
                                            items+=`<div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>`
                                        }
                                           
                                       items+=`</div>
                                    </div>
                                </div>
                                <div class="product-price-and-shipping">`

                if (details) {
                    items += `<span itemprop="price" class="price ">${numberWithCommas(details.price + " VNĐ")}</span>`
                } else {
                    items += `<span itemprop="price" class="price ">${numberWithCommas(product.details[0].price + " VNĐ")}</span>`
                }

                items += `   
                                    <span class="sr-only">Price</span>
                                </div>
                            </div>
                            <ul class="add-to-links">
                                <li class="cart">
                                    <div class="product-add-to-cart">
                                        <form class="add-to-cart-or-refresh">
                                            <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                            <input type="hidden" name="name" class="product_name" value="${product.name}">
                                            <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                            `

                if (details) {
                    items += `<input type="hidden" name="color" class="product_color" value="${details.color.hex}">
                                                <input type="hidden" name="price" class="product_price" value="${details.price}">
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                } else {
                    items += `
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default disabled" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                }


                items += ` </form>
                                    </div>
                                </li>
                                <li>
                                    <a href="javascript: void(0)" class="quick-view quick-view-product" data-link-action="quickview" title="Quick view">Quick view</a>
                                </li>
                                <li>
                                    <a href="/${product.alias}-${product._id}" class="links-details" title="Details">Details</a>
                                </li>
                            </ul>
                        </div>
                    </article>
                `
            });

            $('.product_categoryslide').append(items);

            var owl = $(".product_categoryslide");
            owl.owlCarousel({
                autoPlay: !1,
                smartSpeed: 1000,
                autoplayHoverPause: !0,
                nav: !0,
                lazyLoad: true,
                dots: !1,
                responsive: {
                    0: { items: 1, },
                    480: { items: 2, },
                    768: { items: 3, nav: !1, },
                    992: { items: 4, },
                    1200: { items: 5, }
                }
            });
        }
    });

    $("input[id='quantity_want']").TouchSpin({
        verticalbuttons: true,
        verticalupclass: "material-icons touchspin-up",
        verticaldownclass: "material-icons touchspin-down",
        buttondown_class: "btn btn-touchspin js-touchspin",
        buttonup_class: "btn btn-touchspin js-touchspin",
        min: 1,
        max: 100
    });

    function getPreviewProduct(id, cb) {
        $.get('/api/v1/product/get-preview', {
            id: id
        }, (data) => {
            return cb(data);
        });
    }

    function initPreviewProductsSlider() {
        var owl = $("#main > section > div.block-content > div > div");
        owl.owlCarousel({
            lazyLoad: true,
            autoPlay: false,
            smartSpeed: 1000,
            autoplayHoverPause: true,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 2,
                },
                480: {
                    items: 3,
                },
                768: {
                    items: 2,
                    nav: false,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 3,
                }
            }
        });
    }

    $('#add-to-cart-or-refresh input.input-color').click((e) => {
        $('#main > div.primary_block > div > div.col-md-7 > div.product-prices > div.product-price.h5.has-discount > div > span').text(numberWithCommas($(e.currentTarget).attr("data-price") + " VNĐ"));

        var element = $('#main span#product-availability')

        if ($(e.currentTarget).attr('data-quantity') > 0) {
            $(element).html('<i class="material-icons product-available">done</i>Còn Hàng');
            $('#add-to-cart-or-refresh button.add-to-cart').removeClass('disabled')
            $("input[id='quantity_want']").trigger("touchspin.updatesettings", {
                max: $(e.currentTarget).attr('data-quantity'),
                min: 1
            });
        } else {
            $(element).html('<i class="material-icons product-unavailable">clear</i>Tạm Thời Hết Hàng');
            $('#add-to-cart-or-refresh button.add-to-cart').addClass('disabled')
            $("input[id='quantity_want']").trigger("touchspin.updatesettings", {
                min: 0,
                max: 0
            });
        }
    });

    function findColorsAvailable(element = 'input[class="input-color"]') {
        var inputs = $(element);
        if (inputs) {
            for (let i = 0; i < inputs.length; i++) {
                const element = inputs[i];
                var quantity = $(element).attr('data-quantity');
                if (quantity && quantity > 0) {
                    $(element).prop('checked', true);
                    $(element).trigger('click')
                    return;
                }

                if (i == inputs.length - 1) {
                    $(inputs[0]).trigger('click')
                }
            }
        }
    }

    function showNotification(text) {
        swal({
            title: "Có lỗi xảy ra",
            text: text,
            icon: "error",
            buttons: {
                reTry: "Thử lại",
            },
        })
    }

    findColorsAvailable();

    $('#quickview-modal').delegate('.input-color', 'click', (e) => {
        $('#quickview-modal > div > div > div.modal-body > div > div.col-md-7.col-sm-7 > div.product-prices > div.product-price.h5 > div > span').text(numberWithCommas($(e.currentTarget).attr("data-price") + " VNĐ"));

        var element = $('#quickview-modal span#product-availability')

        if ($(e.currentTarget).attr('data-quantity') > 0) {
            $(element).html('<i class="material-icons product-available">done</i>Còn Hàng');
            $('#quickview-modal button.add-to-cart').removeClass('disabled')
            $("input[id='quantity_want_modal']").trigger("touchspin.updatesettings", {
                max: $(e.currentTarget).attr('data-quantity'),
                min: 1
            });
        } else {
            $(element).html('<i class="material-icons product-unavailable">clear</i>Tạm Thời Hết Hàng');
            $('#quickview-modal button.add-to-cart').addClass('disabled')
            $("input[id='quantity_want_modal']").trigger("touchspin.updatesettings", {
                min: 0,
                max: 0
            });
        }
    });

    $(document).ready(($) => {
        $('.owl-carousel').delegate('.quick-view-product', 'click', (e) => {
            var id = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).attr('data-id-product');
            if (id.match(/^[a-zA-z0-9]{24}$/g)) {
                getPreviewProduct(id, (result) => {

                    var product = result.product;
                    if (!product) { return }

                    var quickViewModal = `
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-5 col-sm-5">
                                            <div class="images-container">
                                                <div class="product-cover">
                                                    <img class="js-qv-product-cover" src="${product.images[0].url}"
                                                        alt="${product.images[0].alt}" title="" style="width:100%;" itemprop="image">
                                                    <div class="layer hidden-sm-down" data-toggle="modal" data-target="#product-modal">
                                                        <i class="material-icons zoom-in"></i>
                                                    </div>
                                                </div>
                                                <div class="js-qv-mask mask pos_content">
                                                    <div class="product-images js-qv-product-images owl-carousel owl-loaded owl-drag">
                                                        
                                        `
                    product.images.forEach((image, index) => {
                        if (index > 0) {
                            quickViewModal += `
                                                    <div class="thumb-container">
                                                        <img class="owl-lazy thumb js-thumb " data-image-medium-src="${image.url}"
                                                            data-image-large-src="${image.url}"
                                                            src="${image.url}"
                                                            alt="" title="" width="100" itemprop="image">
                                                    </div>
                                                `
                        }
                    });

                    quickViewModal += `
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="arrows js-arrows" style="display: none;">
                                                <i class="material-icons arrow-up js-arrow-up"></i>
                                                <i class="material-icons arrow-down js-arrow-down"></i>
                                            </div>
                                        </div>
                                        <div class="col-md-7 col-sm-7">
                                            <h1 class="h1 namne_details">${product.name}</h1>
                                            <div class="product-prices">
                                                <div class="product-price h5 " itemprop="offers" itemscope="" itemtype="https://schema.org/Offer">
                                                    <link itemprop="availability" href="https://schema.org/InStock">
                                                    <meta itemprop="priceCurrency" content="USD">
                                                    <div class="current-price">
                                                        <span itemprop="price" content="30.5">${numberWithCommas(product.details[0].price) + " VNĐ"}</span>
                                                    </div>
                                                </div>
                                                <div class="tax-shipping-delivery-label">
                                                </div>
                                            </div>
                                            <div class="product-actions">
                                                <form id="add-to-cart-or-refresh">
                                                    <div class="product-variants">
                                                        <div class="clearfix product-variants-item">
                                                            <span class="control-label">Màu sắc</span>
                                                            <ul id="group_3">`

                    if (product.details && product.details.length > 0) {
                        product.details.forEach((element, index) => {
                            quickViewModal += `
                                                    <li class="float-xs-left input-container">
                                                        <label>
                                                            <input class="input-color" data-price="${element.price}" data-quantity="${element.quantity}" type="radio" name="group[3]" value="11" data-color="${element.color.hex}">
                                                            <span class="color" style="background-color: ${element.color.hex}">
                                                                <span class="sr-only">${element.color.name}</span>
                                                            </span>
                                                        </label>
                                                    </li>
                                                `
                        });
                    }

                    quickViewModal += `
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="product-add-to-cart">
                                                        <span class="control-label">Số lượng</span>
                                                        <div class="product-quantity clearfix">
                                                                <div class="qty">
                                                                    <input type="text" name="qty" id="quantity_want_modal" value="1" class="input-group" min="1" aria-label="Quantity">
                                                                </div>
                                                                <div class="add">
                                                                    <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                                                    <input type="hidden" name="name" class="product_name" value="${product.name}">
                                                                    <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                                                    <button class="btn btn-primary add-to-cart" data-button-action="add-to-cart" type="submit">
                                                                        <i class="material-icons shopping-cart">add</i> Thêm vào giỏ hàng
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        <span id="product-availability">
                                                            <i class="material-icons product-available"></i>
                                                            Còn hàng
                                                        </span>
                                                        <p class="product-minimal-quantity">
                                                        </p>
                                                    </div>
                                                    <input class="product-refresh" data-url-update="false" name="refresh" type="submit" value="Refresh" hidden="">
                                                </form>
                                            </div>
                                            <div id="block-reassurance">
                                                <ul>
                                                    <li>
                                                        <div class="block-reassurance-item">
                                                            <img src="/static/img/ic_verified_user_black_36dp_1x.png" alt="Security policy (edit with Customer reassurance module)">
                                                            <span class="h6" style="font-weight: 400;">Cam kết hàng chính hãng, bảo hành 12 tháng</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="block-reassurance-item">
                                                            <img src="/static/img/ic_local_shipping_black_36dp_1x.png" alt="Delivery policy (edit with Customer reassurance module)">
                                                            <span class="h6" style="font-weight: 400;">Miễn phí giao hàng</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="block-reassurance-item">
                                                            <img src="/static/img/ic_swap_horiz_black_36dp_1x.png" alt="Return policy (edit with Customer reassurance module)">
                                                            <span class="h6" style="font-weight: 400;">1 đổi 1 trong 3 tháng</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="social-sharing">
                                        <span>Share</span>
                                        <ul>
                                            <li>
                                                <a href="http://www.facebook.com/sharer.php?u=http://demo.posthemes.com/pos_fastbuy/layout2/en/electronics/5-printed-summer-dress.html"
                                                    title="Share" target="_blank">
                                                    <i class="fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://twitter.com/intent/tweet?text=Printed Summer Dress http://demo.posthemes.com/pos_fastbuy/layout2/en/electronics/5-printed-summer-dress.html"
                                                    title="Tweet" target="_blank">
                                                    <i class="fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://plus.google.com/share?url=http://demo.posthemes.com/pos_fastbuy/layout2/en/electronics/5-printed-summer-dress.html"
                                                    title="Google+" target="_blank">
                                                    <i class="fa-googleplus"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="http://www.pinterest.com/pin/create/button/?media=http://demo.posthemes.com/pos_fastbuy/layout2/242/printed-summer-dress.jpg&amp;url=http://demo.posthemes.com/pos_fastbuy/layout2/en/electronics/5-printed-summer-dress.html"
                                                    title="Pinterest" target="_blank">
                                                    <i class="fa-pinterest"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> 
                                                
                        <style type="text/css">
                            .product-quantity #quantity_want_modal {
                            color: #232323;
                            background-color: #fff;
                            height: 2.75rem;
                            padding: .175rem .5rem;
                            width: 3rem
                        }
                        </style>
                    `
                    $('#quickview-modal').find('.modal-dialog').remove();

                    $('#quickview-modal').append(quickViewModal).attr('data-id-product', product._id);
                    initPreviewProductsSlider();

                    $("#quantity_want_modal").TouchSpin({
                        verticalbuttons: true,
                        verticalupclass: "material-icons touchspin-up",
                        verticaldownclass: "material-icons touchspin-down",
                        buttondown_class: "btn btn-touchspin js-touchspin",
                        buttonup_class: "btn btn-touchspin js-touchspin",
                        min: 1,
                        max: 100
                    });

                    findColorsAvailable('#quickview-modal input[class="input-color"]');

                    $("input[id='quantity_want_modal']").on("touchspin.on.startspin", (e) => {
                        var colorSelected = $("#quickview-modal").find('input[class="input-color"]:checked');

                        if (!colorSelected) { return }

                        $("input[id='quantity_want_modal']").trigger("touchspin.updatesettings", {
                            max: $(colorSelected).attr('data-quantity')
                        });
                    });
                });
                $("#quickview-modal").modal('show');
            }
        });

        $("input[id='quantity_want']").on("touchspin.on.startspin", (e) => {
            var colorSelected = $('input[class="input-color"]:checked');

            if (!colorSelected) { return }

            $("input[id='quantity_want']").trigger("touchspin.updatesettings", {
                max: $(colorSelected).attr('data-quantity')
            });
        });

        $('#add-to-cart-or-refresh').submit((e) => {
            e.preventDefault();

            if ($(e.currentTarget).find('button.disabled').length != 0) { return }

            var id = $(e.currentTarget).find('input#product_page_product_id').val();

            var name = $('.primary_block').find('h1.namne_details').text();
            var image = $('.primary_block').find('img.js-qv-product-cover').attr('src');

            var colorInput = $(e.currentTarget).find('input[type="radio"]:checked');
            var quantity = $(e.currentTarget).find('input[type="text"]').val();
            var price = $(colorInput).attr('data-price');
            var color = $(colorInput).attr('data-color');

            var item = {
                id: id,
                color: color,
                quantity: quantity
            }

            checkAvailable(id, quantity, color, (isAvailable) => {
                if (isAvailable) {
                    if (addToCart(item)) {
                        var modal = $('#blockcart-modal');

                        $(modal).find('div.modal-dialog').remove();

                        var content = `
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                        </button>
                                        <h4 class="modal-title h6 text-sm-center" id="myModalLabel"><i class="material-icons"></i>Thêm sản phẩm vào giỏ hàng thành công</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <img class="product-image" src="${image}" alt="" title="" itemprop="image">
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="h6 product-name">${name}</h6>
                                                <p>${numberWithCommas(price) + " VNĐ"}</p>
                                                <ul style="list-style-type: none;
                                                        margin: 0;
                                                        padding: 0;
                                                        overflow: hidden;">
                                                        <li style="float: left;"><strong class="product-color">Màu sắc</strong></li>
                                                        <li style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; float: left; margin-left: 5px" title="Cosmos">
                                                        </li>
                                                    </ul>
                                                    
                                                </span><br>
                                                <p style=""><strong class="product-quantity">Số lượng:</strong>&nbsp; ${quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="cart-content-btn">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Tiếp tục mua sắm</button>
                                                    <a href="/gio-hang" class="btn btn-primary"><i class="material-icons"></i>Xem giỏ hàng</a>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <style>
                                    #blockcart-modal .modal-dialog {
                                        max-width: 600px;
                                        width: 40%;
                                    }

                                    .material-icons {
                                        font-family: Material Icons;
                                        font-weight: 400;
                                        font-style: normal;
                                        font-size: 20px;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 1em;
                                        height: 1em;
                                        line-height: 1;
                                        text-transform: none;
                                        letter-spacing: normal;
                                        word-wrap: normal;
                                        white-space: nowrap;
                                        direction: ltr;
                                        -webkit-font-smoothing: antialiased;
                                        text-rendering: optimizeLegibility;
                                    }

                                    #blockcart-modal strong, p {
                                        color: #333;
                                        font-size: 14px;
                                        font-weight: 600;
                                    }
                                </style>
                            </div>
                        `

                        $(modal).append(content);
                        $(modal).modal('show')
                    } else {
                        showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
                    }
                } else {
                    showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
                }
            });
        });

        $('.owl-carousel').delegate('.add-to-cart', 'click', (e) => {

            if ($(e.currentTarget.parentElement).find('button.disabled').length != 0) { return }

            var id = $(e.currentTarget.parentElement).find('input.product_id').val();
            var name = $(e.currentTarget.parentElement).find('input.product_name').val();
            var image = $(e.currentTarget.parentElement).find('input.product_img').val();
            var color = $(e.currentTarget.parentElement).find('input.product_color').val();
            var price = $(e.currentTarget.parentElement).find('input.product_price').val();

            var item = {
                id: id,
                color: color,
                quantity: 1
            }

            checkAvailable(id, 1, color, (isAvailable) => {
                if (isAvailable) {
                    if (addToCart(item)) {
                        var modal = $('#blockcart-modal');

                        $(modal).find('div.modal-dialog').remove();

                        var content = `
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                        </button>
                                        <h4 class="modal-title h6 text-sm-center" id="myModalLabel"><i class="material-icons"></i>Thêm sản phẩm vào giỏ hàng thành công</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <img class="product-image" src="${image}" alt="" title="" itemprop="image">
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="h6 product-name">${name}</h6>
                                                <p>${numberWithCommas(price) + " VNĐ"}</p>
                                                <ul style="list-style-type: none;
                                                        margin: 0;
                                                        padding: 0;
                                                        overflow: hidden;">
                                                        <li style="float: left;"><strong class="product-color">Màu sắc</strong></li>
                                                        <li style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; float: left; margin-left: 5px" title="Cosmos">
                                                        </li>
                                                    </ul>
                                                    
                                                </span><br>
                                                <p style=""><strong class="product-quantity">Số lượng:</strong>&nbsp; 1</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="cart-content-btn">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Tiếp tục mua sắm</button>
                                                    <a href="/gio-hang" class="btn btn-primary"><i class="material-icons"></i>Xem giỏ hàng</a>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <style>
                                    #blockcart-modal .modal-dialog {
                                        max-width: 600px;
                                        width: 40%;
                                    }

                                    .material-icons {
                                        font-family: Material Icons;
                                        font-weight: 400;
                                        font-style: normal;
                                        font-size: 20px;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 1em;
                                        height: 1em;
                                        line-height: 1;
                                        text-transform: none;
                                        letter-spacing: normal;
                                        word-wrap: normal;
                                        white-space: nowrap;
                                        direction: ltr;
                                        -webkit-font-smoothing: antialiased;
                                        text-rendering: optimizeLegibility;
                                    }

                                    #blockcart-modal strong, p {
                                        color: #333;
                                        font-size: 14px;
                                        font-weight: 600;
                                    }
                                </style>
                            </div>
                        `

                        $(modal).append(content);
                        $(modal).modal('show')
                    } else {
                        showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
                    }
                } else {
                    showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
                }
            })
        });

        $('#quickview-modal').delegate('.add-to-cart', 'click', (e) => {
            if ($(e.currentTarget.parentElement).find('button.disabled').length != 0) { return }

            var id = $(e.currentTarget.parentElement).find('input.product_id').val();
            var name = $(e.currentTarget.parentElement).find('input.product_name').val();
            var image = $(e.currentTarget.parentElement).find('input.product_img').val();

            var colorInput = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).find('input[type="radio"]:checked');
            var quantity = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).find('input[type="text"]').val();
            var price = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).find('input[type="radio"]:checked').attr('data-price');
            var color = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).find('input[type="radio"]:checked').attr('data-color');

            var item = {
                id: id,
                color: color,
                quantity: quantity
            }

            checkAvailable(id, quantity, color, (isAvailable) => {
                if (isAvailable) {
                    if (addToCart(item)) {
                        var modal = $('#blockcart-modal');

                        $(modal).find('div.modal-dialog').remove();

                        var content = `
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                        </button>
                                        <h4 class="modal-title h6 text-sm-center" id="myModalLabel"><i class="material-icons"></i>Thêm sản phẩm vào giỏ hàng thành công</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <img class="product-image" src="${image}" alt="" title="" itemprop="image">
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="h6 product-name">${name}</h6>
                                                <p>${numberWithCommas(price) + " VNĐ"}</p>
                                                <ul style="list-style-type: none;
                                                        margin: 0;
                                                        padding: 0;
                                                        overflow: hidden;">
                                                        <li style="float: left;"><strong class="product-color">Màu sắc</strong></li>
                                                        <li style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; float: left; margin-left: 5px" title="Cosmos">
                                                        </li>
                                                    </ul>
                                                    
                                                </span><br>
                                                <p style=""><strong class="product-quantity">Số lượng:</strong>&nbsp; ${quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="cart-content-btn">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Tiếp tục mua sắm</button>
                                                    <a href="/gio-hang" class="btn btn-primary"><i class="material-icons"></i>Xem giỏ hàng</a>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <style>
                                    #blockcart-modal .modal-dialog {
                                        max-width: 600px;
                                        width: 40%;
                                    }

                                    .material-icons {
                                        font-family: Material Icons;
                                        font-weight: 400;
                                        font-style: normal;
                                        font-size: 20px;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 1em;
                                        height: 1em;
                                        line-height: 1;
                                        text-transform: none;
                                        letter-spacing: normal;
                                        word-wrap: normal;
                                        white-space: nowrap;
                                        direction: ltr;
                                        -webkit-font-smoothing: antialiased;
                                        text-rendering: optimizeLegibility;
                                    }

                                    #blockcart-modal strong, p {
                                        color: #333;
                                        font-size: 14px;
                                        font-weight: 600;
                                    }
                                </style>
                            </div>
                        `

                        $(modal).append(content);
                        $(modal).modal('show')
                    } else {
                        showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
                    }
                } else {
                    showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
                }
            })
        });

        $('#content-wrapper ul.comments_advices a.open-comment-form, #new_comment_tab_btn').click((e) => {
            var modal = $('#myModal');
            $(modal).modal('show');
        });

        $('.new_comment_form_content div.star').mouseenter((e) => {
            $(e.currentTarget).addClass('star_on')
            $(e.currentTarget).prevAll('div.star').addClass('star_on');
            $(e.currentTarget).nextAll('div.star').removeClass('star_on')
        });

        $('#id_new_comment_form').submit((e) => {
            e.preventDefault();

            //variable
            var title = $(e.currentTarget).find('input#comment_title').val(),
                id = $(e.currentTarget).find('input#id_product_comment_send').val(),
                content = $(e.currentTarget).find('textarea#content').val(),
                star = $(e.currentTarget).find('ul#criterions_list div.star_content div.star_on').length;

            var parameters = {
                product: id,
                title: title,
                content: content,
                star: star
            }

            $.post('/product/review', {
                review: parameters
            }, (data) => {
                if (data.error) {
                    showNotification(data.error);
                    return
                }

                $('#myModal').modal('hide')

                if (data.review) {
                    $('#result_comment').modal('show');

                    setTimeout(() => {
                        $('#result_comment').modal('hide');
                    }, 3000);
                }
            }).error((err) => {
                showNotification("Lỗi không xác định, vui lòng tại lại trang để thử lại.")
            });

        });

        $.get(`/api/v1/product/get-reviews?product=${product._id}`, (data) => {
            if (data.product) {
                var reviews = data.product.reviews;

                if (!reviews || reviews.length == 0) { return }

                $('ul.comments_advices a.reviews span').text(reviews.length || 0);

                var averageStar = 0;
                var totalStar = 0;
                var blockComment = $('#product_comments_block_tab');
                var items = '';
                reviews.forEach(review => {

                    totalStar += Number.parseInt(review.star);

                    items += `
                        <div class="comment clearfix">
                            <div class="comment_author">
                                <div class="star_content clearfix">`

                    for (let i = 1; i <= 5; i++) {
                        if (i <= review.star) {
                            items += `<div class="star star_on"></div>`
                        } else {
                            items += `<div class="star"></div>`
                        }
                    }

                    items += `</div>
                                <div class="comment_author_infos">
                                    <strong>${review.byUser.fullName.firstName} ${review.byUser.fullName.lastName}`

                    var userOrders = review.byUser.orders;
                    if (userOrders && userOrders.length > 0) {
                        if (userOrders.find(order => {
                            if (order.products) {
                                if (order.products.find(element => {
                                    return element.id == product._id
                                })) {
                                    return order
                                }
                            } else {
                                return null
                            }
                        })) {
                            items += `<label style="color: #2ba832;">
                                            <i class="material-icons" style="font-size: 20px;">check</i>Đã mua hàng tại Alomobile.tech
                                        </label>`
                        }
                    }

                    var date = new Date(review.created_at);

                    items += `</strong>
                                    <em>${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</em>
                                </div>
                            </div>
                            <div class="comment_details">
                                <h4 class="title_block">${review.title}</h4>
                                <p>${review.content}</p>
                                <ul>
                                </ul>
                            </div>
                        </div>
                    `
                });

                averageStar = Math.round(totalStar / reviews.length)

                var star = $('#main div.comments_note div.star_content').find('div.star');
                star.each((index, element) => {
                    if (index < averageStar) {
                        $(element).addClass('star_on');
                    } else {
                        $(element).removeClass('star_on')
                    }
                });

                $(blockComment).find('div.comment').remove();
                $(blockComment).append(items);
            }
        })
    });
})(product)