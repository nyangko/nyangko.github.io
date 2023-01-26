/*
* Author: Nyangko
* Version: 1.0.0
*/
"use strict";

let prevReferrer = document.referrer;

// 이전 사이트 또는 이전 페이지로 이동
function movePrevReferrer() {
	if (prevReferrer && prevReferrer.length > 0) {
		location.href = prevReferrer;
	} else {
		history.back()
	}
}

(function ($) {
	// 현재 일시 기록
	function createDate(date) {
		let month = date.getMonth() + 1;	// 월
		let day = date.getDate();			// 날짜

		$('.app-bar .app-date').html(`${month}월 ${day}일`);
	}

	// 현재 시간 기록
	function createTime(date) {
		let hour = date.getHours();
		if (hour < 10) {
			hour = `0${hour}`;
		}

		let minutes = date.getMinutes();
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}

		let seconds = date.getSeconds();
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}

		$('.app-bar .app-time').html(`${hour}:${minutes}:${seconds}`);
	}

	// 현재 경력 기록
	function createCareer(startDate, nowDate) {
		var d1Y = startDate.getFullYear();
        var d2Y = nowDate.getFullYear();
        var d1M = startDate.getMonth();
        var d2M = nowDate.getMonth();

		let year = d2Y - d1Y;
        let month = (d2M + 12 * d2Y) - (d1M + 12 * d1Y);

		$('info-list .career').html(`${year}년 ${month}월차`);
	}

	// 코딩 스킬 목록 작선
	function createSkills() {
		const skillMap = {
			'HTML/CSS': { lv: 5, per: 100 },
			'PHP': { lv: 5, per: 100 },
			'Smarty': { lv: 5, per: 100 },
			'NodeJS': { lv: 5, per: 92 },
			'Javascript': { lv: 5, per: 100 },
			'Typescript': { lv: 4, per: 79 },
			'VueJS 2': { lv: 5, per: 93 },
			'Swift': { lv: 4, per: 79 },
			'Python': { lv: 1, per: 18 },
			'C#': { lv: 1, per: 14 },
			'space': 40,
			'MySQL': { lv: 5, per: 94 },
			'Redis': { lv: 5, per: 94 },
			'SphinxSearch': { lv: 4, per: 78 },
			'RealmDB': { lv: 4, per: 70 },
		};

		let template = `
<div class="skill clearfix">
	<h4>{0}</h4>
	<div class="skill-value">Lv.{1}</div>
</div>
<div class="skill-container">
	<div class="skill-percentage" style="width:{2}%"></div>
</div>`;

		let codingHtml = [];
		Object.entries(skillMap).map((row) => {
			let copyTemplate = template;
			let key = row[0]
			let val = row[1]

			if (key.indexOf('space') != -1) {
				codingHtml.push(`<div class="white-space-${val}"></div>`);
				return;
			}

			copyTemplate = copyTemplate.replace('{0}', key)
				.replace('{1}', val.lv)
				.replace('{2}', val.per)

			codingHtml.push(copyTemplate)
		});

		$('.skills-info.coding-skills').html(codingHtml);
	}

	
    $(document).ready(function () {
		let jobStartDate = new Date('2013.03.04');
		
		setInterval(() => {
			const date = new Date();

			createDate(date);
			createTime(date);

			createCareer(jobStartDate, date);
		}, 1000);

		createSkills();
	});
})(jQuery);