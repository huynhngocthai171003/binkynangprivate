// 1. CẤU HÌNH CÁC NHÓM TRANG TRONG HỆ THỐNG
const NAVIGATION_DATA = {
    // Nhóm Morse
    morse: {
        title: "HỆ THỐNG MORSE",
        items: [
            { path: "index.html", label: "LUYỆN TẬP (MÃ HÓA & TRUYỀN TIN)" },
            { path: "learn.html", label: "HỌC TẬP MORSE (TRA CỨU ĐỐI XỨNG)" }
        ]
    },
    // Nhóm Semaphore
    semaphore: {
        title: "HỆ THỐNG SEMAPHORE",
        items: [
            { path: "semaphore.html", label: "LUYỆN TẬP (MÃ HÓA & TRUYỀN TIN)" },
            { path: "challenge_sem.html", label: "THỬ THÁCH (TRÒ CHƠI GIẢI MÃ)" },
            { path: "learn_sem.html", label: "HỌC TẬP SEMAPHORE (TRA CỨU VỊ TRÍ)" }
        ]
    },
    // Nhóm Thay thế
    thaythe: {
        title: "MẬT THƯ THAY THẾ",
        items: [
            { path: "thaythe.html", label: "MẬT THƯ THAY THẾ (CAESAR)" },
            { path: "mt_toa_do.html", label: "MẬT THƯ TỌA ĐỘ (MA TRẬN SỐ/CHỮ)" },
            { path: "mt_bang_hang_cot.html", label: "MẬT THƯ BẢNG - HÀNG - CỘT" },
            { path: "nhatrang.html", label: "MẬT THƯ KHÓA TỪ (NHA TRANG)" }
        ]
    }
};

// 2. TỰ ĐỘNG DỰNG DROPDOWN KHI LOAD TRANG
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("subnav-container");
    if (!container) return;

    // Xác định nhóm phân hệ dựa trên thuộc tính data-category trong HTML
    const groupKey = container.getAttribute("data-category");
    const group = NAVIGATION_DATA[groupKey];
    if (!group) return;

    // Lấy tên file hiện tại
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // Tạo mã HTML cho Dropdown
    let optionsHtml = group.items.map(item => {
        const isSelected = item.path === currentPath ? "selected" : "";
        return `<option value="${item.path}" ${isSelected}>${item.label}</option>`;
    }).join("");

    container.innerHTML = `
        <div class="mb-1 md:mb-2 max-w-md">
            <select onchange="window.location.href=this.value" class="w-full bg-surface-container-high border border-primary/20 text-primary font-bold rounded-lg p-2 md:p-3 text-xs md:text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                ${optionsHtml}
            </select>
        </div>
    `;
});