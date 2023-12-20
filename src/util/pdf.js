module.exports = {
	renderPageText: async (doc, pageNumber, format) => {
		const page = await doc.getPage(+pageNumber);
		const { items } = await page.getTextContent();
		let lastItem = null;
		let pageText = "";
		for (let idx = 0; idx < items.length; idx++) {
			let item = items[idx];
			if (lastItem != null && lastItem.str[lastItem.str.length - 1] != " ") {
				let itemX = item.transform[5];
				let lastItemX = lastItem.transform[5];
				let itemY = item.transform[4];
				let lastItemY = lastItem.transform[4];
				if (itemX < lastItemX)
					pageText += `\r\n${format === "html" ? "<br/>" : ""}`;
				else if (
					itemY != lastItemY &&
					lastItem.str.match(/^(\s?[a-zA-Z])$|^(.+\s[a-zA-Z])$/) === null
				)
					pageText += " ";
			}
			pageText += item.str;
			lastItem = item;
		}
		return pageText;
	}
};