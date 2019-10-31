/*
 * Component GenericSessionManager
 * Click on "View" button to list active sessions
 * Run the script below to invalidate one by one automaticaly
 */

count = 0;
stop = 3;
tasks = Array.from(document.querySelector('table').querySelectorAll('a'));

performTask = () => {
	let item = tasks.shift();
	if (count < stop) {
		let url = item.href + '?shouldInvokeMethod=invalidate';
		let page = window.open(url, '_blank');

		try {
			let interval = setInterval(() => {
				if (page && page.document) {
					let btn = page.document.querySelector('input[name=submit]');
					if (btn) {
						clearInterval(interval);

						btn.click();

						interval = setInterval(() => {
							page.document.querySelectorAll('h1').forEach((item) => {
								if (item.textContent.indexOf('invoked') > 0 || item.textContent.indexOf('not found') > 0) {
									clearInterval(interval);

									page.close();
									count++;

									setTimeout(performTask, 250);
								}
							});
						}, 250);
					}
				}
			}, 250);
		} catch (e) {
			console.log(e);
		}
	}
};

setTimeout(performTask, 25);
