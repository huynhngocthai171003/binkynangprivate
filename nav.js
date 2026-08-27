// 1. CẤU HÌNH DANH SÁCH MENU & PHÂN HỆ
const NAVIGATION_CONFIG = {
    truyentin: {
        title: "TRUYỀN TIN",
        icon: "radar",
        items: [
            { 
                id: "morse", 
                label: "Morse Code", 
                icon: "subtitles", 
                defaultPage: "index.html",
                pages: ["index.html", "learn.html"] 
            },
            { 
                id: "semaphore", 
                label: "Semaphore", 
                icon: "sign_language", 
                defaultPage: "semaphore.html",
                pages: ["semaphore.html", "challenge_sem.html", "learn_sem.html"] 
            }
        ]
    },
    matthu: {
        title: "MẬT THƯ",
        icon: "enhanced_encryption",
        items: [
            { 
                id: "thaythe", 
                label: "Thay thế", 
                icon: "swap_horiz", 
                defaultPage: "thaythe.html",
                pages: ["thaythe.html", "mt_toa_do.html", "mt_bang_hang_cot.html", "nhatrang.html"] 
            },
            { 
                id: "camranh", 
                label: "Dời chỗ", 
                icon: "grid_on", 
                defaultPage: "camranh.html",
                pages: ["camranh.html"] 
            }
        ]
    }
};

const SUBNAV_DATA = {
    index: [
        { path: "index.html", label: "LUYỆN TẬP (MÃ HÓA & TRUYỀN TIN)" },
        { path: "learn.html", label: "HỌC TẬP MORSE (TRA CỨU ĐỐI XỨNG)" }
    ],
    semaphore: [
        { path: "semaphore.html", label: "LUYỆN TẬP (MÃ HÓA & TRUYỀN TIN)" },
        { path: "challenge_sem.html", label: "THỬ THÁCH (TRÒ CHƠI GIẢI MÃ)" },
        { path: "learn_sem.html", label: "HỌC TẬP SEMAPHORE (TRA CỨU VỊ TRÍ)" }
    ],
    thaythe: [
        { path: "thaythe.html", label: "MẬT THƯ THAY THẾ (CAESAR)" },
        { path: "mt_toa_do.html", label: "MẬT THƯ TỌA ĐỘ (MA TRẬN SỐ/CHỮ)" },
        { path: "mt_bang_hang_cot.html", label: "MẬT THƯ BẢNG - HÀNG - CỘT" },
        { path: "nhatrang.html", label: "MẬT THƯ KHÓA TỪ (NHA TRANG)" }
    ],
    camranh: [
        { path: "camranh.html", label: "ITEM 1 (MẬT THƯ DỜI CHỖ CHÍNH)" },
        { path: "item2.html", label: "ITEM 2 (NỘI DUNG TÙY CHỈNH THÊM)" }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // 1. Render Sidebar phân cấp Cha - Con
    const sidebarContainer = document.getElementById("sidebar-container");
    if (sidebarContainer) {
        let sidebarHtml = `
            <div class="px-6 flex flex-col items-center w-full">
                <div class="w-full aspect-square rounded-3xl bg-white p-4 logo-glow-card flex items-center justify-center overflow-hidden mb-5 transition-all hover:scale-[1.03]">
                    <img src="BIN KỸ NĂNG-01.png" alt="Logo" class="w-full h-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <span class="material-symbols-outlined text-background text-6xl hidden">token</span>
                </div>
            </div>
            <nav class="flex-1 space-y-3 px-3">
        `;

        for (const [groupKey, group] of Object.entries(NAVIGATION_CONFIG)) {
            const hasActiveChild = group.items.some(item => item.pages.includes(currentPath));
            
            sidebarHtml += `
                <div class="menu-group bg-white/[0.02] border border-white/5 rounded-xl p-1.5 mb-2">
                    <div class="menu-header flex items-center justify-between text-xs font-black text-primary uppercase tracking-wider px-3 py-2 cursor-pointer hover:bg-white/5 rounded-lg transition-all select-none" data-group="${groupKey}">
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-sm text-primary/80">${group.icon}</span>
                            <span>${group.title}</span>
                        </div>
                        <span class="material-symbols-outlined text-sm transition-transform duration-300 text-on-surface-variant ${hasActiveChild ? 'rotate-180' : ''}">expand_more</span>
                    </div>
                    <div class="menu-content space-y-1 overflow-hidden transition-all duration-300 pl-2 border-l border-white/10 ml-3 mt-1 ${hasActiveChild ? '' : 'max-h-0'}" id="group-${groupKey}">
            `;

            group.items.forEach(item => {
                const isActive = item.pages.includes(currentPath);
                const activeClass = isActive 
                    ? "bg-primary/15 text-primary font-bold shadow-sm" 
                    : "text-on-surface-variant hover:bg-white/5 hover:text-white";

                // Đã tăng khoảng cách giữa icon và text thành gap-3.5
                sidebarHtml += `
                    <a class="flex items-center gap-4 px-3 py-2 rounded-lg transition-all ${activeClass}" href="${item.defaultPage}">
                        <span class="material-symbols-outlined text-lg opacity-80">${item.icon}</span>
                        <span class="font-label-md text-xs uppercase tracking-wider">${item.label}</span>
                    </a>
                `;
            });

            sidebarHtml += `</div></div>`;
        }
        sidebarHtml += `</nav>`;
        sidebarContainer.innerHTML = sidebarHtml;

        // Gắn sự kiện click thu/mở mượt mà
        document.querySelectorAll('.menu-header').forEach(header => {
            header.addEventListener('click', () => {
                const groupKey = header.getAttribute('data-group');
                const content = document.getElementById(`group-${groupKey}`);
                const icon = header.querySelector('.material-symbols-outlined:last-child');

                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = '0px';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });

        // Thiết lập chiều cao ban đầu
        document.querySelectorAll('.menu-content').forEach(content => {
            if (!content.classList.contains('max-h-0')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0px';
            }
        });
    }

    // 2. Render Dropdown phụ (Subnav)
    const subnavContainer = document.getElementById("subnav-container");
    if (subnavContainer) {
        const subKey = subnavContainer.getAttribute("data-subnav");
        const optionsList = SUBNAV_DATA[subKey];
        if (optionsList) {
            let optionsHtml = optionsList.map(item => {
                const isSelected = item.path === currentPath ? "selected" : "";
                return `<option value="${item.path}" ${isSelected}>${item.label}</option>`;
            }).join("");

            subnavContainer.innerHTML = `
                <div class="mb-1 md:mb-2 max-w-md">
                    <select onchange="window.location.href=this.value" class="w-full bg-surface-container-high border border-primary/20 text-primary font-bold rounded-lg p-2 md:p-3 text-xs md:text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                        ${optionsHtml}
                    </select>
                </div>
            `;
        }
    }
});
