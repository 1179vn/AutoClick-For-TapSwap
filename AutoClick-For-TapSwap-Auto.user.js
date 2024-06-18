// ==UserScript==
// @name         AutoClick For TapSwap - Auto
// @namespace    AutoClickForTelegramMiniApp
// @version      2024-06-18-09:00
// @description  AutoClick For TapSwap
// @author       KenVnit
// @match        *://app.tapswap.club/*
// @grant        none
// @downloadURL  https://github.com/1179vn/AutoClick-For-TapSwap/raw/main/AutoClick-For-TapSwap-Auto.user.js
// @updateURL    https://github.com/1179vn/AutoClick-For-TapSwap/raw/main/AutoClick-For-TapSwap-Auto.user.js
// @homepage     https://github.com/1179vn/AutoClick-For-TapSwap
// ==/UserScript==

(function() {
    'use strict';

    const styles = {
        success: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        starting: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        error: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        info: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    };
    const logPrefix = '%c[TapSwap] ';
    const originalLog = console.log;
    console.log = function () {
        if (typeof arguments[0] === 'string' && arguments[0].includes('[TapSwap]')) {
            originalLog.apply(console, arguments);
        }
    };
    console.error = console.warn = console.info = console.debug = () => { };
    console.clear();
    console.log(`${logPrefix}Starting`, styles.starting);
    console.log(`${logPrefix}Create by t.me/kenvnit - Phạm Quang Vũ`, styles.starting);

    function createEvent(type, target, options) {
        const event = new PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            detail: 1,
            pointerId: 1,
            width: 1,
            height: 1,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            pointerType: 'touch',
            isPrimary: true,
            //...options
        });
        target.dispatchEvent(event);
    }

    function getCoords(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        return {
            clientX: x,
            clientY: y,
            screenX: window.screenX + x,
            screenY: window.screenY + y
        };
    }

    const randomDelay = (min, max) => Math.random() * (max - min) + min;
    const randomOffset = range => Math.random() * range * 2 - range;
    const randomPressure = () => Math.random() * 0.5 + 0.5;

    function clickElement(target) {
        const { clientX, clientY, screenX, screenY } = getCoords(target);
        const options = {
            clientX: clientX + randomOffset(5),
            clientY: clientY + randomOffset(5),
            screenX: screenX + randomOffset(5),
            screenY: screenY + randomOffset(5),
            pressure: randomPressure()
        };
        ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(type => createEvent(type, target, options));
    }


    let isGamePaused = false;

    function toggleGamePause() {
        isGamePaused = !isGamePaused;
        pauseButton.textContent = isGamePaused ? 'Resume' : 'Pause';
        console.log(`${logPrefix}${pauseButton.textContent}`, styles.info);
    }

    const pauseButton = document.createElement('button');
    pauseButton.textContent = 'Pause';
    Object.assign(pauseButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        padding: '4px 8px',
        backgroundColor: '#5d5abd',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer'
    });
    pauseButton.onclick = toggleGamePause;
    document.body.appendChild(pauseButton);



    // Настраиваемые значения
    const minClickDelay = 30; // Минимальная задержка между кликами в миллисекундах
    const maxClickDelay = 50; // Максимальная задержка между кликами в миллисекундах
    const pauseMinTime = 100000; // Минимальная пауза в миллисекундах (100 секунд)
    const pauseMaxTime = 300000; // Максимальная пауза в миллисекундах (300 секунд)
    const energyThreshold = 25; // Порог энергии, ниже которого делается пауза
    const checkInterval = 1500; // Интервал проверки наличия монеты в миллисекундах (3 секунды)
    const maxCheckAttempts = 3; // Максимальное количество попыток проверки наличия монеты
    
    let checkAttempts = 0; // Счётчик попыток проверки

    function triggerEvent(element, eventType, properties) {
        const event = new MouseEvent(eventType, properties);
        element.dispatchEvent(event);
    }
    
    function getRandomCoordinateInCircle(radius) {
        let x, y;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
        } while (x * x + y * y > 1); // Проверяем, что точка находится внутри круга
        return {
            x: Math.round(x * radius),
            y: Math.round(y * radius)
        };
    }

    function getCurrentEnergy() {
        const energyElement = document.querySelector("div._value_tzq8x_13 h4._h4_1w1my_1");
        if (energyElement) {
            return parseInt(energyElement.textContent);
        }
        return null;
    }

    function clickButton() {
        const currentEnergy = getCurrentEnergy();
        if (currentEnergy !== null && currentEnergy < energyThreshold) {
            const pauseTime = pauseMinTime + Math.random() * (pauseMaxTime - pauseMinTime);
            console.log(`${logPrefix}The energy is lower ${energyThreshold}. Pause for ${Math.round(pauseTime / 1000)} seconds.`, styles.info);
            setTimeout(clickButton, pauseTime);
            return;
    }

    const button = document.querySelector("#ex1-layer img");

        if (button) {
            const rect = button.getBoundingClientRect();
            const radius = Math.min(rect.width, rect.height) / 2;
            const { x, y } = getRandomCoordinateInCircle(radius);
    
            const clientX = rect.left + radius + x;
            const clientY = rect.top + radius + y;
    
            const commonProperties = {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: clientX,
                clientY: clientY,
                screenX: clientX,
                screenY: clientY,
                pageX: clientX,
                pageY: clientY,
                pointerId: 1,
                pointerType: "touch",
                isPrimary: true,
                width: 1,
                height: 1,
                pressure: 0.5,
                button: 0,
                buttons: 1
            };
    
            // Trigger events
            triggerEvent(button, 'pointerdown', commonProperties);
            triggerEvent(button, 'mousedown', commonProperties);
            triggerEvent(button, 'pointerup', { ...commonProperties, pressure: 0 });
            triggerEvent(button, 'mouseup', commonProperties);
            triggerEvent(button, 'click', commonProperties);
    
            // Schedule the next click with a random delay
            const delay = minClickDelay + Math.random() * (maxClickDelay - minClickDelay);
            setTimeout(checkCoinAndClick, delay);
        } else {
            console.log(`${logPrefix}Coin not found!`, styles.error);
        }
    }

    function checkCoinAndClick() {
         if (!isGamePaused) {
            try {
                const button = document.querySelector("#ex1-layer img");
                if (button) {
                    console.log(`${logPrefix}Coin found. The click is executed.`, styles.success);
                    clickButton();
                } else {
                    checkAttempts++;
                    if (checkAttempts >= maxCheckAttempts) {
                        console.log(`${logPrefix}Coin not found after 3 attempts. Reloading the page.`, styles.error);
                        location.reload();
                    } else {
                        console.log(`${logPrefix}Coin not found. Attempt  ${checkAttempts}/${maxCheckAttempts}. Check again after 3 seconds.`, styles.error);
                        setTimeout(checkCoinAndClick, checkInterval);
                    }
                }
            } catch (error) {
                // Do not log the error to avoid cluttering the console
    			console.log(`${logPrefix}${error.message}`, styles.error);
            }
        }
    	else
    	{
    		setTimeout(checkCoinAndClick, randomDelay(50, 150));
    	}
    }

    // Start the first check
    checkCoinAndClick();
})();
