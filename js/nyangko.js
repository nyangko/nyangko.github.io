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
		let month = d2M - d1M;

		if (month < 0) {
			year -= 1
			month = 12 + month
		}

		if (month == 0) {
			$('.info-list .career').html(`${year}년차`);
		} else {
			$('.info-list .career').html(`${year}년 ${month}개월차`);
		}
	}

	// 코딩 스킬 목록 작선
	function createSkillsHTML() {
		const skillMap = {
			'HTML/CSS(SCSS)': { lv: 5, per: 100 },
			'PHP': { lv: 5, per: 100 },
			'Smarty': { lv: 5, per: 100 },
			'Javascript': { lv: 5, per: 100 },
			'NodeJS': { lv: 5, per: 92 },
			'Typescript': { lv: 4, per: 79 },
			'VueJS 2': { lv: 5, per: 93 },
			'VueJS 3': { lv: 2, per: 21 },
			'React': { lv: 1, per: 19 },
			'Swift': { lv: 4, per: 79 },
			'Objective-C': { lv: 3, per: 58 },
			'Python': { lv: 2, per: 26 },
			'C#': { lv: 2, per: 26 },
			'C': { lv: 1, per: 18 },
			'Lua': { lv: 2, per: 40 },

			'space-1': 30,
			'divider-title-1': 'Database',
			'space-2': 10,
			'MySQL': { lv: 5, per: 94 },
			'Redis': { lv: 5, per: 94 },
			'SphinxSearch': { lv: 4, per: 78 },
			'RealmDB': { lv: 4, per: 70 },

			'space-3': 30,
			'divider-title-2': 'ETC',
			'space-4': 10,
			'Nginx': { lv: 5, per: 93 },
			'Supervisor': { lv: 5, per: 85 },
			'Cron': { lv: 5, per: 90 },
			'CVS': { lv: 4, per: 76 },
			'Git': { lv: 4, per: 68 },
		};

		const LEVEL_TXT = {
			1: '기초',
			2: '경험 있음',
			3: '일부 이해',
			4: '가끔 사용',
			5: '자주 사용'
		}

		/** Template Type
		 * {0}: Skill name
		 * {1}: Skill Level
		 * {2}: Subjective experience
		 */
		let template = `
<div class="skill clearfix mb-5">
	<h4>{0}</h4>
	<div class="skill-value">{1}</div>
</div>`;
		/** Progress bar
		<div class="skill-container">
			<div class="skill-percentage" style="width:{2}%"></div>
		</div>
		*/

		let htmlItems = [
//			`<small>기초 &lt; 경험있음 &lt; 일부 이해 &lt; 가끔 사용 &lt; 자주 사용</small>`
		];
		Object.entries(skillMap).map((row) => {
			let copyTemplate = template;
			let key = row[0]
			let val = row[1]

			if (key.indexOf('space-') != -1) {
				htmlItems.push(`<div class="white-space-${val}"></div>`);
				return;
			} else if (key.indexOf('divider-title-') != -1) {
				htmlItems.push(`<div>${row[1]}</div>`);
				return;
			}

			copyTemplate = copyTemplate.replace('{0}', key)
				.replace('{1}', LEVEL_TXT[val.lv])
				.replace('{2}', val.per)

			htmlItems.push(copyTemplate)
		});

		$('.skills-info.coding-skills').html(htmlItems);
	}

	// 툴 
	function createToolsHTML() {
		const toolsMap = {
			'VSCode': 'vscode.png',
			'Vim': 'vim.png',
			'XCode': 'xcode.png',
			'Unity': 'unity.png',
			'PHPMyAdmin': 'pma.png',
			'Figma': 'figma.png',
			'Adobe XD': 'adobeXD.png',
			'CVS': 'cvs.png',
			'Github': 'github.png',
			'Github Desktop': 'githubDesktop.png',
			'Cloudflare': 'cloudflare.png',
		};

		let template = `
<li>
	<div class="knowledges-item">
		<img src="img/tools/{1}" width="14" height="14" alt="{0}" /> 
		{0}
	</div>
</li>`;

		let htmlItems = [];
		Object.entries(toolsMap).map((row) => {
			let copyTemplate = template;
			let key = row[0]
			let img = row[1]

			copyTemplate = copyTemplate.replace('{0}', key)
				.replace('{0}', key)
				.replace('{1}', img)

			htmlItems.push(copyTemplate)
		});

		$('.knowledges').html(htmlItems);
	}

	function createCareerHTML() {
		let careerMap = [
			{
				project: 'Web/Server, Game',
				date: '2022.6 ~ Current',
				title: 'Mefi.IO',
				subTitle: `- 채굴 게임으로 채굴 시 Metacoin 또는 Metacoin 토큰을 얻을 수 있음`,
				desc: {
					'Host': 'metaplanet.camp',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Unity, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, C#, NodeJS, Typescript, VueJS',
					'진행 인원': '5인(기획자 1, 개발자 3, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 설계',
						'(HTML/CSS, NodeJS, VueJS) 웹페이지 일부 작업',
						'(PHP) API 설계 및 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP) Socket Server 설계 및 작업',
						'(PHP) 이체 Daemon 설계 및 작업',
						'(NodeJS, Typescript) Telegram Bot 작업',
						'(C#) 사용자 설정 및 사용자 정보 표기, 이벤트 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2022.4 ~ Current',
				title: 'Mefi.IO',
				subTitle: `- 탈중앙화된 금융 서비스 (Metacoin, Ethereum)`,
				desc: {
					'Host': 'mefi.io, app.mefi.io',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin, Ethereum',
					'개발 언어': 'PHP, NodeJS, Typescript, VueJS',
					'진행 인원': '6인(기획자 1, 개발자 4, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 설계',
						'(HTML/CSS, NodeJS, VueJS) 웹페이지 일부 작업',
						'(PHP) API 설계 및 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP, NodeJS, Typescript) 이체 Daemon 설계 및 작업',
						'(NodeJS, Typescript) Socket Daemon 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2021.12 ~ Current',
				title: 'RedScan',
				subTitle: `- MetaCoin Explorer 사이트
					- MetaCoin Transaction 에 대하여 표기 및 검색`,
				desc: {
					'Host': 'redscan.io',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, VueJS',
					'진행 인원': '5인 (기획자 1, 개발자 3, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 설계',
						'(HTML/CSS, NodeJS, VueJS) 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP) Daemon 작업',
					]
				}
			},
			{
				project: 'iOS',
				date: '2021.8 ~ Current',
				title: 'MetaWallet Application',
				subTitle: `- Metacoin 지갑 어플리케이션
					- Metacoin이 지원하는 모든 프로토콜을 지원 `,
				desc: {
					'Host': 'apps.apple.com/kr/app/metawallet/id1296995715',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'Xcode, Figma, RealmDB, Metacoin',
					'개발 언어': 'Swift, PHP',
					'진행 인원': '3인 (기획자 1, 개발자 1, 디자이너 1)',
					'참여 내용': [
						'(RealmDB) DB 설계',
						'(Swift) 디자인 & 코드 작업',
						'(HTML/CSS, NodeJS, VueJS) 웹페이지 일부 작업',
						'(PHP) API 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2021.7 ~ Current',
				title: 'Vertical Mining',
				subTitle: `- 가상화폐 채굴 프로그램, 사용자의 유휴 자원을 이용하여 채굴 코인을 채굴한뒤 Metacoin 기반의 토큰으로 보상해주는 서비스`,
				desc: {
					'Host': 'verticalmining.com',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin, Chia',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, VueJS',
					'진행 인원': '6인(기획자 1, 개발자 4, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 일부 설계',
						'(HTML/CSS, NodeJS, VueJS) 웹페이지 일부 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Daemon 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2021.3 ~ 2021.4(보류)',
				title: 'Airdrop Camp',
				subTitle: `- 가상화폐 Airdrop 관리, 다수의 사용자에게 메타코인 기반의 토큰을 배분하기 위한 서비스`,
				desc: {
					'Host': 'airdrop.camp',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, VueJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 일부 설계',
						'(HTML/CSS, NodeJS, VueJS) 웹페이지 일부 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Daemon 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2021.1 ~ 2021.04(보류)',
				title: 'Playpang',
				subTitle: `- Metacoin NFT 거래 사이트`,
				desc: {
					'Host': 'playpang.com',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, VueJS',
					'진행 인원': '5인(기획자 1, 개발자 3, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 일부 설계',
						'(HTML/SCSS, NodeJS, VueJS) 웹페이지 일부 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Daemon 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2020.12 ~ 2021.6',
				title: 'Swap.Marx.financial',
				subTitle: `- Ethereum 기반의 토큰과 Metacoin 기반의 토큰 Swap`,
				desc: {
					'Host': 'swap.marx.financial',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin, Ethereum',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, VueJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 설계',
						'(HTML/SCSS, NodeJS, VueJS) 웹페이지 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP) Daemon 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2020.10 ~ Current',
				title: 'MetaWallet Browser Extension',
				subTitle: `- 사용자들이 Metacoin을 쉽게 사용하기 위해 만든 지갑, Metamask 참조`,
				desc: {
					'Host': 'chrome.google.com/webstore/detail/metawallet/bkklifkecemccedpkhcebagjpehhabfb',
					'개발 환경': 'Mac, Linux',
					'개발 툴/DB': 'VSCode, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, VueJS',
					'진행 인원': '5인(기획자 1, 개발자 3, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 설계',
						'(HTML/SCSS, NodeJS, VueJS) 확장프로그램 작업',
						'(PHP) API 설계 및 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP) Daemon 설계 및 작업',
						'(NodeJS, Typescript) Socket Server 설계 및 작업'
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2020.9 ~ 2021.2',
				title: 'Macaron',
				subTitle: `- 블록체인 기반 탈중앙화 금융 서비스, Crypto Coin & Token Defi 서비스`,
				desc: {
					'Host': 'macaron.io',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Ethereum',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, React',
					'진행 인원': '2인(기획자 1, 개발자 1)',
					'참여 내용': [
						'(HTML/CSS, NodeJS, React) Open Source 수정하여 작업',
						'(PHP) Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2020.5 ~ 2020.12',
				title: 'VotingMon',
				subTitle: `(블록체인 기반 투표/설문조사 플랫폼) 투표/설문조사 결과를 BlockChacin에 기록하고, 가상화폐를 보상으로 지급`,
				desc: {
					'Host': 'votingmon.com',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, Javascript, NodeJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 일부 설계',
						'(HTML/CSS, Jquery, VueJS) 일부 웹페이지 작업',
						'(PHP) Server 일부 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2020.5 ~ 2020.12',
				title: 'HelloChallenge ',
				subTitle: `- (소셜 마케팅 플랫폼) 광고주의 요청에 의해 만들어진 영상을 틱톡, 트위터, 페이스북, 네이버TV, 다음 TV에 공유하고 보상을 BlockChain 기반의 토큰으로 지급`,
				desc: {
					'Host': 'hellochalange.com',
					'개발 환경': 'Mac, Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, NodeJS, VueJS',
					'진행 인원': '6인(기획자 2, 개발자 3, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 일부 설계',
						'(HTML/CSS, Jquery, VueJS) 일부 웹페이지 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2019.6 ~ 2021.2',
				title: 'AutosDAQ',
				subTitle: `- Metacoin Token을 이용하여 차량을 주식화
					-  사용자간 거래하며, 거래내역은  Metacoin의 특정 프로토콜로 처리`,
				desc: {
					'Host': 'autosdaq.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, VSCode, MySQL, Redis, Metacoin, Bitcoin, Ethereum, Ripple',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, NodeJS, VueJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 일부 설계',
						'(HTML/CSS, Jquery, VueJS) 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2019.5 ~ 2019.10(보류)',
				title: 'PlayBits',
				subTitle: `- 게임기반 가상화폐 거래소
					- 게임 내 아이템을 NFT화 또는 Token화 하여 경매 및 판매로 거래`,
				desc: {
					'Host': 'playbits.io',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin, Ethereum',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, NodeJS, VueJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 일부 설계',
						'(HTML/CSS, Jquery, VueJS) 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2019.3 ~ 2020.5',
				title: 'BitPang',
				subTitle: `- Upbit와 같은 가상 화폐 거래소
					- 각 코인의 거래 및 이체`,
				desc: {
					'Host': 'bitpang.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, VSCode, MySQL, Redis, Metacoin, Bitcoin, Ethereum, Ripple',
					'개발 언어': 'PHP, HTML/CSS, Javascript, NodeJS, VueJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 일부 설계',
						'(HTML/CSS, NodeJS, VueJS) 반응형 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Crypto transaction 얻어오는 Daemon 작업',
						'(PHP) Crypto coin 이체 Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.12 ~ 2019.5(보류)',
				title: 'FilmsDAQ',
				subTitle: `- Metacoin Token을 이용하여 영화 및 미디어를 주식화
					-  사용자간 거래하며, 거래내역은  Metacoin의 특정 프로토콜로 처리`,
				desc: {
					'Host': 'filmsdaq.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, HTML/CSS, Javascript, NodeJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 일부 설계',
						'(HTML/CSS, Jquery, VueJS) 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.12 ~ 2020.2(보류)',
				title: 'EntersDAQ',
				subTitle: `- Metacoin Token을 이용하여 연예인, 음악 등을 주식화
					-  사용자간 거래하며, 거래내역은  Metacoin의 특정 프로토콜로 처리`,
				desc: {
					'Host': 'entersdaq.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, NodeJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 일부 설계',
						'(HTML/CSS, Jquery, VueJS) 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.11 ~ Current',
				title: 'POSDAQ',
				subTitle: `- Metacoin Token을 이용하여 정치인을 주식화
					-  사용자간 거래하며, 거래내역은  Metacoin의 특정 프로토콜로 처리`,
				desc: {
					'Host': 'posdaq.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, NodeJS, VueJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 일부 설계',
						'(HTML/CSS, Jquery, VueJS) 반응형 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.11 ~',
				title: 'BTCNIA',
				subTitle: `- Upbit와 같은 가상 화폐 거래소
					- 각 코인의 거래 및 이체`,
				desc: {
					'Host': 'btcnia.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, VSCode, MySQL, Redis, Metacoin, Bitcoin, Ethereum, Ripple',
					'개발 언어': 'PHP, HTML/CSS, Javascript, NodeJS, VueJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 일부 설계',
						'(HTML/CSS, NodeJS, VueJS) 반응형 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Crypto transaction 얻어오는 Daemon 작업',
						'(PHP) Crypto coin 이체 Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.9 ~ Current',
				title: 'IssueToken',
				subTitle: `- MetaCoin기반의 토큰 및 NFT 발행`,
				desc: {
					'Host': 'issuetoken.io',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, VueJS',
					'진행 인원': '3인(기획자 1, 개발자 1, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 설계',
						'(HTML/CSS, NodeJS, VueJS) 반응형 웹페이지 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP) Metacoin Transaction 얻어오는 Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.8 ~ 2019.1',
				title: 'TVPang',
				subTitle: `- 인터넷 TV 녹화 및 편집
					- 편집 & 인코딩 후 계약된 웹하드에 업로드`,
				desc: {
					'Host': 'tvpang.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, VSCode, MySQL, Redis, FFMPEG, Imagick',
					'개발 언어': 'PHP, Smarty, HTML/SCSS, Javascript, NodeJS, Python, Shell Script',
					'진행 인원': '5인(기획자 1, 개발자 3, 디자이너 1)',
					'참여 내용': [
						'(HTML/SCSS, NodeJS, VueJS) 반응형 웹페이지 작업',
						'(Javascript) 영상 편집 라이브러리 수정',
						'(PHP) API 작업',
						'(PHP) Server 작업',
						'(PHP) Daemon 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.4 ~ 2020.5',
				title: 'Withbit',
				subTitle: `- Upbit와 같은 가상 화폐 거래소
					- 각 코인의 거래 및 이체`,
				desc: {
					'Host': 'withbit.co.kr, withbit.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, VSCode, MySQL, Redis, Metacoin, Bitcoin, Ethereum, Ripple',
					'개발 언어': 'PHP, HTML/CSS, Javascript, NodeJS, VueJS',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 일부 설계',
						'(HTML/CSS, NodeJS, VueJS) 반응형 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 일부 설계 및 작업',
						'(PHP) Crypto transaction 얻어오는 Daemon 작업',
						'(PHP) Crypto coin 이체 Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.3 ~ Current',
				title: 'MetaScan',
				subTitle: `- Metacoin Explorer 사이트
					- Metacoin Transaction 에 대하여 표기 및 검색`,
				desc: {
					'Host': 'metascan.io',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'VSCode, Figma, MySQL, Redis, Metacoin',
					'개발 언어': 'PHP, HTML/SCSS, NodeJS, VueJS',
					'진행 인원': '5인 (기획자 1, 개발자 3, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 설계',
						'(HTML/SCSS, NodeJS, VueJS) 반응형 웹페이지 작업',
						'(PHP) API 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP) Metacoin transaction을 가져오는 Daemon 작업',
						'(PHP) API를 통해 환율 정보(Coinmarketcap) 가져오는 Daemon 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2018.2 ~ Current',
				title: 'Metacoin',
				subTitle: `- 세계최초의 HyperLedger Fabric 기반의 가상화폐 웹 사이트`,
				desc: {
					'Host': 'metacoin.network',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, VSCode, HyperLedger Fabric',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, NodeJS, VueJS, Go',
					'진행 인원': '4인 (기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(HTML/CSS, Javascript) 반응형 웹페이지 작업',
						'(HTML/SCSS, NodeJS, VueJS) 웹페이지 리뉴얼 작업',
						'(PHP) Metacoin Transaction 얻어오는 Daemon 작업',
						'일부 프로토콜 디버깅 & 설계 참여'
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2019.9 ~ Current',
				title: 'PHP 프레임워크 (사내용)',
				subTitle: `- 사내에서 사용하기 위한 Class 기반 프레임워크 제작, 라라벨 5.x 참조.
					- 라우터, DB 및 파일 업로드 등을 객체 지향으로 작업`,
				desc: {
					'Host': 'NONE',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, VSCode, MySQL, Redis, Sphinx',
					'개발 언어': 'PHP, Smarty',
					'진행 인원': '2인 (개발자 2)',
					'참여 내용': [
						'(Mysql, Redis, Sphinx) DB에 쉽게 접근 할 수 있는 클래스 작업',
						'(PHP) Route, Session, DB 등 기본적으로 사용되는 클래스 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2017.12 ~ 2019.4',
				title: 'BitPet',
				subTitle: `- 세계 최초의 HyperLedger Fabric 기반의 블록체인 게임
					- HyperLedger Fabric에 사용자의 행위 및 보유 아이템 기록
					- 아이템 거래를 위한 경매 & 판매 시스템
					- 아이템 조합으로 새로운 캐릭터 생성`,
				desc: {
					'Host': 'bitpet.co',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, HyperLedger Fabric, MySQL, Redis, Sphinx, Ethereum',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis, Sphinx) DB 구조 설계',
						'(HTML/CSS, Jquery) 반응형 웹페이지 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP) Ethereum 이체 Daemon 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2017.7 ~ 2019.2',
				title: 'Vertical Mining',
				subTitle: `- 가상화폐 채굴 (Ethereum, Bitcoin) 시스템 모니터링 및 Diskless O/S
					- Shell script 및 Python을 이용하여 그래픽 카드의 사용량 처리`,
				desc: {
					'Host': 'verticalmining.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, MySQL, Redis',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, Python, Shell Script',
					'진행 인원': '4인(기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis, Sphinx) DB 일부 설계',
						'(HTML/CSS, Jquery) 반응형 웹페이지 작업',
						'(PHP) Socket Server 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2015.9 ~ 2020.7',
				title: '배달캠프/모두의 배달',
				subTitle: `- 배달 주문 및 배달기사 관리
					- Daum 지도를 이용한 기사 위치 및 매장 관리
					- 자체 프로그램 및  인터넷 전화를 이용한 콜관리
					- Socket을 이용한 주방에 주문 안내 시스템`,
				desc: {
					'Host': 'baedal.camp, baedalcamp.com, mobae.co.kr',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, Delphi, MySQL, Redis, Sphinx',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, Python, Pascal',
					'진행 인원': '5인 (기획자 2, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis, Sphinx) DB 구조 일부 설계',
						'(HTML/CSS, Jquery) 반응형 웹페이지 작업',
						'(PHP) Socket Server 일부 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2015.5 ~ 2020.7',
				title: '쿡일레븐',
				subTitle: `- 공유 주방, 배달 주문 및 배달기사 관리
					- Daum 지도를 이용한 기사 위치 및 매장 관리
					- 자체 프로그램 및  인터넷 전화를 이용한 콜관리
					- Socket을 이용한 주방에 주문 안내 시스템`,
				desc: {
					'Host': 'www.cook11.co.kr',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, Delphi, MySQL, Redis, Sphinx',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, Python, Pascal',
					'진행 인원': '5인 (기획자 2, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis, Sphinx) DB 구조 설계',
						'(HTML/CSS, Jquery) 반응형 웹페이지 작업',
						'(PHP) Server 설계 및 작업',
						'(PHP) Socket Server 일부 설계 및 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2014.10 ~ 2014.10',
				title: 'NEOEZ',
				subTitle: `- 사내 사이트`,
				desc: {
					'Host': 'neoez.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript',
					'진행 인원': '2인 (개발자 1 디자이너 1)',
					'참여 내용': [
						'(HTML/CSS, Jquery) 반응형 웹페이지 작업',
						'(PHP) Server 설계 및 작업'
					]
				}
			},
			{
				project: 'Web/Server, iOS',
				date: '2014.8 ~ 2019.2',
				title: '동탄닷컴',
				subTitle: `- 동탄 지역 내 커뮤니티 사이트 (매장 소개, 중고 장터, 커뮤니티)`,
				desc: {
					'Host': 'dongtan.com',
					'개발 환경': 'Linux, Mac',
					'사용 툴/DB': 'Vim, Xcode, MySQL, Redis',
					'개발 언어': 'PHP, Smarty, Objective-C, HTML/CSS, Javascript',
					'진행 인원': '4인 (기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(Mysql, Redis) DB 구조 설계',
						'(HTML/CSS, Jquery) 반응형 웹 페이지 작업',
						'(PHP) Server 설계 및 작업',
						'(Objective-C) 웹앱 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2013.8 ~ 2013.12',
				title: '[외주] 웹하드',
				subTitle: `- 파일노리 와 같은 웹하드 사이트`,
				desc: {
					'Host': '',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, Delphi, MySQL, Redis, Sphinx',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, Pascal',
					'진행 인원': '4인 (기획자 1, 개발자 2, 디자이너 1)',
					'참여 내용': [
						'(HTML/CSS, Jquery) 사용자 UI 작업 ',
						'(PHP) Server 작업',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2013.3 ~ 2020.12',
				title: 'Alleska',
				subTitle: `- 웹하드의 저작권 위반 게시물 모니터링 및 저작권 보호 요청 대행`,
				desc: {
					'Host': 'alleska.com',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, Delphi, MySQL, Redis, Sphinx',
					'개발 언어': 'PHP, Smarty, HTML/CSS, Javascript, Python, Pascal',
					'진행 인원': '3인 (기획자 1, 개발자 2)',
					'참여 내용': [
						'(HTML/CSS, Jquery) 사용자 UI 작업',
						'(PHP) 크롤링 작업, 웹하드의 각 카테고리별 게시물',
					]
				}
			},
			{
				project: 'Web/Server',
				date: '2013.3 ~ 유지보수',
				title: '컨텐츠 관리 솔루션(www.neocontents.co.kr, dcms.co.kr)',
				subTitle: `- Dephi로 만든 프로그램으로 웹하드에 로그인한 사용자의 게시글 관리 (컨텐츠 업로드 글쓰기 수정 삭제 끌어올리기)`,
				desc: {
					'Host': 'dcms.co.kr, www.neocontents.co.kr',
					'개발 환경': 'Linux',
					'사용 툴/DB': 'Vim, Delphi, MySQL, Redis',
					'개발 언어': 'PHP, Pascal',
					'진행 인원': '3인 (기획자 1, 개발자 2)',
					'참여 내용': [
						'(PHP) 크롤링 작업 진행, 웹하드의 컨텐츠 업로드, 글쓰기, 수정, 삭제, 끌어올리기 기능에 대해 파악 및 패킷 작성.',
					]
				}
			},
		];

		/** Template Type
		 * {0}: Date
		 * {1}: Project type
		 * {2}: Title
		 * {3}: Descriptoin
		 */
		let template = `
<div class="timeline-item clearfix">
	<div class="left-part">
		<h5 class="item-period">{0}</h5>
		<span class="item-company">{1}</span>
	</div>
	<div class="divider"></div>
	<div class="right-part">
		<h4 class="item-title">{2}</h4>
		<div class="career-list">
			<div class="career-title pre-line">{3}</div>
			<ul>{4}</ul>
		</div>
	</div>
</div>`;

		let descTemplate = `
<li>
	<span class="title">{0}</span>
	<span class="value">{1}</span>
</li>`;

		let htmlItems = [];
		careerMap.map((row) => {
			let copyTemplate = template;

			let descHtml = [];
			Object.entries(row.desc).map((v) => {
				let copyDescTemplate = descTemplate;
				let title = v[0];
				let desc = v[1];

				let aryDescHtml = [];
				if (Array.isArray(desc)) {
					aryDescHtml.push('<ul class="disc-list">');
					desc.map((vv) => {
						aryDescHtml.push(`<li class="ml-20">${vv}</li>`);
					});
					aryDescHtml.push('</ul>');

					desc = aryDescHtml.join('');
				}

				copyDescTemplate = copyDescTemplate.replace('{0}', title)
					.replace('{1}', desc);

				descHtml.push(copyDescTemplate);
			})

			copyTemplate = copyTemplate.replace('{0}', row.date)
				.replace('{1}', row.project)
				.replace('{2}', row.title)
				.replace('{3}', row.subTitle)
				.replace('{4}', descHtml.join(''));

			htmlItems.push(copyTemplate)
		});

		$('.timeline.career-items').html(htmlItems);
	}

	$(document).ready(function () {
		let jobStartDate = new Date('2013.03.04');

		setInterval(() => {
			const date = new Date();

			createDate(date);
			createTime(date);

			createCareer(jobStartDate, date);
		}, 1000);

		createSkillsHTML();
		createToolsHTML();
		createCareerHTML();
	});
})(jQuery);