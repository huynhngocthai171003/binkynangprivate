// ==========================================================================
// FILE BẢO MẬT ĐỘC LẬP: CHẶN F12, CHUỘT PHẢI, CTRL+U, CTRL+SHIFT+I, CTRL+S
// Tên file khuyên dùng: script_security.js
// ==========================================================================

(function() {
    // 1. Chặn menu chuột phải (Context Menu) trên toàn bộ trang web
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // 2. Lắng nghe và chặn các tổ hợp phím tắt mở DevTools và View Source
    document.addEventListener('keydown', (e) => {
        // Chặn phím chức năng F12 trực tiếp
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        
        // Chặn Ctrl + U hoặc Cmd + U (Xem mã nguồn hệ thống - View Source)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
            e.preventDefault();
            return false;
        }
        
        // Chặn Ctrl + Shift + I / C / J (Tổ hợp phím mở Inspect Element / Console)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'j')) {
            e.preventDefault();
            return false;
        }

        // Chặn Ctrl + S hoặc Cmd + S (Hành vi tải / lưu toàn bộ trang web về máy tính)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            return false;
        }
    });
})();