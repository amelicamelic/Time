// ------------------- 密码锁屏逻辑 -------------------
function isPasswordCorrect(input){
    const num = Number(input);
    return num === (1139526831439872 / 2048 / 20.5 / 1024 / 864);
} // 设置密码
let idleTimer;
let pinMode = false;

function checkPassword(){
    const input = document.getElementById("passwordInput").value;
    if(isPasswordCorrect(input)){
        document.getElementById("loginScreen").style.display = "none";
        resetIdleTimer();
    }else{
        document.getElementById("loginMsg").innerText = "𓂧𓏏 𓈖𓆑 𓅱𓂋";
    }
}

function resetIdleTimer(){
    if(pinMode) return;  // 固定模式不启动自动锁
    if(idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(lockScreen, 0.5 * 60 * 1000); // 30秒无操作锁屏
}

function lockScreen(){
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("passwordInput").value = "";
    document.getElementById("loginMsg").innerText = "";
}

// 监听用户操作
["mousemove", "keydown", "click"].forEach(evt => {
    document.addEventListener(evt, resetIdleTimer);
});

function togglePin(){
    pinMode = !pinMode;
    const btn = document.getElementById("pinLock");

    if(pinMode){
        btn.classList.add("active");
        if(idleTimer) clearTimeout(idleTimer);
    }else{
        btn.classList.remove("active");
        resetIdleTimer();
    }
}

// 页面加载时锁屏
lockScreen();
window.addEventListener("blur", lockScreen);
document.addEventListener("visibilitychange", () => {
    if (document.hidden) lockScreen();
});
