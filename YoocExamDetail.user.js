// ==UserScript==
// @name         易班优课考试查卷
// @namespace    YoocExamDetail
// @version      0.2
// @description  易班优课考试查卷，让禁止查卷的考试也能查卷。（不是在考试前偷看试卷！）
// @author       Avenshy
// @homepageURL  https://github.com/Avenshy/YoocExamDetail
// @supportURL   https://github.com/Avenshy/YoocExamDetail/issues
// @match        https://www.yooc.me/group/*
// @license      GPL-3.0
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    let tabs = document.querySelector('.aside-nav').querySelectorAll('a');
    for (let tab of tabs) {
        if (tab.querySelector('p').textContent == '在线考试') {
            tab.addEventListener('click', () => {
                if (document.querySelector('.ctx-header').querySelector('h1').textContent != '在线考试') {
                    location.reload(true);
                }
            },
            false);
        }
    }
    let groupId = document.querySelector('#group-data').getAttribute('data-group-id');
    let examList = document.querySelectorAll('.done.clearfix');
    for (let exam of examList) {
        let examId = exam.getAttribute('data-exam-id');
        let scoreElement = exam.querySelector('.score');
        let text = scoreElement.textContent;
        if (text == "禁止查卷") {
            scoreElement.textContent = "点击查卷";
            scoreElement.addEventListener('click', () => {
                window.open(`https://www.yooc.me/group/${groupId}/exam/${examId}/detail`,'_blank');
            },
            false);
        }
    }
})();