// ==UserScript==
// @name         AutoClick For TapSwap - Init Browser
// @namespace    AutoClickForTelegramMiniApp
// @version      2024-06-18 08:20
// @description  TapSwap AutoClick - Init
// @author       KenVnit
// @match        *://app.tapswap.club/*
// @grant        none
// @downloadURL  https://github.com/1179vn/AutoClick-For-TapSwap/raw/main/AutoClick-For-TapSwap-Init-Browser.user.js
// @updateURL    https://github.com/1179vn/AutoClick-For-TapSwap/raw/main/AutoClick-For-TapSwap-Init-Browser.user.js
// @homepage     https://github.com/1179vn/AutoClick-For-TapSwap
// ==/UserScript==

(function() {
    'use strict';

    function replaceScriptUrl() {
        // URL-адрес для замены
        const oldUrl = 'https://telegram.org/js/telegram-web-app.js';
        const newUrl = 'https://raw.githubusercontent.com/1179vn/MyAssets/main/js/telegram-web-app.js';

        // Получаем все теги <script> на странице
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            // Проверяем, содержит ли src один из URL-адресов для замены
            if (script.src === oldUrl) {
                // Создаем новый тег <script> с новым URL
                const newScript = document.createElement('script');
                newScript.src = newUrl;
                newScript.type = 'text/javascript';

                // Заменяем старый тег на новый
                script.parentNode.replaceChild(newScript, script);
                console.log('Script URL replaced:', newScript.src);
            }
        }
    }

    function checkAndReload() {
        if (document.querySelector('div._leaveContainer_rxbn1_1')) {
            console.log('Class _leaveContainer_rxbn1_1 found, reloading page.');
            location.reload();
        }
    }

    new MutationObserver(mutations => {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                replaceScriptUrl();
                //checkAndReload();
            }
        });
    }).observe(document.body, { childList: true, subtree: true });

    replaceScriptUrl();
    checkAndReload();
})();
