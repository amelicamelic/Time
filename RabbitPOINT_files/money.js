// ------------------- 工资计算逻辑 -------------------
const monthlySalary = 230000;
const workHoursPerDay = 8;

function getMonthInfo(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const totalDays = new Date(year, month+1, 0).getDate();

    let weekendDays = 0;
    for(let i=1;i<=totalDays;i++){
        const d = new Date(year, month, i);
        if(d.getDay() === 0 || d.getDay() === 6){
            weekendDays++;
        }
    }

    return { totalDays, weekendDays, workDays: totalDays - weekendDays };
}

function isWorkingTime(date){
    const day = date.getDay();
    if(day === 0 || day === 6) return false;

    const minutes = date.getHours()*60 + date.getMinutes();
    if(minutes >= 600 && minutes < 780) return true;
    if(minutes >= 840 && minutes < 1140) return true;
    return false;
}

function calculateWorkTimeProgress(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const {workDays} = getMonthInfo();

    let workedMs = 0;
    const totalMs = workDays * workHoursPerDay * 3600000;

    for(let i=1;i<=today;i++){
        const d = new Date(year, month, i);
        if(d.getDay() !== 0 && d.getDay() !== 6){
            if(i < today){
                workedMs += workHoursPerDay * 3600000;
            }else{
                const start = new Date(year, month, today, 10, 0, 0);
                const lunchStart = new Date(year, month, today, 13, 0, 0);
                const lunchEnd = new Date(year, month, today, 14, 0, 0);
                const end = new Date(year, month, today, 19, 0, 0);

                if(now > start){
                    if(now <= lunchStart){
                        workedMs += now - start;
                    }else if(now <= lunchEnd){
                        workedMs += lunchStart - start;
                    }else if(now <= end){
                        workedMs += (lunchStart - start) + (now - lunchEnd);
                    }else{
                        workedMs += (lunchStart - start) + (end - lunchEnd);
                    }
                }
            }
        }
    }

    return {workedMs, totalMs};
}

function formatMs(ms){
    let totalSeconds = Math.floor(ms/1000);
    const days = Math.floor(totalSeconds / (8*3600));
    totalSeconds %= (8*3600);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`;
}

function calculateEarned(){
    const {workedMs, totalMs} = calculateWorkTimeProgress();
    return monthlySalary * (workedMs / totalMs);
}

function update(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth()+1).padStart(2,'0');
    const day = String(now.getDate()).padStart(2,'0');
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');

    document.getElementById("nowTime").innerHTML =
        `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;

    const {totalDays, weekendDays, workDays} = getMonthInfo();

    document.getElementById("workdays").innerHTML =
        `本月共计 ${totalDays} 天 ・ 假日 ${weekendDays} 天 ・ 上班 ${workDays} 天`;

    document.getElementById("money").innerHTML =
        "Rabbit POINT ℗" + calculateEarned().toFixed(2);

    if(isWorkingTime(now)){
        document.getElementById("todayStatus").innerHTML =
            '<span class="working">社畜工作中</span>';

        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0);
        const diff = end - now;

        const h = Math.floor(diff/3600000);
        const m = Math.floor((diff%3600000)/60000);
        const s = Math.floor((diff%60000)/1000);

        document.getElementById("countdown").innerHTML =
            ` 𓋹 ${h}小时 ${m}分 ${s}秒 `;

    }else{
        document.getElementById("todayStatus").innerHTML =
            '<span class="resting">休息中</span>';
        document.getElementById("countdown").innerHTML = "";
    }

    const {workedMs, totalMs} = calculateWorkTimeProgress();
    const remainingMs = totalMs - workedMs;

    document.getElementById("progress").innerHTML =
        `已上 ${formatMs(workedMs)} ｜ 剩 ${formatMs(remainingMs)}`;
}

setInterval(update,1000);
update();

// ------------------- 请假了 -------------------

let leaveMinutes = 0;

function setLeave(d = 0, h = 0, m = 0){
    leaveMinutes = d * 8 * 60 + h * 60 + m;
}

setLeave(1, 2, 0); // 改这里

function getLeaveDeduction(){
    const dailyRate = monthlySalary / 22;      // 日薪
    const hourlyRate = monthlySalary / 173.5;  // 时薪

    // 用时薪扣（公司规则）
    return (leaveMinutes / 60) * hourlyRate;
}

const _oldCalc = calculateEarned;

calculateEarned = function(){
    let { workedMs, totalMs } = calculateWorkTimeProgress();
    let earned = monthlySalary * (workedMs / totalMs);

    earned -= getLeaveDeduction();

    return Math.max(0, earned);
}
