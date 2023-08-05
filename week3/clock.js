function padNumber(number) {
    return number.toString().padStart(2, '0');
}

let battery = 100;
let alarms = [];
const batteryBox = document.getElementById('battery-box');
const timeBox = document.getElementById('time-box');
const alarmStatusBox = document.getElementById('alarm-status-box');
const alarmSound = document.getElementById('alarm-sound');

function updateBattery() {
    if (battery <= 0) {
        batteryBox.style.backgroundColor = 'red';
        timeBox.style.backgroundColor = 'black';
        timeBox.textContent = '';
        return;
    }
    if (battery < 20) {
        batteryBox.style.backgroundColor = 'red';
    }
    batteryBox.textContent = '배터리 상태: ' + battery + '%';
    battery--;
}

function updateTime() {
    if (battery <= 0) return;
    const now = new Date();
    const timeString = padNumber(now.getHours()) + ':' + padNumber(now.getMinutes()) + ':' + padNumber(now.getSeconds());
    timeBox.textContent = '현재 시간: ' + timeString
    alarms.forEach((alarm, index) => {
        if (alarm.hours == now.getHours() && alarm.minutes == now.getMinutes() && alarm.seconds == now.getSeconds()) {
            alarmSound.play();
            alert('알람 시간입니다!');
            alarmSound.pause();
            alarmSound.currentTime = 0;
            alarms.splice(index, 1);
            updateAlarmStatus();
        }
    });
} 

function updateAlarmStatus() {
    const alarmBox = document.getElementById('alarm-status-box');
    if (alarms.length === 0) {
        alarmBox.innerHTML = '<p>알람 현황</p>';
    } else {
        alarmBox.innerHTML = '<p>알람 현황</p>';
        alarms.forEach(alarm => {
            const alarmTime = `${padNumber(alarm.hours)}:${padNumber(alarm.minutes)}:${padNumber(alarm.seconds)}`;
            const alarmDiv = document.createElement('div');
            alarmDiv.textContent = alarmTime;
            alarmBox.appendChild(alarmDiv);
        });
    }
} 

document.getElementById('add-alarm-button').addEventListener('click', function() {
    if (alarms.length >= 3) {
        alert('최대 3개의 알람만 설정 가능합니다.');
        return;
    }

    const hours = parseFloat(document.getElementById('hours').value);
    const minutes = parseFloat(document.getElementById('minutes').value);
    const seconds = parseFloat(document.getElementById('seconds').value);

    // 시, 분, 초의 유효성 검증
    if (hours < 0 || hours > 23 || isNaN(hours) || !Number.isInteger(hours)) {
        alert('시간은 0에서 23 사이의 정수여야 합니다.');
        return;
    }
    if (minutes < 0 || minutes > 59 || isNaN(minutes) || !Number.isInteger(minutes)) {
        alert('분은 0에서 59 사이의 정수여야 합니다.');
        return;
    }
    if (seconds < 0 || seconds > 59 || isNaN(seconds) || !Number.isInteger(seconds)) {
        alert('초는 0에서 59 사이의 정수여야 합니다.');
        return;
    }
    alarms.push({ hours, minutes, seconds });
    updateAlarmStatus();
});
setInterval(updateBattery, 1000);
setInterval(updateTime, 1000);
